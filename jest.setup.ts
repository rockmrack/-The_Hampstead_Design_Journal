import '@testing-library/jest-dom';
import React from 'react';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {}
  
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

global.ResizeObserver = MockResizeObserver;

// Mock matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock scrollTo
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  });
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] || null,
  };
})();

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
  });
}

// Mock clipboard API
if (typeof navigator !== 'undefined') {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined),
      readText: jest.fn().mockResolvedValue(''),
    },
    writable: true,
  });
}

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    headers: new Headers(),
    status: 200,
    statusText: 'OK',
  } as Response)
);

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Helper to create mock elements
const createMockElement = (tag: string) => {
  return function MockElement({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) {
    const { initial, animate, exit, whileHover, whileTap, variants, transition, ...validProps } = props;
    return React.createElement(tag, validProps, children);
  };
};

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: createMockElement('div'),
    span: createMockElement('span'),
    button: createMockElement('button'),
    ul: createMockElement('ul'),
    li: createMockElement('li'),
    nav: createMockElement('nav'),
    header: createMockElement('header'),
    section: createMockElement('section'),
    article: createMockElement('article'),
    p: createMockElement('p'),
    h1: createMockElement('h1'),
    h2: createMockElement('h2'),
    h3: createMockElement('h3'),
    img: (props: Record<string, unknown>) => {
      const { initial, animate, exit, variants, transition, ...validProps } = props;
      return React.createElement('img', validProps);
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => true,
  useReducedMotion: () => false,
}));

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});

// Global test timeout
jest.setTimeout(10000);

// Suppress specific console warnings in tests
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Warning: An update to') ||
      args[0].includes('act(...)'))
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

export { localStorageMock };
