import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================================
// Rate Limiting Configuration
// ============================================================================

interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
}

const rateLimitConfigs: Record<string, RateLimitConfig> = {
  '/api/newsletter': { windowMs: 60000, maxRequests: 3 },      // 3 per minute
  '/api/contact': { windowMs: 60000, maxRequests: 5 },         // 5 per minute
  '/api/search': { windowMs: 10000, maxRequests: 30 },         // 30 per 10 seconds
  '/api/valuation': { windowMs: 300000, maxRequests: 2 },      // 2 per 5 minutes
  'default': { windowMs: 60000, maxRequests: 100 },            // 100 per minute
};

// Simple in-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(ip: string, path: string): string {
  return `${ip}:${path}`;
}

function isRateLimited(ip: string, path: string): { limited: boolean; remaining: number; resetTime: number } {
  const config = rateLimitConfigs[path] || rateLimitConfigs.default;
  const key = getRateLimitKey(ip, path);
  const now = Date.now();
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return { limited: false, remaining: config.maxRequests - 1, resetTime: now + config.windowMs };
  }
  
  if (entry.count >= config.maxRequests) {
    return { limited: true, remaining: 0, resetTime: entry.resetTime };
  }
  
  entry.count++;
  return { limited: false, remaining: config.maxRequests - entry.count, resetTime: entry.resetTime };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => rateLimitStore.delete(key));
}, 60000); // Clean every minute

// ============================================================================
// Security Headers
// ============================================================================

function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent XSS attacks
    'X-XSS-Protection': '1; mode=block',
    
    // Prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=()',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
    
    // Strict Transport Security (HTTPS only)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  };
}

// ============================================================================
// Middleware Handler
// ============================================================================

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // =========================================================================
  // Rate Limiting for API Routes
  // =========================================================================
  
  if (pathname.startsWith('/api/')) {
    const rateLimit = isRateLimited(ip, pathname);
    
    if (rateLimit.limited) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(rateLimitConfigs[pathname]?.maxRequests || rateLimitConfigs.default.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetTime / 1000)),
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }
    
    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', String(rateLimitConfigs[pathname]?.maxRequests || rateLimitConfigs.default.maxRequests));
    response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(rateLimit.resetTime / 1000)));
  }

  // =========================================================================
  // Security Headers
  // =========================================================================
  
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // =========================================================================
  // Caching Headers for Static Assets
  // =========================================================================
  
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache static pages
  if (pathname.match(/^\/(about|contact|faq|glossary)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }

  // =========================================================================
  // Trailing Slash Handling
  // =========================================================================
  
  // Redirect trailing slashes to non-trailing (except root)
  if (pathname !== '/' && pathname.endsWith('/')) {
    return NextResponse.redirect(
      new URL(pathname.slice(0, -1), request.url),
      { status: 308 }
    );
  }

  // =========================================================================
  // Locale Detection (Future Enhancement)
  // =========================================================================
  
  // Could add locale detection and redirect here if needed

  return response;
}

// ============================================================================
// Matcher Configuration
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
