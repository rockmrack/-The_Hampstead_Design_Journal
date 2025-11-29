import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';

// Rate limiting store (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 3, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Honeypot check - if this field is filled, it's likely a bot
function checkHoneypot(body: Record<string, unknown>): boolean {
  // Check for common honeypot field names
  const honeypotFields = ['website', 'url', 'fax', 'phone2', '_gotcha', 'address2'];
  return !honeypotFields.some(field => body[field] && String(body[field]).length > 0);
}

// Simple spam content check
function checkSpamContent(message: string): boolean {
  const spamPatterns = [
    /viagra|cialis|casino|lottery|winner|congratulations.*won/i,
    /https?:\/\/[^\s]+\.(ru|cn|tk|ga|ml)/i, // Suspicious TLDs
    /click here|act now|limited time/i,
    /\$\d+[,\d]*\s*(million|thousand|usd|dollars)/i,
  ];
  
  return !spamPatterns.some(pattern => pattern.test(message));
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limiting (stricter for contact form)
    if (!checkRateLimit(ip, 3, 300000)) { // 3 requests per 5 minutes
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again in a few minutes.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Honeypot check
    if (!checkHoneypot(body)) {
      // Silently accept but don't process (don't let bots know they were caught)
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
      });
    }

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, preferredContact, gdprConsent } = result.data;

    // Spam content check
    if (!checkSpamContent(message)) {
      // Log suspicious activity but don't reveal to sender
      console.warn('Potential spam contact form submission:', { email, ip });
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
      });
    }

    // Log the contact submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message: message.substring(0, 100) + '...', // Truncate for logging
      preferredContact,
      gdprConsent,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production:
    // 1. Send email notification to team
    // 2. Store in CRM/database
    // 3. Send auto-reply to sender

    // Example: Send notification email
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New Contact Form: ${subject}`,
    //   template: 'contact-notification',
    //   data: { name, email, phone, subject, message },
    // });

    // Example: Send auto-reply
    // await sendEmail({
    //   to: email,
    //   subject: 'Thank you for contacting The Hampstead Design Journal',
    //   template: 'contact-auto-reply',
    //   data: { name },
    // });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24-48 hours.',
      referenceId: `HDJ-${Date.now().toString(36).toUpperCase()}`,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
