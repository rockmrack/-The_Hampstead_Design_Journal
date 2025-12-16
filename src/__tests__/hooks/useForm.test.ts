/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
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
  });

  const initialValues = {
    email: '',
    name: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateForm.mockImplementation((schema, data) => {
      const result = schema.safeParse(data);
      if (result.success) {
        return { success: true, data: result.data, errors: {} };
      }
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue: any) => {
        errors[issue.path[0]] = [issue.message];
      });
      return { success: false, data: null, errors };
    });
  });

  it('initializes with provided values', () => {
    const { result } = renderHook(() =>
      useForm({
        schema: testSchema,
        initialValues,
      })
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.fields.email.value).toBe('');
  });

  it('updates value on change', () => {
    const { result } = renderHook(() =>
      useForm({
        schema: testSchema,
        initialValues,
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com', type: 'text' }
      } as any);
    });

    expect(result.current.values.email).toBe('test@example.com');
  });
});
