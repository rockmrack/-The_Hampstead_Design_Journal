'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { z } from 'zod';
import { validateForm, FormState } from '@/lib/validation';
import { useFormAnalytics } from './useAnalytics';

// ============================================================================
// Types
// ============================================================================

export interface FieldState {
  value: string;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

export interface FormConfig<T extends z.ZodObject<z.ZodRawShape>> {
  schema: T;
  initialValues?: Partial<z.infer<T>>;
  onSubmit?: (values: z.infer<T>) => void | Promise<void>;
  onError?: (errors: Record<string, string[]>) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  resetOnSubmit?: boolean;
  analyticsFormName?: string;
}

// ============================================================================
// useForm Hook - Main form management
// ============================================================================

export function useForm<T extends z.ZodObject<z.ZodRawShape>>(config: FormConfig<T>) {
  const {
    schema,
    initialValues = {} as Partial<z.infer<T>>,
    onSubmit,
    onError,
    validateOnChange = false,
    validateOnBlur = true,
    resetOnSubmit = false,
    analyticsFormName,
  } = config;

  type FormValues = z.infer<T>;
  type FieldName = keyof FormValues;

  // Get field names from schema
  const fieldNames = Object.keys(schema.shape) as FieldName[];

  // Initialize field states
  const getInitialFieldStates = useCallback(() => {
    const states: Record<string, FieldState> = {};
    fieldNames.forEach((name) => {
      states[name as string] = {
        value: String(initialValues[name] ?? ''),
        error: null,
        touched: false,
        dirty: false,
      };
    });
    return states;
  }, [fieldNames, initialValues]);

  const [fields, setFields] = useState<Record<string, FieldState>>(getInitialFieldStates);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitCount, setSubmitCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Analytics tracking
  const formAnalytics = analyticsFormName 
    ? useFormAnalytics({ formName: analyticsFormName })
    : null;

  // Get current values as object
  const values = useMemo(() => {
    const vals: Record<string, string> = {};
    Object.entries(fields).forEach(([key, field]) => {
      vals[key] = field.value;
    });
    return vals as FormValues;
  }, [fields]);

  // Validate single field
  const validateField = useCallback((name: FieldName, value: string): string | null => {
    const fieldSchema = schema.shape[name as string];
    if (!fieldSchema) return null;

    try {
      fieldSchema.parse(value);
      return null;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.errors[0]?.message || 'Invalid value';
      }
      return 'Validation error';
    }
  }, [schema]);

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const result = validateForm(schema, values);
    
    if (!result.success) {
      setFields(prev => {
        const newFields = { ...prev };
        Object.keys(newFields).forEach(key => {
          newFields[key] = {
            ...newFields[key],
            error: result.errors[key]?.[0] || null,
            touched: true,
          };
        });
        return newFields;
      });
      return false;
    }
    
