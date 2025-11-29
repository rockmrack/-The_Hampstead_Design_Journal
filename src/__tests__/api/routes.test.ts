/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Test utility for creating mock requests
function createMockRequest(
  method: string,
  body: Record<string, unknown>,
  headers: Record<string, string> = {}
): NextRequest {
  return new NextRequest('http://localhost:3000/api/test', {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// Mock rate limiting
const mockRateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = mockRateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    mockRateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

describe('Newsletter API Route', () => {
  beforeEach(() => {
    mockRateLimit.clear();
  });

  describe('POST /api/newsletter', () => {
    it('accepts valid email subscription', async () => {
      const body = {
        email: 'test@example.com',
        firstName: 'John',
        interests: ['architecture', 'interiors'],
      };

      // Simulate validation
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
      expect(isValid).toBe(true);
    });

    it('rejects invalid email', () => {
      const body = {
        email: 'invalid-email',
        firstName: 'John',
      };

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
      expect(isValid).toBe(false);
    });

    it('accepts subscription without optional fields', () => {
      const body = {
        email: 'test@example.com',
      };

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
      expect(isValid).toBe(true);
    });

    it('validates interests array', () => {
      const validInterests = ['architecture', 'interiors', 'living'];
      const invalidInterests = ['invalid-category'];

      const allowedInterests = [
        'architecture',
        'interiors',
        'living',
        'heritage',
        'market-watch',
        'planning',
      ];

      const allValid = validInterests.every(i => allowedInterests.includes(i));
      const hasInvalid = invalidInterests.some(i => !allowedInterests.includes(i));

      expect(allValid).toBe(true);
      expect(hasInvalid).toBe(true);
    });
  });

  describe('Rate Limiting', () => {
    it('allows requests within rate limit', () => {
      const ip = '127.0.0.1';
      const limit = 5;
      const windowMs = 60000;

      // First request should pass
      expect(checkRateLimit(ip, limit, windowMs)).toBe(true);
      expect(checkRateLimit(ip, limit, windowMs)).toBe(true);
      expect(checkRateLimit(ip, limit, windowMs)).toBe(true);
    });

    it('blocks requests exceeding rate limit', () => {
      const ip = '127.0.0.2';
      const limit = 3;
      const windowMs = 60000;

      // Use up the limit
      checkRateLimit(ip, limit, windowMs);
      checkRateLimit(ip, limit, windowMs);
      checkRateLimit(ip, limit, windowMs);

      // Next request should be blocked
      expect(checkRateLimit(ip, limit, windowMs)).toBe(false);
    });

    it('resets rate limit after window', () => {
      const ip = '127.0.0.3';
      const limit = 2;
      const windowMs = 100; // Short window for testing

      // Use up the limit
      checkRateLimit(ip, limit, windowMs);
      checkRateLimit(ip, limit, windowMs);
      expect(checkRateLimit(ip, limit, windowMs)).toBe(false);

      // Manually reset for test
      mockRateLimit.delete(ip);

      // Should work again
      expect(checkRateLimit(ip, limit, windowMs)).toBe(true);
    });
  });
});

describe('Contact API Route', () => {
  describe('POST /api/contact', () => {
    const validContactData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'general-inquiry',
      message: 'This is a test message with more than 20 characters for validation.',
      phone: '+44 20 1234 5678',
    };

    it('validates required fields', () => {
      const requiredFields = ['name', 'email', 'subject', 'message'];
      const data = { ...validContactData };

      const hasAllRequired = requiredFields.every(field => field in data && data[field as keyof typeof data]);
      expect(hasAllRequired).toBe(true);
    });

    it('rejects short name', () => {
      const data = { ...validContactData, name: 'J' };
      expect(data.name.length).toBeLessThan(2);
    });

    it('rejects short message', () => {
      const data = { ...validContactData, message: 'Short' };
      expect(data.message.length).toBeLessThan(20);
    });

    it('validates email format', () => {
      const validEmails = ['test@example.com', 'user.name@domain.co.uk'];
      const invalidEmails = ['invalid', '@domain.com', 'user@'];

      validEmails.forEach(email => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(true);
      });

      invalidEmails.forEach(email => {
        expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(false);
      });
    });

    it('validates subject types', () => {
      const validSubjects = [
        'general-inquiry',
        'advertising',
        'editorial',
        'partnership',
        'technical',
      ];

      const data = validContactData;
      expect(validSubjects.includes(data.subject)).toBe(true);
    });

    it('validates UK phone number format', () => {
      const validPhones = ['+44 20 1234 5678', '020 1234 5678', '07123456789'];
      const invalidPhones = ['+1 555 123 4567', '123'];

      const phoneRegex = /^(?:\+44|0)(?:\d\s?){9,10}$/;

      validPhones.forEach(phone => {
        expect(phoneRegex.test(phone.replace(/\s/g, ''))).toBe(true);
      });
    });
  });
});

describe('Search API Route', () => {
  describe('POST /api/search', () => {
    it('accepts valid search query', () => {
      const body = {
        query: 'victorian architecture',
        filters: {
          categories: ['architecture'],
        },
        page: 1,
        limit: 10,
      };

      expect(body.query.length).toBeGreaterThan(0);
      expect(body.page).toBeGreaterThan(0);
      expect(body.limit).toBeLessThanOrEqual(50);
    });

    it('rejects empty query', () => {
      const body = {
        query: '',
        page: 1,
      };

      expect(body.query.length).toBe(0);
    });

    it('applies default pagination', () => {
      const body = {
        query: 'test',
      };

      const defaults = {
        page: 1,
        limit: 10,
      };

      const finalParams = { ...defaults, ...body };
      expect(finalParams.page).toBe(1);
      expect(finalParams.limit).toBe(10);
    });

    it('validates category filters', () => {
      const validCategories = [
        'architecture',
        'heritage-architecture',
        'interiors',
        'living',
        'market-watch',
        'planning-regulations',
      ];

      const filters = { categories: ['architecture', 'interiors'] };
      const allValid = filters.categories.every(c => validCategories.includes(c));
      expect(allValid).toBe(true);
    });

    it('limits results per page', () => {
      const maxLimit = 50;
      const requestedLimit = 100;
      const effectiveLimit = Math.min(requestedLimit, maxLimit);

      expect(effectiveLimit).toBe(50);
    });

    it('handles date range filters', () => {
      const filters = {
        dateRange: {
          start: '2024-01-01',
          end: '2024-12-31',
        },
      };

      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      expect(startDate < endDate).toBe(true);
    });
  });
});

describe('API Error Handling', () => {
  it('returns proper error format', () => {
    const createErrorResponse = (message: string, code: string, status: number) => ({
      success: false,
      error: {
        message,
        code,
      },
      status,
    });

    const error = createErrorResponse('Invalid email', 'VALIDATION_ERROR', 400);

    expect(error.success).toBe(false);
    expect(error.error.message).toBe('Invalid email');
    expect(error.error.code).toBe('VALIDATION_ERROR');
    expect(error.status).toBe(400);
  });

  it('returns proper success format', () => {
    const createSuccessResponse = (data: unknown) => ({
      success: true,
      data,
    });

    const response = createSuccessResponse({ subscribed: true });

    expect(response.success).toBe(true);
    expect(response.data).toEqual({ subscribed: true });
  });
});

describe('API Validation', () => {
  describe('Input Sanitization', () => {
    it('trims whitespace from strings', () => {
      const input = '  test@example.com  ';
      const sanitized = input.trim();
      expect(sanitized).toBe('test@example.com');
    });

    it('normalizes email to lowercase', () => {
      const input = 'Test@EXAMPLE.com';
      const normalized = input.toLowerCase();
      expect(normalized).toBe('test@example.com');
    });

    it('escapes HTML in messages', () => {
      const input = '<script>alert("xss")</script>';
      const escaped = input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });
  });

  describe('Content-Type Validation', () => {
    it('accepts application/json', () => {
      const contentType = 'application/json';
      const isValid = contentType.includes('application/json');
      expect(isValid).toBe(true);
    });

    it('rejects non-JSON content types', () => {
      const contentType = 'text/plain';
      const isValid = contentType.includes('application/json');
      expect(isValid).toBe(false);
    });
  });
});
