import { sanitizeUrl as sanitize } from '@braintree/sanitize-url';

const SAFE_PROTOCOLS = new Set(['http:', 'https:']);

export function sanitizeExternalUrl(url: string | undefined): string | null {
  if (!url) return null;

  const sanitized = sanitize(url);
  if (!sanitized || sanitized === 'about:blank') return null;

  try {
    const parsed = new URL(sanitized);
    if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function toSafeInternalHref(url: string | undefined): string | null {
  if (!url) return null;

  // During SSR/compile-time (or tests), fall back to strict relative-path checks.
  if (typeof window === 'undefined') {
    if (!url.startsWith('/')) return null;
    if (url.startsWith('//')) return null;
    return url;
  }

  try {
    const parsed = new URL(url, window.location.origin);

    // Only allow same-origin navigation.
    if (parsed.origin !== window.location.origin) return null;

    // Only allow absolute paths.
    if (!parsed.pathname.startsWith('/')) return null;

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

export function toSafeBrowserUrl(url: string | undefined): string | null {
  if (!url) return null;

  if (typeof window === 'undefined') {
    // We can't safely resolve relative URLs without an origin.
    // Only permit absolute http(s) URLs.
    return sanitizeExternalUrl(url);
  }

  const sanitized = sanitize(url);
  if (!sanitized || sanitized === 'about:blank') return null;

  try {
    const parsed = new URL(sanitized, window.location.origin);
    if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function toSafeDownloadFilename(alt: string, src: string): string {
  const baseName = alt
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  let extension = 'jpg';
  try {
    const parsed = new URL(src, 'https://example.invalid');
    const match = parsed.pathname.toLowerCase().match(/\.(avif|gif|jpe?g|png|webp)$/);
    if (match) extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  } catch {
    // ignore
  }

  return `${baseName || 'image'}.${extension}`;
}
