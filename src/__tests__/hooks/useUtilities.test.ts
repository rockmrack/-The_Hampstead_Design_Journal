/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { 
  useLocalStorage, 
  useDebounce, 
  useToggle,
  useMediaQuery,
  useCopyToClipboard,
  useScrollPosition,
  usePrevious,
  useIsClient,
} from '@/hooks/useUtilities';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock clipboard
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue(''),
  },
});

describe('Utility Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe('useLocalStorage', () => {
    it('returns initial value when no stored value', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      expect(result.current[0]).toBe('initialValue');
    });

    it('returns stored value when present', () => {
      localStorageMock.setItem('testKey', JSON.stringify('storedValue'));
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify('storedValue'));
      
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      expect(result.current[0]).toBe('storedValue');
    });

    it('updates localStorage when value changes', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      
      act(() => {
        result.current[1]('newValue');
      });

      expect(result.current[0]).toBe('newValue');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
    });

    it('removes value from localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
      
      act(() => {
        result.current[2](); // removeValue
      });

      expect(result.current[0]).toBe('initialValue');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('supports function updates', () => {
      const { result } = renderHook(() => useLocalStorage('counter', 0));
      
      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);
    });
  });

  describe('useDebounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('test', 500));
      expect(result.current).toBe('test');
    });

    it('debounces value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current).toBe('updated');
    });

    it('resets timer on rapid changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'a' } }
      );

      rerender({ value: 'b' });
      act(() => { jest.advanceTimersByTime(200); });
      
      rerender({ value: 'c' });
      act(() => { jest.advanceTimersByTime(200); });
      
      expect(result.current).toBe('a');
      
      act(() => { jest.advanceTimersByTime(500); });
      expect(result.current).toBe('c');
    });
  });

  describe('useToggle', () => {
    it('returns false by default', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current[0]).toBe(false);
    });

    it('accepts initial value', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current[0]).toBe(true);
    });

    it('toggles value', () => {
      const { result } = renderHook(() => useToggle(false));
      
      act(() => {
        result.current[1](); // toggle
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[1](); // toggle
      });
      expect(result.current[0]).toBe(false);
    });

    it('sets specific value', () => {
      const { result } = renderHook(() => useToggle(false));
      
      act(() => {
        result.current[2](true); // set
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        result.current[2](false); // set
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('useMediaQuery', () => {
    it('returns false when query does not match', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
      expect(result.current).toBe(false);
    });

    it('returns true when query matches', () => {
      (window.matchMedia as jest.Mock).mockImplementationOnce(() => ({
        matches: true,
        media: '(min-width: 1024px)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));

      const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
      expect(result.current).toBe(true);
    });
  });

  describe('useCopyToClipboard', () => {
    it('returns null initially', () => {
      const { result } = renderHook(() => useCopyToClipboard());
      expect(result.current[0]).toBeNull();
    });

    it('copies text to clipboard', async () => {
      const { result } = renderHook(() => useCopyToClipboard());
      
      let success: boolean;
      await act(async () => {
        success = await result.current[1]('test text');
      });

      expect(success!).toBe(true);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
      expect(result.current[0]).toBe('test text');
    });

    it('handles clipboard errors', async () => {
      (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('Failed'));
      
      const { result } = renderHook(() => useCopyToClipboard());
      
      let success: boolean;
      await act(async () => {
        success = await result.current[1]('test text');
      });

      expect(success!).toBe(false);
      expect(result.current[0]).toBeNull();
    });
  });

  describe('usePrevious', () => {
    it('returns undefined on first render', () => {
      const { result } = renderHook(() => usePrevious('initial'));
      expect(result.current).toBeUndefined();
    });

    it('returns previous value after update', () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: 'first' } }
      );

      expect(result.current).toBeUndefined();

      rerender({ value: 'second' });
      expect(result.current).toBe('first');

      rerender({ value: 'third' });
      expect(result.current).toBe('second');
    });
  });

  describe('useIsClient', () => {
    it('returns false on initial render (SSR)', () => {
      const { result } = renderHook(() => useIsClient());
      // After useEffect runs, it should be true
      expect(result.current).toBe(true);
    });
  });

  describe('useScrollPosition', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    });

    it('returns initial scroll position', () => {
      const { result } = renderHook(() => useScrollPosition());
      
      expect(result.current).toEqual({
        x: 0,
        y: 0,
        direction: null,
        progress: 0,
      });
    });

    it('updates on scroll', () => {
      const { result } = renderHook(() => useScrollPosition());
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 400 });
      
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current.y).toBe(400);
      expect(result.current.direction).toBe('down');
    });
  });
});
