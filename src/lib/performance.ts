/**
 * Performance Optimization Utilities
 * Image optimization, lazy loading, prefetching, caching
 */

// ============================================================================
// Image Optimization
// ============================================================================

interface ImageSize {
  width: number;
  height: number;
  srcSet?: string;
}

interface OptimizedImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Standard image sizes for responsive images
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 320, height: 240 },
  medium: { width: 640, height: 480 },
  large: { width: 1024, height: 768 },
  xlarge: { width: 1920, height: 1080 },
  hero: { width: 2560, height: 1440 },
};

// Generate srcSet for responsive images
export function generateSrcSet(
  basePath: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  return widths
    .map(width => `${basePath}?w=${width} ${width}w`)
    .join(', ');
}

// Generate blur placeholder data URL
export function generateBlurDataURL(color: string = '#f5f5f5'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Image loading priority queue
const imageQueue: { src: string; priority: number }[] = [];
let isProcessing = false;

export function queueImage(src: string, priority: number = 0): void {
  imageQueue.push({ src, priority });
  imageQueue.sort((a, b) => b.priority - a.priority);
  processQueue();
}

async function processQueue(): Promise<void> {
  if (isProcessing || imageQueue.length === 0) return;
  
  isProcessing = true;
  
  while (imageQueue.length > 0) {
    const item = imageQueue.shift();
    if (item) {
      await preloadImage(item.src);
    }
  }
  
  isProcessing = false;
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// ============================================================================
// Resource Prefetching
// ============================================================================

type ResourceType = 'script' | 'style' | 'image' | 'font' | 'fetch';

interface PrefetchOptions {
  as?: ResourceType;
  crossOrigin?: 'anonymous' | 'use-credentials';
  type?: string;
}

const prefetchedResources = new Set<string>();

export function prefetchResource(href: string, options: PrefetchOptions = {}): void {
  if (typeof window === 'undefined') return;
  if (prefetchedResources.has(href)) return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  if (options.as) link.as = options.as;
  if (options.crossOrigin) link.crossOrigin = options.crossOrigin;
  if (options.type) link.type = options.type;
  
  document.head.appendChild(link);
  prefetchedResources.add(href);
}

export function preconnect(origin: string): void {
  if (typeof window === 'undefined') return;
  if (prefetchedResources.has(`preconnect:${origin}`)) return;
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  link.crossOrigin = 'anonymous';
  
  document.head.appendChild(link);
  prefetchedResources.add(`preconnect:${origin}`);
}

export function dnsPrefetch(domain: string): void {
  if (typeof window === 'undefined') return;
  if (prefetchedResources.has(`dns:${domain}`)) return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = domain;
  
  document.head.appendChild(link);
  prefetchedResources.add(`dns:${domain}`);
}

// Prefetch on link hover
export function prefetchOnHover(selector: string = 'a[href^="/"]'): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const handleMouseEnter = (event: Event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.href && target.href.startsWith(window.location.origin)) {
      prefetchResource(target.href, { as: 'fetch' });
    }
  };
  
  const handleTouchStart = (event: Event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.href && target.href.startsWith(window.location.origin)) {
      prefetchResource(target.href, { as: 'fetch' });
    }
  };
  
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('touchstart', handleTouchStart, { passive: true });
  });
  
  // Return cleanup function
  return () => {
    document.querySelectorAll(selector).forEach(link => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('touchstart', handleTouchStart);
    });
  };
}

// ============================================================================
// Critical CSS
// ============================================================================

export function injectCriticalCSS(css: string): void {
  if (typeof window === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.firstChild);
}

// ============================================================================
// Lazy Loading
// ============================================================================

interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onLoad?: (element: Element) => void;
}

export function lazyLoad(
  elements: NodeListOf<Element> | Element[],
  options: LazyLoadOptions = {}
): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback: load all immediately
    Array.from(elements).forEach(el => {
      if (el instanceof HTMLImageElement && el.dataset.src) {
        el.src = el.dataset.src;
      }
    });
    return () => {};
  }
  
  const {
    root = null,
    rootMargin = '50px',
    threshold = 0,
    onLoad,
  } = options;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        if (el instanceof HTMLImageElement) {
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
          }
          
          if (el.dataset.srcset) {
            el.srcset = el.dataset.srcset;
            el.removeAttribute('data-srcset');
          }
        }
        
        el.classList.add('lazy-loaded');
        onLoad?.(el);
        observer.unobserve(el);
      }
    });
  }, { root, rootMargin, threshold });
  
  Array.from(elements).forEach(el => observer.observe(el));
  
  return () => observer.disconnect();
}

