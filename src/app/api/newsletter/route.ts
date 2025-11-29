import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { newsletterSchema } from '@/lib/validation';

// Rate limiting store (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
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

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const result = newsletterSchema.safeParse(body);
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

    const { email, firstName, interests, frequency } = result.data;

    // In production, integrate with email service (Mailchimp, ConvertKit, etc.)
    // For now, log the subscription
    console.log('Newsletter subscription:', {
      email,
      firstName,
      interests,
      frequency,
      timestamp: new Date().toISOString(),
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Example: Send to Mailchimp
    // if (process.env.MAILCHIMP_API_KEY) {
    //   await fetch(`https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email_address: email,
    //       status: 'subscribed',
    //       merge_fields: {
    //         FNAME: firstName,
    //       },
    //       tags: interests,
    //     }),
    //   });
    // }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to The Hampstead Design Journal!',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
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
