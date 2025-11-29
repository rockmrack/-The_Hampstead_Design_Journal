/**
 * API Client with caching, rate limiting, and error handling
 */

import { analytics } from './analytics';

export interface APIResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    cached?: boolean;
    timestamp?: number;
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  status: number;
}

export class APIClientError extends Error {
  code: string;
  status: number;
  details?: Record<string, unknown>;

  constructor(error: APIError) {
    super(error.message);
    this.name = 'APIClientError';
    this.code = error.code;
    this.status = error.status;
    this.details = error.details;
  }
}

// Cache configuration
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const timestamp = Date.now();
    this.cache.set(key, {
      data,
      timestamp,
      expiresAt: timestamp + (ttl || this.defaultTTL),
    });
  }

  invalidate(pattern?: string | RegExp): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    return !!entry && Date.now() <= entry.expiresAt;
  }
}

// Rate limiter
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }
}

// Retry configuration
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

// Main API Client
class APIClient {
  private baseUrl: string;
  private cache: APICache;
  private rateLimiter: RateLimiter;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.cache = new APICache();
    this.rateLimiter = new RateLimiter();
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private calculateRetryDelay(attempt: number, config: RetryConfig): number {
    const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
    return Math.min(delay, config.maxDelay);
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private getCacheKey(method: string, url: string, body?: unknown): string {
    return `${method}:${url}:${body ? JSON.stringify(body) : ''}`;
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    options: {
      params?: Record<string, string | number | boolean>;
      body?: unknown;
      headers?: Record<string, string>;
      cache?: boolean | number; // true = default TTL, number = custom TTL in ms
      retry?: Partial<RetryConfig>;
      timeout?: number;
    } = {}
  ): Promise<APIResponse<T>> {
    const {
      params,
      body,
      headers = {},
      cache = method === 'GET',
      retry = {},
      timeout = 30000,
    } = options;

    const url = this.buildUrl(endpoint, params);
    const cacheKey = this.getCacheKey(method, url, body);
    const retryConfig = { ...defaultRetryConfig, ...retry };

    // Check cache for GET requests
    if (cache && method === 'GET') {
      const cached = this.cache.get<APIResponse<T>>(cacheKey);
      if (cached) {
        return { ...cached, meta: { ...cached.meta, cached: true } };
      }
    }

    // Check rate limit
    if (!this.rateLimiter.canMakeRequest()) {
      throw new APIClientError({
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
        status: 429,
      });
    }

    let lastError: APIClientError | null = null;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        this.rateLimiter.recordRequest();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const startTime = performance.now();

        const response = await fetch(url, {
          method,
          headers: { ...this.defaultHeaders, ...headers },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Track performance
        const duration = performance.now() - startTime;
        analytics.performance('api_request', duration);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new APIClientError({
            code: errorData.code || 'API_ERROR',
            message: errorData.message || `HTTP ${response.status}`,
            status: response.status,
            details: errorData.details,
          });
        }

        const data = await response.json();
        const result: APIResponse<T> = {
          data,
          meta: {
            cached: false,
            timestamp: Date.now(),
          },
        };

        // Cache successful GET responses
        if (cache && method === 'GET') {
          const ttl = typeof cache === 'number' ? cache : undefined;
          this.cache.set(cacheKey, result, ttl);
        }

        return result;
      } catch (error) {
        if (error instanceof APIClientError) {
          lastError = error;
          
          // Don't retry client errors (4xx)
          if (error.status >= 400 && error.status < 500) {
            throw error;
          }
        } else if (error instanceof Error && error.name === 'AbortError') {
          lastError = new APIClientError({
            code: 'TIMEOUT',
            message: 'Request timed out',
            status: 408,
          });
        } else {
          lastError = new APIClientError({
            code: 'NETWORK_ERROR',
            message: error instanceof Error ? error.message : 'Network error',
            status: 0,
          });
        }

        // Retry with exponential backoff
        if (attempt < retryConfig.maxRetries) {
          const delay = this.calculateRetryDelay(attempt, retryConfig);
          await this.delay(delay);
        }
      }
    }

    // All retries failed
    if (lastError) {
      analytics.error(lastError, { endpoint, method });
      throw lastError;
    }

    throw new APIClientError({
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      status: 500,
    });
  }

  // Convenience methods
  async get<T>(endpoint: string, options?: Parameters<typeof this.request>[2]): Promise<APIResponse<T>> {
    return this.request<T>('GET', endpoint, options);
  }

  async post<T>(endpoint: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<APIResponse<T>> {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  async put<T>(endpoint: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<APIResponse<T>> {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  async patch<T>(endpoint: string, body?: unknown, options?: Omit<Parameters<typeof this.request>[2], 'body'>): Promise<APIResponse<T>> {
    return this.request<T>('PATCH', endpoint, { ...options, body });
  }

  async delete<T>(endpoint: string, options?: Parameters<typeof this.request>[2]): Promise<APIResponse<T>> {
    return this.request<T>('DELETE', endpoint, options);
  }

  // Cache management
  invalidateCache(pattern?: string | RegExp): void {
    this.cache.invalidate(pattern);
  }

  // Rate limit info
  getRateLimitStatus(): { remaining: number } {
    return { remaining: this.rateLimiter.getRemainingRequests() };
  }
}

// Singleton instance
export const apiClient = new APIClient();

export default apiClient;