// ============================================================================
// Performance Monitoring
// ============================================================================

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  domLoad: number | null;
  windowLoad: number | null;
}

export function getPerformanceMetrics(): PerformanceMetrics {
  if (typeof window === 'undefined' || !window.performance) {
    return {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      domLoad: null,
      windowLoad: null,
    };
  }
  
  const perf = window.performance;
  const navigation = perf.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = perf.getEntriesByType('paint');
  
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
  
  return {
    fcp: fcp?.startTime || null,
    lcp: null, // Requires PerformanceObserver
    fid: null, // Requires PerformanceObserver
    cls: null, // Requires PerformanceObserver
    ttfb: navigation?.responseStart - navigation?.requestStart || null,
    domLoad: navigation?.domContentLoadedEventEnd - navigation?.startTime || null,
    windowLoad: navigation?.loadEventEnd - navigation?.startTime || null,
  };
}

// Report metrics to analytics
export function reportPerformanceMetrics(callback: (metrics: PerformanceMetrics) => void): void {
  if (typeof window === 'undefined') return;
  
  // Wait for page load
  if (document.readyState === 'complete') {
    setTimeout(() => callback(getPerformanceMetrics()), 0);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => callback(getPerformanceMetrics()), 0);
    });
  }
}

// ============================================================================
// Memory Management
// ============================================================================

export function clearUnusedResources(): void {
  if (typeof window === 'undefined') return;
  
  // Clear prefetch cache for non-visible pages
  prefetchedResources.clear();
  
  // Clear image queue
  imageQueue.length = 0;
}

// Monitor memory usage (if available)
export function getMemoryUsage(): { used: number; total: number } | null {
  if (typeof window === 'undefined') return null;
  
  // @ts-expect-error - memory API is non-standard
  const memory = performance?.memory;
  if (!memory) return null;
  
  return {
    used: memory.usedJSHeapSize,
    total: memory.jsHeapSizeLimit,
  };
}

// ============================================================================
// Script Loading
// ============================================================================

interface ScriptOptions {
  async?: boolean;
  defer?: boolean;
  type?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function loadScript(src: string, options: ScriptOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    
    if (options.async !== false) script.async = true;
    if (options.defer) script.defer = true;
    if (options.type) script.type = options.type;
    
    script.onload = () => {
      options.onLoad?.();
      resolve();
    };
    
    script.onerror = () => {
      const error = new Error(`Failed to load script: ${src}`);
      options.onError?.(error);
      reject(error);
    };
    
    document.body.appendChild(script);
  });
}

// Load scripts when idle
export function loadScriptWhenIdle(src: string, options: ScriptOptions = {}): void {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadScript(src, options));
  } else {
    setTimeout(() => loadScript(src, options), 1);
  }
}

// ============================================================================
// Intersection Observer Pool
// ============================================================================

type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

class ObserverPool {
  private observers = new Map<string, IntersectionObserver>();
  private callbacks = new Map<Element, IntersectionCallback>();
  
  getObserver(options: IntersectionObserverInit = {}): IntersectionObserver {
    const key = JSON.stringify(options);
    
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const callback = this.callbacks.get(entry.target);
          callback?.(entry);
        });
      }, options);
      
      this.observers.set(key, observer);
    }
    
    return this.observers.get(key)!;
  }
  
  observe(element: Element, callback: IntersectionCallback, options?: IntersectionObserverInit): void {
    const observer = this.getObserver(options);
    this.callbacks.set(element, callback);
    observer.observe(element);
  }
  
  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observers.forEach(observer => observer.unobserve(element));
  }
  
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.callbacks.clear();
  }
}

export const observerPool = new ObserverPool();

// ============================================================================
// Debounce & Throttle
// ============================================================================

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================================================
// Export default performance utilities
// ============================================================================

export const performance = {
  imageSizes,
  generateSrcSet,
  generateBlurDataURL,
  queueImage,
  prefetchResource,
  preconnect,
  dnsPrefetch,
  prefetchOnHover,
  lazyLoad,
  getMetrics: getPerformanceMetrics,
  reportMetrics: reportPerformanceMetrics,
  loadScript,
  loadScriptWhenIdle,
  observerPool,
  debounce,
  throttle,
  clearUnusedResources,
  getMemoryUsage,
};

export default performance;
