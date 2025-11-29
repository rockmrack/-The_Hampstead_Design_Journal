/**
 * Form Validation System with Zod
 * Type-safe validation schemas for all forms
 */

import { z } from 'zod';

// Common validation patterns
const patterns = {
  phone: /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/,
  postcode: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
  ukPhone: /^(?:0|\+44)(?:\d\s?){10}$/,
};

// Reusable field schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => !val || patterns.phone.test(val.replace(/\s/g, '')),
    'Please enter a valid UK phone number'
  );

export const postcodeSchema = z
  .string()
  .min(1, 'Postcode is required')
  .refine(
    (val) => patterns.postcode.test(val),
    'Please enter a valid UK postcode'
  );

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters');

export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(5000, 'Message must be less than 5000 characters');

// Newsletter subscription form
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: z.string().optional(),
  interests: z.array(z.enum([
    'heritage-architecture',
    'planning-regulations',
    'interiors-materials',
    'market-watch',
    'events',
  ])).optional(),
  frequency: z.enum(['weekly', 'monthly']).default('weekly'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive our newsletter',
  }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Contact form
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.enum([
    'general-enquiry',
    'renovation-consultation',
    'planning-advice',
    'heritage-assessment',
    'press-media',
    'partnerships',
  ]),
  message: messageSchema,
  propertyPostcode: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'either']).default('email'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Property valuation form
export const valuationSchema = z.object({
  // Contact details
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  
  // Property details
  propertyAddress: z.string().min(1, 'Property address is required'),
  postcode: postcodeSchema,
  propertyType: z.enum([
    'detached',
    'semi-detached',
    'terraced',
    'flat',
    'maisonette',
    'other',
  ]),
  bedrooms: z.number().min(1).max(20),
  bathrooms: z.number().min(1).max(15),
  receptionRooms: z.number().min(0).max(10),
  squareFootage: z.number().optional(),
  yearBuilt: z.number().optional(),
  
  // Property features
  features: z.array(z.enum([
    'garden',
    'parking',
    'garage',
    'basement',
    'loft-conversion',
    'extension',
    'period-features',
    'listed-building',
    'conservation-area',
  ])).optional(),
  
  // Condition
  condition: z.enum([
    'excellent',
    'good',
    'fair',
    'needs-work',
    'renovation-project',
  ]),
  
  // Reason for valuation
  reason: z.enum([
    'selling',
    'remortgage',
    'equity-release',
    'insurance',
    'curiosity',
    'inheritance',
  ]),
  
  additionalInfo: z.string().max(2000).optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

export type ValuationFormData = z.infer<typeof valuationSchema>;

// Consultation booking form
export const consultationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  
  consultationType: z.enum([
    'renovation-planning',
    'heritage-restoration',
    'planning-application',
    'interior-design',
    'project-management',
    'cost-estimation',
  ]),
  
  propertyPostcode: postcodeSchema,
  projectDescription: z.string()
    .min(1, 'Please describe your project')
    .min(50, 'Please provide more detail (at least 50 characters)')
    .max(5000, 'Description must be less than 5000 characters'),
  
  estimatedBudget: z.enum([
    'under-50k',
    '50k-100k',
    '100k-250k',
    '250k-500k',
    '500k-1m',
    'over-1m',
    'unsure',
  ]),
  
  preferredTimeframe: z.enum([
    'asap',
    '1-3-months',
    '3-6-months',
    '6-12-months',
    'over-12-months',
    'flexible',
  ]),
  
  preferredContactTime: z.enum([
    'morning',
    'afternoon',
    'evening',
    'anytime',
  ]).default('anytime'),
  
  howDidYouHear: z.enum([
    'search-engine',
    'social-media',
    'referral',
    'previous-client',
    'press',
    'event',
    'other',
  ]).optional(),
  
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

// Event registration form
export const eventRegistrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  
  eventId: z.string().min(1, 'Event ID is required'),
  attendees: z.number().min(1).max(10).default(1),
  dietaryRequirements: z.string().max(500).optional(),
  accessibilityNeeds: z.string().max(500).optional(),
  
  specialRequests: z.string().max(1000).optional(),
  
  marketingConsent: z.boolean().default(false),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;

// Supplier enquiry form
export const supplierEnquirySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  website: z.string().url().optional().or(z.literal('')),
  
  category: z.enum([
    'architect',
    'builder',
    'joiner',
    'plasterer',
    'roofer',
    'electrician',
    'plumber',
    'landscaper',
    'interior-designer',
    'antiques-dealer',
    'materials-supplier',
    'other',
  ]),
  
  servicesDescription: z.string()
    .min(1, 'Please describe your services')
    .min(50, 'Please provide more detail')
    .max(3000),
  
  yearsInBusiness: z.number().min(0).max(200),
  insuranceCover: z.boolean(),
  qualifications: z.string().max(1000).optional(),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to our privacy policy',
  }),
});

export type SupplierEnquiryFormData = z.infer<typeof supplierEnquirySchema>;

// Validation helper function
export function validateForm<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });
  
  return { success: false, errors };
}

// Form state types
export interface FormState<T> {
  data: Partial<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isValid: boolean;
}

export function createInitialFormState<T>(initialData?: Partial<T>): FormState<T> {
  return {
    data: initialData || {},
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    isValid: false,
  };
}
