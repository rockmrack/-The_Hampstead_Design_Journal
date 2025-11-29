'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Input Component
// ============================================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, variant = 'default', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const variantClasses = {
      default: 'border border-hampstead-grey/50 bg-white focus:border-hampstead-sage',
      filled: 'border-none bg-hampstead-grey/30 focus:bg-hampstead-grey/50',
      outline: 'border-2 border-hampstead-charcoal/20 bg-transparent focus:border-hampstead-sage',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-hampstead-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-hampstead-charcoal/50">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg px-4 py-2.5 text-hampstead-charcoal',
              'placeholder:text-hampstead-charcoal/40',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-hampstead-sage/20',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-hampstead-grey/20',
              variantClasses[variant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-hampstead-charcoal/50">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!error && hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-hampstead-charcoal/60">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ============================================================================
// Textarea Component
// ============================================================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'default' | 'filled' | 'outline';
  showCharCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, variant = 'default', showCharCount, maxLength, id, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const charCount = typeof value === 'string' ? value.length : 0;

    const variantClasses = {
      default: 'border border-hampstead-grey/50 bg-white focus:border-hampstead-sage',
      filled: 'border-none bg-hampstead-grey/30 focus:bg-hampstead-grey/50',
      outline: 'border-2 border-hampstead-charcoal/20 bg-transparent focus:border-hampstead-sage',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-hampstead-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-lg px-4 py-2.5 text-hampstead-charcoal min-h-[120px] resize-y',
            'placeholder:text-hampstead-charcoal/40',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-hampstead-sage/20',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-hampstead-grey/20',
            variantClasses[variant],
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />

        <div className="flex justify-between mt-1.5">
          <div>
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {!error && hint && (
              <p id={`${textareaId}-hint`} className="text-sm text-hampstead-charcoal/60">
                {hint}
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <span className={cn(
              'text-sm',
              charCount > maxLength * 0.9 ? 'text-amber-600' : 'text-hampstead-charcoal/50'
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// ============================================================================
// Select Component
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'filled' | 'outline';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, variant = 'default', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const variantClasses = {
      default: 'border border-hampstead-grey/50 bg-white focus:border-hampstead-sage',
      filled: 'border-none bg-hampstead-grey/30 focus:bg-hampstead-grey/50',
      outline: 'border-2 border-hampstead-charcoal/20 bg-transparent focus:border-hampstead-sage',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-hampstead-charcoal mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full rounded-lg px-4 py-2.5 text-hampstead-charcoal',
            'transition-colors duration-200 appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-hampstead-sage/20',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-hampstead-grey/20',
            'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23666%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22/%3E%3C/svg%3E")]',
            'bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10',
            variantClasses[variant],
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!error && hint && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-sm text-hampstead-charcoal/60">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ============================================================================
// Checkbox Component
// ============================================================================

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, description, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'w-4 h-4 rounded border-hampstead-grey/50',
              'text-hampstead-sage focus:ring-hampstead-sage/20 focus:ring-2',
              'transition-colors cursor-pointer',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : description ? `${checkboxId}-desc` : undefined}
            {...props}
          />
        </div>

        <div className="ml-3">
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-sm font-medium cursor-pointer',
              error ? 'text-red-600' : 'text-hampstead-charcoal'
            )}
          >
            {label}
          </label>

          {description && (
            <p id={`${checkboxId}-desc`} className="text-sm text-hampstead-charcoal/60">
              {description}
            </p>
          )}

          {error && (
            <p id={`${checkboxId}-error`} className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// ============================================================================
// Radio Group Component
// ============================================================================

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={className}>
      {label && (
        <legend className="text-sm font-medium text-hampstead-charcoal mb-3">
          {label}
        </legend>
      )}

      <div className={cn(
        'flex gap-4',
        orientation === 'vertical' ? 'flex-col' : 'flex-wrap'
      )}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                id={`${name}-${option.value}`}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={option.disabled}
                className={cn(
                  'w-4 h-4 border-hampstead-grey/50',
                  'text-hampstead-sage focus:ring-hampstead-sage/20 focus:ring-2',
                  'transition-colors cursor-pointer',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  error && 'border-red-500'
                )}
              />
            </div>

            <div className="ml-3">
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium text-hampstead-charcoal cursor-pointer"
              >
                {option.label}
              </label>

              {option.description && (
                <p className="text-sm text-hampstead-charcoal/60">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

// ============================================================================
// Toggle/Switch Component
// ============================================================================

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, description, size = 'md', id, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const sizeClasses = {
      sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
      md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
      lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
    };

    return (
      <div className={cn('flex items-center', className)}>
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'rounded-full cursor-pointer transition-colors',
              'bg-hampstead-grey/50 peer-checked:bg-hampstead-sage',
              'peer-focus:ring-2 peer-focus:ring-hampstead-sage/20',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              sizeClasses[size].track
            )}
          />
          <div
            className={cn(
              'absolute bg-white rounded-full shadow-sm transition-transform',
              'pointer-events-none',
              'translate-x-0.5 peer-checked:' + sizeClasses[size].translate,
              sizeClasses[size].thumb
            )}
            style={{ top: '50%', transform: props.checked ? `translateX(${size === 'sm' ? '16px' : size === 'md' ? '20px' : '28px'}) translateY(-50%)` : 'translateX(2px) translateY(-50%)' }}
          />
        </div>

        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={toggleId}
                className="text-sm font-medium text-hampstead-charcoal cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-hampstead-charcoal/60">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';
