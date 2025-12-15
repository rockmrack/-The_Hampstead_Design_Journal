'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============================================================================
// Badge Component
// ============================================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'full';
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  icon,
  removable = false,
  onRemove,
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-hampstead-sage/10 text-hampstead-sage',
    secondary: 'bg-hampstead-grey/30 text-hampstead-charcoal',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    outline: 'bg-transparent border border-current text-hampstead-charcoal/70',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    full: 'rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ============================================================================
// Avatar Component
// ============================================================================

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-4 h-4 border-2',
    '2xl': 'w-5 h-5 border-2',
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback;
    if (alt) {
      const words = alt.split(' ');
      if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
      }
      return alt.slice(0, 2).toUpperCase();
    }
    return '?';
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
          height={size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 64}
          className={cn(
            'rounded-full object-cover',
            sizeClasses[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-hampstead-sage/20 flex items-center justify-center font-medium text-hampstead-sage',
            sizeClasses[size]
          )}
        >
          {getFallbackInitials()}
        </div>
      )}
      
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            statusColors[status],
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

// ============================================================================
// Avatar Group Component
// ============================================================================

interface AvatarGroupProps {
  avatars: Array<{ src?: string; alt?: string; fallback?: string }>;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            'rounded-full bg-hampstead-grey/30 flex items-center justify-center font-medium text-hampstead-charcoal ring-2 ring-white',
            size === 'xs' && 'w-6 h-6 text-xs',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-sm',
            size === 'xl' && 'w-16 h-16 text-base',
            size === '2xl' && 'w-24 h-24 text-lg'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Progress Bar Component
// ============================================================================

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  label,
  animated = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-hampstead-sage',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5 text-sm">
          {label && <span className="text-hampstead-charcoal/70">{label}</span>}
          {showValue && (
            <span className="text-hampstead-charcoal font-medium">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div
        className={cn(
          'w-full bg-hampstead-grey/30 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            variantClasses[variant],
            animated && 'progress-animated'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Spinner Component
// ============================================================================

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export function Spinner({ size = 'md', variant = 'default', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'text-hampstead-sage',
    light: 'text-white',
    dark: 'text-hampstead-charcoal',
  };

  return (
    <svg
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ============================================================================
// Tooltip Component
// ============================================================================

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-hampstead-charcoal border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-hampstead-charcoal border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-hampstead-charcoal border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-hampstead-charcoal border-y-transparent border-l-transparent',
  };

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm text-white bg-hampstead-charcoal rounded-lg whitespace-nowrap',
            'shadow-lg',
            positionClasses[position]
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Divider Component
// ============================================================================

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  label?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  className,
}: DividerProps) {
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px self-stretch bg-hampstead-grey/30',
          variantClasses[variant],
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={cn('flex items-center gap-4', className)}
        role="separator"
      >
        <div className={cn('flex-1 border-t border-hampstead-grey/30', variantClasses[variant])} />
        <span className="text-sm text-hampstead-charcoal/50">{label}</span>
        <div className={cn('flex-1 border-t border-hampstead-grey/30', variantClasses[variant])} />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        'border-t border-hampstead-grey/30',
        variantClasses[variant],
        className
      )}
      role="separator"
    />
  );
}

// ============================================================================
// Empty State Component
// ============================================================================

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12 px-4', className)}>
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-hampstead-grey/20 flex items-center justify-center text-hampstead-charcoal/40">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-medium text-hampstead-charcoal mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-hampstead-charcoal/60 max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-hampstead-sage text-white rounded-lg hover:bg-hampstead-sage/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
