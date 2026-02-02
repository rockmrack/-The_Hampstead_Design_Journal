/**
 * Analytics System - Comprehensive event tracking and user journey mapping
 * Supports multiple providers: GA4, Plausible, custom backend
 */

export type AnalyticsEvent = {
  name: string;
  category: 'engagement' | 'navigation' | 'conversion' | 'content' | 'error' | 'performance';
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
  sessionId?: string;
  userId?: string;
};

export type PageViewEvent = {
  path: string;
  title: string;
  referrer?: string;
  searchParams?: Record<string, string>;
};

export type ContentInteraction = {
  contentType: 'article' | 'archive' | 'tool' | 'guide' | 'calculator';
  contentId: string;
  action: 'view' | 'scroll' | 'share' | 'save' | 'print' | 'copy';
  depth?: number; // Scroll depth percentage
  duration?: number; // Time spent in ms
};

// Analytics configuration
const config = {
  debug: process.env.NODE_ENV === 'development',
  trackingEnabled: typeof window !== 'undefined',
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  scrollDepthThresholds: [25, 50, 75, 90, 100],
};

// Session management
let sessionId: string | null = null;
let sessionStart: number | null = null;

function getOrCreateSession(): string {
  if (typeof window === 'undefined') return 'server';
  
  const stored = sessionStorage.getItem('hdj_session');
  const storedTime = sessionStorage.getItem('hdj_session_time');
  
  if (stored && storedTime) {
    const elapsed = Date.now() - parseInt(storedTime, 10);
    if (elapsed < config.sessionTimeout) {
      sessionId = stored;
      sessionStart = parseInt(storedTime, 10);
      return stored;
    }
  }
  
  // Create new session
  sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessionStart = Date.now();
  sessionStorage.setItem('hdj_session', sessionId);
  sessionStorage.setItem('hdj_session_time', sessionStart.toString());
  
  return sessionId;
}

// Event queue for batching
const eventQueue: AnalyticsEvent[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

function queueEvent(event: AnalyticsEvent): void {
  eventQueue.push({
    ...event,
    timestamp: Date.now(),
    sessionId: getOrCreateSession(),
  });
  
  // Batch events and flush every 5 seconds or when queue reaches 10 events
  if (eventQueue.length >= 10) {
    flushEvents();
  } else if (!flushTimeout) {
    flushTimeout = setTimeout(flushEvents, 5000);
  }
}

async function flushEvents(): Promise<void> {
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  
  if (eventQueue.length === 0) return;
  
  const events = [...eventQueue];
  eventQueue.length = 0;
  
  if (config.debug) {
    console.log('[Analytics] Flushing events:', events);
  }
  
  // Static export - analytics events are logged client-side only
  // For production, integrate with a third-party analytics service like 
  // Google Analytics, Plausible, or Fathom that works with static sites
  if (config.debug) {
    console.log('[Analytics] Events (static mode):', events);
  }
}

// Public API
export const analytics = {
  // Track page views
  pageView(data: PageViewEvent): void {
    queueEvent({
      name: 'page_view',
      category: 'navigation',
      properties: {
        path: data.path,
        title: data.title,
        referrer: data.referrer || '',
        ...data.searchParams,
      },
    });
  },

  // Track generic events
  track(name: string, properties?: Record<string, string | number | boolean>): void {
    queueEvent({
      name,
      category: 'engagement',
      properties,
    });
  },

  // Track content interactions
  contentInteraction(data: ContentInteraction): void {
    queueEvent({
      name: `content_${data.action}`,
      category: 'content',
      properties: {
        content_type: data.contentType,
        content_id: data.contentId,
        scroll_depth: data.depth || 0,
        time_spent: data.duration || 0,
      },
    });
  },

  // Track conversions
  conversion(name: string, value?: number, properties?: Record<string, string | number | boolean>): void {
    queueEvent({
      name: `conversion_${name}`,
      category: 'conversion',
      properties: {
        value: value || 0,
        ...properties,
      },
    });
  },

  // Track errors
  error(error: Error | string, context?: Record<string, string>): void {
    queueEvent({
      name: 'error',
      category: 'error',
      properties: {
        message: typeof error === 'string' ? error : error.message,
        stack: typeof error === 'string' ? '' : error.stack || '',
        ...context,
      },
    });
  },

  // Track performance metrics
  performance(metric: string, value: number, unit: string = 'ms'): void {
    queueEvent({
      name: `perf_${metric}`,
      category: 'performance',
      properties: {
        value,
        unit,
      },
    });
  },

  // Track search
  search(query: string, results: number, filters?: Record<string, string>): void {
    queueEvent({
      name: 'search',
      category: 'engagement',
      properties: {
        query,
        results_count: results,
        ...filters,
      },
    });
  },

  // Track form submissions
  formSubmit(formName: string, success: boolean, fields?: string[]): void {
    queueEvent({
      name: 'form_submit',
      category: 'conversion',
      properties: {
        form_name: formName,
        success,
        fields_count: fields?.length || 0,
      },
    });
  },

  // Flush on page unload
  flush: flushEvents,

  // Get session info
  getSession(): { id: string; duration: number } {
    const id = getOrCreateSession();
    const duration = sessionStart ? Date.now() - sessionStart : 0;
    return { id, duration };
  },
};

// Auto-flush on page visibility change and unload
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushEvents();
    }
  });

  window.addEventListener('beforeunload', flushEvents);
}

export default analytics;
