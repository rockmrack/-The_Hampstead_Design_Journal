/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useForm } from '@/hooks/useForm';
import { z } from 'zod';

// Mock validation
jest.mock('@/lib/validation', () => ({
  validateForm: jest.fn(),
}));

import { validateForm } from '@/lib/validation';
const mockValidateForm = validateForm as jest.MockedFunction<typeof validateForm>;

describe('useForm Hook', () => {
  const testSchema = z.object({
    email: z.string().email('Invalid email'),
    name: z.string().min(2, 'Name too short'),
    message: z.string().min(10, 'Message too short'),
  });

  const initialValues = {
    email: '',
    name: '',
    message: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateForm.mockImplementation((schema, data) => {
      const result = schema.safeParse(data);
      if (result.success) {
        return { success: true, data: result.data, errors: {} };
      }
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue: any) => {
        errors[issue.path[0]] = issue.message;
      });
      return { success: false, data: null, errors };
    });
  });

  describe('Initial State', () => {
    it('initializes with provided values', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      expect(result.current.values).toEqual(initialValues);
      expect(result.current.errors).toEqual({});
      expect(result.current.touched).toEqual({});
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isValid).toBe(false);
    });

    it('initializes with custom initial values', () => {
      const customValues = {
        email: 'test@example.com',
        name: 'John',
        message: 'Hello world!',
      };

      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues: customValues,
        })
      );

      expect(result.current.values).toEqual(customValues);
    });
  });

  describe('Field Changes', () => {
    it('updates value on change', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleChange('email', 'test@example.com');
      });

      expect(result.current.values.email).toBe('test@example.com');
    });

    it('marks field as touched on blur', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleBlur('email');
      });

      expect(result.current.touched.email).toBe(true);
    });

    it('validates field on blur when validateOnBlur is true', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
          validateOnBlur: true,
        })
      );

      act(() => {
        result.current.handleChange('email', 'invalid');
        result.current.handleBlur('email');
      });

      expect(result.current.errors.email).toBe('Invalid email');
    });

    it('validates field on change when validateOnChange is true', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
          validateOnChange: true,
        })
      );

      act(() => {
        result.current.handleChange('email', 'invalid');
      });

      expect(result.current.errors.email).toBe('Invalid email');
    });
  });

  describe('Form Validation', () => {
    it('validates entire form', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.validate();
      });

      expect(result.current.errors.email).toBe('Invalid email');
      expect(result.current.errors.name).toBeTruthy();
      expect(result.current.errors.message).toBeTruthy();
    });

    it('clears errors for valid fields', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      // First validate with invalid values
      act(() => {
        result.current.validate();
      });

      expect(result.current.errors.email).toBeTruthy();

      // Fix the email field
      act(() => {
        result.current.handleChange('email', 'test@example.com');
        result.current.validate();
      });

      expect(result.current.errors.email).toBeUndefined();
    });

    it('updates isValid based on validation', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      expect(result.current.isValid).toBe(false);

      act(() => {
        result.current.handleChange('email', 'test@example.com');
        result.current.handleChange('name', 'John Doe');
        result.current.handleChange('message', 'This is a long enough message');
        result.current.validate();
      });

      expect(result.current.isValid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with valid data', async () => {
      const onSubmit = jest.fn().mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues: {
            email: 'test@example.com',
            name: 'John Doe',
            message: 'This is a test message',
          },
          onSubmit,
        })
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'John Doe',
        message: 'This is a test message',
      });
    });

    it('does not call onSubmit with invalid data', async () => {
      const onSubmit = jest.fn();

      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
          onSubmit,
        })
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('sets isSubmitting during submission', async () => {
      let resolveSubmit: () => void;
      const submitPromise = new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
      const onSubmit = jest.fn().mockReturnValue(submitPromise);

      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues: {
            email: 'test@example.com',
            name: 'John Doe',
            message: 'This is a test message',
          },
          onSubmit,
        })
      );

      expect(result.current.isSubmitting).toBe(false);

      const submitPromiseResult = act(async () => {
        await result.current.handleSubmit();
      });

      await waitFor(() => {
        expect(result.current.isSubmitting).toBe(true);
      });

      resolveSubmit!();
      await submitPromiseResult;

      expect(result.current.isSubmitting).toBe(false);
    });

    it('marks all fields as touched on submit', async () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      expect(result.current.touched).toEqual({});

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.touched.email).toBe(true);
      expect(result.current.touched.name).toBe(true);
      expect(result.current.touched.message).toBe(true);
    });

    it('handles submission errors', async () => {
      const onSubmit = jest.fn().mockRejectedValue(new Error('Submission failed'));

      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues: {
            email: 'test@example.com',
            name: 'John Doe',
            message: 'This is a test message',
          },
          onSubmit,
        })
      );

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.submitError).toBe('Submission failed');
      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('Form Reset', () => {
    it('resets to initial values', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleChange('email', 'test@example.com');
        result.current.handleChange('name', 'John');
      });

      expect(result.current.values.email).toBe('test@example.com');

      act(() => {
        result.current.reset();
      });

      expect(result.current.values).toEqual(initialValues);
    });

    it('clears errors on reset', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.validate();
      });

      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

      act(() => {
        result.current.reset();
      });

      expect(result.current.errors).toEqual({});
    });

    it('clears touched state on reset', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleBlur('email');
        result.current.handleBlur('name');
      });

      expect(result.current.touched.email).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.touched).toEqual({});
    });
  });

  describe('Set Values', () => {
    it('sets multiple values at once', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.setValues({
          email: 'new@example.com',
          name: 'Jane Doe',
        });
      });

      expect(result.current.values.email).toBe('new@example.com');
      expect(result.current.values.name).toBe('Jane Doe');
      expect(result.current.values.message).toBe('');
    });
  });

  describe('Set Errors', () => {
    it('sets custom errors', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.setErrors({
          email: 'Email already taken',
        });
      });

      expect(result.current.errors.email).toBe('Email already taken');
    });
  });

  describe('Field Helpers', () => {
    it('provides getFieldProps helper', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      const fieldProps = result.current.getFieldProps('email');

      expect(fieldProps.name).toBe('email');
      expect(fieldProps.value).toBe('');
      expect(typeof fieldProps.onChange).toBe('function');
      expect(typeof fieldProps.onBlur).toBe('function');
    });

    it('provides getFieldMeta helper', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleBlur('email');
        result.current.validate();
      });

      const meta = result.current.getFieldMeta('email');

      expect(meta.touched).toBe(true);
      expect(meta.error).toBe('Invalid email');
    });
  });

  describe('Dirty State', () => {
    it('tracks dirty state', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      expect(result.current.isDirty).toBe(false);

      act(() => {
        result.current.handleChange('email', 'test@example.com');
      });

      expect(result.current.isDirty).toBe(true);
    });

    it('resets dirty state on reset', () => {
      const { result } = renderHook(() =>
        useForm({
          schema: testSchema,
          initialValues,
        })
      );

      act(() => {
        result.current.handleChange('email', 'test@example.com');
      });

      expect(result.current.isDirty).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isDirty).toBe(false);
    });
  });
});
