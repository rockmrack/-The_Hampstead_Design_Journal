import { 
  validateForm, 
  validateField, 
  newsletterSchema, 
  contactSchema,
  consultationSchema,
} from '@/lib/validation';
import { z } from 'zod';

describe('Validation Library', () => {
  describe('validateForm', () => {
    const testSchema = z.object({
      email: z.string().email('Invalid email'),
      name: z.string().min(2, 'Name too short'),
    });

    it('returns success for valid data', () => {
      const result = validateForm(testSchema, {
        email: 'test@example.com',
        name: 'John Doe',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          email: 'test@example.com',
          name: 'John Doe',
        });
      }
    });

    it('returns errors for invalid data', () => {
      const result = validateForm(testSchema, {
        email: 'invalid',
        name: 'J',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty('email');
        expect(result.errors).toHaveProperty('name');
      }
    });

    it('handles missing fields', () => {
      const result = validateForm(testSchema, {});

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveProperty('email');
        expect(result.errors).toHaveProperty('name');
      }
    });
  });

  describe('validateField', () => {
    const emailSchema = z.string().email('Invalid email');

    it('returns success for valid field', () => {
      const result = validateField(emailSchema, 'test@example.com');
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('test@example.com');
      }
    });

    it('returns error for invalid field', () => {
      const result = validateField(emailSchema, 'invalid');
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Invalid email');
      }
    });
  });

  describe('newsletterSchema', () => {
    it('accepts valid newsletter data', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        firstName: 'John',
        interests: ['heritage-architecture'],
        gdprConsent: true,
      });

      if (!result.success) {
        console.log('Newsletter Error:', result.error);
      }
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = newsletterSchema.safeParse({
        email: 'invalid',
        firstName: 'John',
        gdprConsent: true,
      });

      expect(result.success).toBe(false);
    });

    it('allows optional firstName', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        gdprConsent: true,
      });

      expect(result.success).toBe(true);
    });

    it('validates interests array', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        interests: ['heritage-architecture', 'interiors-materials', 'market-watch'],
        gdprConsent: true,
      });

      expect(result.success).toBe(true);
    });
  });

  describe('contactSchema', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'general-enquiry',
      message: 'This is a test message with more than 20 characters.',
      gdprConsent: true,
    };

    it('accepts valid contact data', () => {
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('rejects short name', () => {
      const result = contactSchema.safeParse({
        ...validData,
        name: 'J',
      });

      expect(result.success).toBe(false);
    });

    it('rejects short message', () => {
      const result = contactSchema.safeParse({
        ...validData,
        message: 'Too short',
      });

      expect(result.success).toBe(false);
    });

    it('validates phone number format', () => {
      const result = contactSchema.safeParse({
        ...validData,
        phone: '+44 20 1234 5678',
      });

      expect(result.success).toBe(true);
    });

    it('allows optional preferredContact', () => {
      const result = contactSchema.safeParse({
        ...validData,
        preferredContact: 'email',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('consultationSchema', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+44 20 1234 5678',
      consultationType: 'renovation-planning',
      propertyPostcode: 'NW3 1AB',
      projectDescription: 'Looking to renovate a Victorian property with period features. This description needs to be at least 50 characters long so I am adding some filler text here.',
      estimatedBudget: '100k-250k',
      preferredTimeframe: '6-12-months',
      preferredContactTime: 'morning',
      gdprConsent: true,
    };

    it('accepts valid consultation data', () => {
      const result = consultationSchema.safeParse(validData);
      if (!result.success) {
        console.log('Consultation Error:', result.error);
      }
      expect(result.success).toBe(true);
    });

    it('rejects invalid consultation type', () => {
      const result = consultationSchema.safeParse({
        ...validData,
        consultationType: 'invalid',
      });

      expect(result.success).toBe(false);
    });

    it('validates postcode format', () => {
      const result = consultationSchema.safeParse({
        ...validData,
        propertyPostcode: 'INVALID',
      });

      expect(result.success).toBe(false);
    });

    it('rejects short description', () => {
      const result = consultationSchema.safeParse({
        ...validData,
        projectDescription: 'Too short',
      });

      expect(result.success).toBe(false);
    });
  });
});

describe('Custom Validators', () => {
  describe('UK Postcode Validation', () => {
    const postcodeSchema = z.string().regex(
      /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
      'Invalid UK postcode'
    );

    const validPostcodes = [
      'NW3 1AB',
      'SW1A 1AA',
      'EC1A 1BB',
      'W1A 0AX',
      'M1 1AE',
      'B33 8TH',
      'CR2 6XH',
    ];

    const invalidPostcodes = [
      '12345',
      'INVALID',
      'AB12 34',
      '123 456',
    ];

    it.each(validPostcodes)('accepts valid postcode: %s', (postcode) => {
      const result = postcodeSchema.safeParse(postcode);
      expect(result.success).toBe(true);
    });

    it.each(invalidPostcodes)('rejects invalid postcode: %s', (postcode) => {
      const result = postcodeSchema.safeParse(postcode);
      expect(result.success).toBe(false);
    });
  });

  describe('UK Phone Number Validation', () => {
    const phoneSchema = z.string().regex(
      /^(?:\+44\s?|0)(?:\d\s?){9,10}$/,
      'Invalid UK phone number'
    );

    const validNumbers = [
      '+44 20 1234 5678',
      '+441234567890',
      '020 1234 5678',
      '07123456789',
    ];

    const invalidNumbers = [
      '12345',
      '+1 555 123 4567', // US format
      'invalid',
    ];

    it.each(validNumbers)('accepts valid number: %s', (phone) => {
      const result = phoneSchema.safeParse(phone);
      expect(result.success).toBe(true);
    });

    it.each(invalidNumbers)('rejects invalid number: %s', (phone) => {
      const result = phoneSchema.safeParse(phone);
      expect(result.success).toBe(false);
    });
  });
});