    return true;
  }, [schema, values]);

  // Set field value
  const setValue = useCallback((name: FieldName, value: string) => {
    setFields(prev => {
      const error = validateOnChange ? validateField(name, value) : prev[name as string]?.error;
      return {
        ...prev,
        [name]: {
          ...prev[name as string],
          value,
          error,
          dirty: true,
        },
      };
    });
  }, [validateOnChange, validateField]);

  // Set field touched
  const setTouched = useCallback((name: FieldName, touched = true) => {
    setFields(prev => {
      const field = prev[name as string];
      const error = validateOnBlur && touched ? validateField(name, field?.value || '') : field?.error;
      
      // Track field interaction
      if (touched && formAnalytics) {
        formAnalytics.trackFieldInteraction(name as string, 'blur', field?.value);
      }
      
      return {
        ...prev,
        [name]: {
          ...prev[name as string],
          touched,
          error,
        },
      };
    });
  }, [validateOnBlur, validateField, formAnalytics]);

  // Set field error manually
  const setError = useCallback((name: FieldName, error: string | null) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name as string],
        error,
      },
    }));
  }, []);

  // Handle change event
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked ? 'true' : 'false'
      : value;
    setValue(name as FieldName, finalValue);
  }, [setValue]);

  // Handle blur event
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(name as FieldName, true);
  }, [setTouched]);

  // Handle focus event
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (formAnalytics) {
      formAnalytics.trackFieldInteraction(e.target.name, 'focus');
    }
  }, [formAnalytics]);

  // Reset form
  const reset = useCallback(() => {
    setFields(getInitialFieldStates());
    setSubmitError(null);
    setIsSubmitting(false);
  }, [getInitialFieldStates]);

  // Submit form
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    setSubmitCount(prev => prev + 1);
    setSubmitError(null);

    // Validate all fields
    const isValid = validateAll();
    
    if (!isValid) {
      const errors = Object.entries(fields)
        .filter(([_, field]) => field.error)
        .reduce((acc, [key, field]) => {
          acc[key] = [field.error!];
          return acc;
        }, {} as Record<string, string[]>);
      
      formAnalytics?.trackFormSubmit(false, Object.keys(errors));
      onError?.(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit?.(values);
      formAnalytics?.trackFormSubmit(true);
      
      if (resetOnSubmit) {
        reset();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Submission failed';
      setSubmitError(errorMessage);
      formAnalytics?.trackFormSubmit(false, [errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateAll, fields, values, onSubmit, onError, resetOnSubmit, reset, formAnalytics]);

  // Get field props helper
  const getFieldProps = useCallback((name: FieldName) => {
    const field = fields[name as string] || { value: '', error: null, touched: false, dirty: false };
    return {
      name,
      value: field.value,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      'aria-invalid': field.touched && !!field.error,
      'aria-describedby': field.error ? `${String(name)}-error` : undefined,
    };
  }, [fields, handleChange, handleBlur, handleFocus]);

  // Get field error
  const getFieldError = useCallback((name: FieldName): string | null => {
    const field = fields[name as string];
    return field?.touched ? field.error : null;
  }, [fields]);

  // Check if field is valid
  const isFieldValid = useCallback((name: FieldName): boolean => {
    const field = fields[name as string];
    return field?.touched ? !field.error : true;
  }, [fields]);

  // Check if form is valid
  const isValid = useMemo(() => {
    return Object.values(fields).every(field => !field.error);
  }, [fields]);

  // Check if form is dirty
  const isDirty = useMemo(() => {
    return Object.values(fields).some(field => field.dirty);
  }, [fields]);

  return {
    // Field management
    fields,
    values,
    setValue,
    setTouched,
    setError,
    getFieldProps,
    getFieldError,
    isFieldValid,
    
    // Form handlers
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    reset,
    
    // Form state
    isSubmitting,
    submitError,
    submitCount,
    isValid,
    isDirty,
    
    // Validation
    validateField,
    validateAll,
    
    // Ref
    formRef,
  };
}

// ============================================================================
// useFieldArray Hook - Manage array fields
// ============================================================================

interface UseFieldArrayOptions<T> {
  name: string;
  initialValue?: T[];
}

export function useFieldArray<T>(options: UseFieldArrayOptions<T>) {
  const { name, initialValue = [] } = options;
  const [fields, setFields] = useState<T[]>(initialValue);

  const append = useCallback((value: T) => {
    setFields(prev => [...prev, value]);
  }, []);

  const prepend = useCallback((value: T) => {
    setFields(prev => [value, ...prev]);
  }, []);

  const insert = useCallback((index: number, value: T) => {
    setFields(prev => [...prev.slice(0, index), value, ...prev.slice(index)]);
  }, []);

  const remove = useCallback((index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  }, []);

  const move = useCallback((from: number, to: number) => {
    setFields(prev => {
      const newFields = [...prev];
      const [removed] = newFields.splice(from, 1);
      newFields.splice(to, 0, removed);
      return newFields;
    });
  }, []);

  const swap = useCallback((indexA: number, indexB: number) => {
    setFields(prev => {
      const newFields = [...prev];
      [newFields[indexA], newFields[indexB]] = [newFields[indexB], newFields[indexA]];
      return newFields;
    });
  }, []);

  const update = useCallback((index: number, value: T) => {
    setFields(prev => prev.map((item, i) => (i === index ? value : item)));
  }, []);

  const replace = useCallback((values: T[]) => {
    setFields(values);
  }, []);

  return {
    fields,
    append,
    prepend,
    insert,
    remove,
    move,
    swap,
    update,
    replace,
    name,
  };
}

// ============================================================================
// useFormPersist Hook - Persist form state
// ============================================================================

interface UseFormPersistOptions {
  key: string;
  storage?: Storage;
  exclude?: string[];
  debounceMs?: number;
}

export function useFormPersist(
  values: Record<string, unknown>,
  setValues: (values: Record<string, unknown>) => void,
  options: UseFormPersistOptions
) {
  const { key, storage, exclude = [], debounceMs = 500 } = options;
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Get storage (SSR safe)
  const getStorage = useCallback(() => {
    if (storage) return storage;
    if (typeof window !== 'undefined') return window.sessionStorage;
    return null;
  }, [storage]);

  // Load persisted values on mount
  const loadPersistedValues = useCallback(() => {
    const store = getStorage();
    if (!store) return;

    try {
      const persisted = store.getItem(key);
      if (persisted) {
        const parsed = JSON.parse(persisted);
        setValues(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }, [key, getStorage, setValues]);

  // Save values to storage
  const persistValues = useCallback(() => {
    const store = getStorage();
    if (!store) return;

    const toPersist = { ...values };
    exclude.forEach(field => {
      delete toPersist[field];
    });

    try {
      store.setItem(key, JSON.stringify(toPersist));
    } catch {
      // Storage might be full
    }
  }, [key, values, exclude, getStorage]);

  // Clear persisted values
  const clearPersisted = useCallback(() => {
    const store = getStorage();
    if (store) {
      store.removeItem(key);
    }
  }, [key, getStorage]);

  // Auto-persist on value change (debounced)
  const autoPersist = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(persistValues, debounceMs);
  }, [persistValues, debounceMs]);

  return {
    loadPersistedValues,
    persistValues,
    clearPersisted,
    autoPersist,
  };
}

// ============================================================================
// useMultiStepForm Hook - Multi-step form management
// ============================================================================

interface Step {
  id: string;
  title: string;
  fields?: string[];
  validate?: () => boolean;
}

interface UseMultiStepFormOptions {
  steps: Step[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
}

export function useMultiStepForm(options: UseMultiStepFormOptions) {
  const { steps, initialStep = 0, onStepChange } = options;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  }, [steps.length, onStepChange]);

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      goToStep(currentStep + 1);
    }
  }, [currentStep, isLastStep, goToStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, isFirstStep, goToStep]);

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  }, []);

  const isStepComplete = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
    setCompletedSteps(new Set());
  }, [initialStep]);

  return {
    currentStep,
    currentStepData,
    steps,
    isFirstStep,
    isLastStep,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    isStepComplete,
    completedSteps,
    reset,
    progress: ((currentStep + 1) / steps.length) * 100,
  };
}
