'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// useLocalStorage Hook
// ============================================================================

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch {
          // Storage might be full
        }
      }
      
      return newValue;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// ============================================================================
// useDebounce Hook
// ============================================================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// useThrottle Hook
// ============================================================================

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    
    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottledValue(value);
      }, interval - (now - lastUpdated.current));
      
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}

// ============================================================================
// useMediaQuery Hook
// ============================================================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Preset media queries
export function useIsMobile() {
  return useMediaQuery('(max-width: 639px)');
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}

export function usePrefersDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

// ============================================================================
// useClickOutside Hook
// ============================================================================

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  enabled = true
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}

// ============================================================================
// useKeyPress Hook
// ============================================================================

export function useKeyPress(
  targetKey: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {}
): void {
  const { enabled = true, preventDefault = false } = options;

  useEffect(() => {
    if (!enabled) return;

    const keys = Array.isArray(targetKey) ? targetKey : [targetKey];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        if (preventDefault) event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, handler, enabled, preventDefault]);
}

// ============================================================================
// useScrollPosition Hook
// ============================================================================

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  progress: number;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    progress: 0,
  });
  const prevY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const x = window.scrollX;
      const direction = y > prevY.current ? 'down' : y < prevY.current ? 'up' : null;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (y / maxScroll) * 100 : 0;

      setPosition({ x, y, direction, progress });
      prevY.current = y;
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return position;
}

// ============================================================================
// useIntersectionObserver Hook
// ============================================================================

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options;
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (freezeOnceVisible && frozen.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [ref, isVisible, entry];
}

// ============================================================================
// useCopyToClipboard Hook
// ============================================================================

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch {
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}

// ============================================================================
// useToggle Hook
// ============================================================================

export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const set = useCallback((v: boolean) => setValue(v), []);
  
  return [value, toggle, set];
}

// ============================================================================
// useWindowSize Hook
// ============================================================================

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// ============================================================================
// usePrevious Hook
// ============================================================================

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// ============================================================================
// useIsClient Hook
// ============================================================================

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// ============================================================================
// useAsyncEffect Hook
// ============================================================================

export function useAsyncEffect(
  effect: () => Promise<void | (() => void)>,
  deps: React.DependencyList
): void {
  useEffect(() => {
    let cleanup: void | (() => void) = undefined;
    let mounted = true;

    const runEffect = async () => {
      try {
        cleanup = await effect();
      } catch (error) {
        if (mounted) {
          console.error('useAsyncEffect error:', error);
        }
      }
    };

    runEffect();

    return () => {
      mounted = false;
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ============================================================================
// useInterval Hook
// ============================================================================

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// ============================================================================
// useTimeout Hook
// ============================================================================

export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}

// ============================================================================
// useOnMount / useOnUnmount Hooks
// ============================================================================

export function useOnMount(callback: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { callback(); }, []);
}

export function useOnUnmount(callback: () => void): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => { callbackRef.current(); }, []);
}
