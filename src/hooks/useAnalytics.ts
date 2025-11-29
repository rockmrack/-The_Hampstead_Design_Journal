'use client';

import { useCallback, useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

// ============================================================================
// usePageView Hook - Track page views automatically
// ============================================================================

export function usePageView(pageData?: {
  title?: string;
  section?: string;
  author?: string;
  category?: string;
}) {
  useEffect(() => {
    // Build PageViewEvent with required fields from browser context
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const title = pageData?.title || (typeof document !== 'undefined' ? document.title : 'Page');
    const referrer = typeof document !== 'undefined' ? document.referrer : undefined;
    
    analytics.pageView({
      path,
      title,
      referrer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ============================================================================
// useTrackEvent Hook - Track custom events
// ============================================================================

export function useTrackEvent() {
  const track = useCallback((
    eventName: string,
    properties?: Record<string, string | number | boolean>
  ) => {
    analytics.track(eventName, properties);
  }, []);

  return track;
}

// ============================================================================
// useTrackClick Hook - Track link/button clicks
// ============================================================================

interface TrackClickOptions {
  eventName?: string;
  properties?: Record<string, string | number | boolean>;
}

export function useTrackClick<T extends HTMLElement = HTMLButtonElement>(
  options: TrackClickOptions = {}
) {
  const { eventName = 'click', properties = {} } = options;

  const handleClick = useCallback(
    (event: React.MouseEvent<T>) => {
      const target = event.currentTarget;
      const href = 'href' in target ? (target as unknown as HTMLAnchorElement).href : undefined;
      
      analytics.track(eventName, {
        element: target.tagName.toLowerCase(),
        text: target.textContent?.slice(0, 100) || '',
        ...(href ? { href } : {}),
        ...properties,
      });
    },
    [eventName, properties]
  );

  return handleClick;
}

// ============================================================================
// useScrollDepth Hook - Track scroll depth
// ============================================================================

export function useScrollDepth(thresholds: number[] = [25, 50, 75, 100]) {
  const reachedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !reachedThresholds.current.has(threshold)) {
          reachedThresholds.current.add(threshold);
          analytics.track('scroll_depth', {
            depth: threshold,
            page: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [thresholds]);
}

// ============================================================================
// useTimeOnPage Hook - Track time spent on page
// ============================================================================

export function useTimeOnPage(intervals: number[] = [30, 60, 120, 300]) {
  const startTime = useRef<number>(Date.now());
  const trackedIntervals = useRef<Set<number>>(new Set());

  useEffect(() => {
    const checkIntervals = () => {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);

      intervals.forEach((interval) => {
        if (timeSpent >= interval && !trackedIntervals.current.has(interval)) {
          trackedIntervals.current.add(interval);
          analytics.track('time_on_page', {
            seconds: interval,
            page: window.location.pathname,
          });
        }
      });
    };

    const timer = setInterval(checkIntervals, 5000);

    // Track on page leave
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const totalTime = Math.floor((Date.now() - startTime.current) / 1000);
        analytics.track('page_leave', {
          timeSpent: totalTime,
          page: window.location.pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intervals]);
}

// ============================================================================
// useContentInteraction Hook - Track content interactions
// ============================================================================

export function useContentInteraction() {
  const trackContentInteraction = useCallback((
    contentId: string,
    contentType: 'article' | 'archive' | 'tool' | 'guide' | 'calculator',
    action: 'view' | 'scroll' | 'share' | 'save' | 'print' | 'copy',
    depth?: number,
    duration?: number
  ) => {
    analytics.contentInteraction({
      contentType,
      contentId,
      action,
      depth,
      duration,
    });
  }, []);

  return trackContentInteraction;
}

// ============================================================================
// useFormAnalytics Hook - Track form interactions
// ============================================================================

interface FormAnalyticsOptions {
  formName: string;
  onFieldFocus?: (fieldName: string) => void;
  onFieldBlur?: (fieldName: string, value: string) => void;
}

export function useFormAnalytics(options: FormAnalyticsOptions) {
  const { formName, onFieldFocus, onFieldBlur } = options;
  const startTime = useRef<number | null>(null);
  const interactedFields = useRef<Set<string>>(new Set());

  const trackFormStart = useCallback(() => {
    if (!startTime.current) {
      startTime.current = Date.now();
      analytics.track('form_start', { formName });
    }
  }, [formName]);

  const trackFieldInteraction = useCallback((fieldName: string, action: 'focus' | 'blur', value?: string) => {
    trackFormStart();
    
    if (action === 'focus') {
      interactedFields.current.add(fieldName);
      onFieldFocus?.(fieldName);
      analytics.track('form_field_focus', { formName, fieldName });
    } else {
      onFieldBlur?.(fieldName, value || '');
      analytics.track('form_field_complete', { 
        formName, 
        fieldName,
        hasValue: !!value,
      });
    }
  }, [formName, trackFormStart, onFieldFocus, onFieldBlur]);

  const trackFormSubmit = useCallback((success: boolean, errors?: string[]) => {
    const duration = startTime.current 
      ? Math.floor((Date.now() - startTime.current) / 1000)
      : 0;

    // Track via the formSubmit method with field names
    const fields = Array.from(interactedFields.current);
    analytics.formSubmit(formName, success, fields);
    
    // Also track detailed form completion event
    analytics.track('form_complete', {
      formName,
      success,
      duration,
      fieldsInteracted: interactedFields.current.size,
      hasErrors: (errors?.length || 0) > 0,
    });

    // Reset
    startTime.current = null;
    interactedFields.current.clear();
  }, [formName]);

  const trackFormAbandon = useCallback(() => {
    if (startTime.current && interactedFields.current.size > 0) {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      analytics.track('form_abandon', {
        formName,
        duration,
        fieldsCount: interactedFields.current.size,
      });
    }
  }, [formName]);

  // Track abandon on unmount
  useEffect(() => {
    return () => {
      trackFormAbandon();
    };
  }, [trackFormAbandon]);

  return {
    trackFieldInteraction,
    trackFormSubmit,
    trackFormAbandon,
    trackFormStart,
  };
}

// ============================================================================
// useConversion Hook - Track conversions
// ============================================================================

export function useConversion() {
  const trackConversion = useCallback((
    type: 'newsletter_signup' | 'contact_form' | 'consultation_booking' | 'download' | 'share',
    value?: number,
    metadata?: Record<string, string | number | boolean>
  ) => {
    analytics.conversion(type, value, metadata);
  }, []);

  return trackConversion;
}

// ============================================================================
// useSearchTracking Hook - Track search behavior
// ============================================================================

export function useSearchTracking() {
  const lastSearchTime = useRef<number>(0);

  const trackSearch = useCallback((
    query: string,
    resultsCount: number,
    filters?: Record<string, string>
  ) => {
    // Debounce rapid searches
    const now = Date.now();
    if (now - lastSearchTime.current < 500) return;
    lastSearchTime.current = now;

    analytics.search(query, resultsCount, filters);
  }, []);

  const trackSearchResultClick = useCallback((
    query: string,
    resultId: string,
    position: number
  ) => {
    analytics.track('search_result_click', {
      query,
      resultId,
      position,
    });
  }, []);

  const trackNoResults = useCallback((query: string) => {
    analytics.track('search_no_results', { query });
  }, []);

  return {
    trackSearch,
    trackSearchResultClick,
    trackNoResults,
  };
}

// ============================================================================
// usePerformanceTracking Hook - Track Web Vitals
// ============================================================================

export function usePerformanceTracking() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Track Web Vitals using Performance API
    const trackWebVitals = () => {
      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        analytics.performance('FCP', fcp.startTime);
      }

      // Largest Contentful Paint (requires PerformanceObserver)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              analytics.performance('LCP', lastEntry.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              const eventTiming = entry as PerformanceEventTiming;
              if ('processingStart' in eventTiming) {
                analytics.performance('FID', eventTiming.processingStart - entry.startTime);
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries() as LayoutShift[];
            entries.forEach((entry) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            analytics.performance('CLS', clsValue);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
          };
        } catch (e) {
          // PerformanceObserver not supported for these entry types
        }
      }
    };

    // Wait for page load
    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
      return () => window.removeEventListener('load', trackWebVitals);
    }
  }, []);
}

// Type augmentation for PerformanceObserver entries
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

// ============================================================================
// useVisibility Hook - Track element visibility (for lazy tracking)
// ============================================================================

interface UseVisibilityOptions {
  threshold?: number;
  once?: boolean;
  onVisible?: () => void;
}

export function useVisibility<T extends HTMLElement>(
  options: UseVisibilityOptions = {}
) {
  const { threshold = 0.5, once = true, onVisible } = options;
  const ref = useRef<T>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasTracked.current)) {
          hasTracked.current = true;
          onVisible?.();
          
          if (once) {
            observer.disconnect();
          }
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once, onVisible]);

  return ref;
}
