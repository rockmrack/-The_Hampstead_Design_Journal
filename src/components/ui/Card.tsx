'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ============================================================================
// Card Component
// ============================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  asChild?: boolean;
}

export function Card({
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: 'bg-white shadow-sm border border-hampstead-grey/20',
    outlined: 'bg-transparent border border-hampstead-grey/30',
    elevated: 'bg-white shadow-lg',
    ghost: 'bg-transparent',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Card Header
// ============================================================================

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({
  className,
  title,
  subtitle,
  action,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4', className)}
      {...props}
    >
      {children || (
        <>
          <div>
            {title && (
              <h3 className="text-lg font-display font-semibold text-hampstead-charcoal">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-hampstead-charcoal/60">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </>
      )}
    </div>
  );
}

// ============================================================================
// Card Content
// ============================================================================

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  );
}

// ============================================================================
// Card Footer
// ============================================================================

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'mt-4 pt-4 border-t border-hampstead-grey/20 flex items-center justify-between gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Card Image
// ============================================================================

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | '4/3' | 'auto';
  className?: string;
}

export function CardImage({
  className,
  aspectRatio = '4/3',
  src,
  alt,
}: CardImageProps) {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    auto: '',
  };

  return (
    <div className={cn('-mx-5 -mt-5 mb-4 relative', aspectClasses[aspectRatio])}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn('object-cover', className)}
      />
    </div>
  );
}

// ============================================================================
// Interactive Card (Link variant)
// ============================================================================

interface InteractiveCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

export function InteractiveCard({
  className,
  variant = 'default',
  children,
  ...props
}: InteractiveCardProps) {
  const variantClasses = {
    default: 'bg-white shadow-sm border border-hampstead-grey/20',
    outlined: 'bg-transparent border border-hampstead-grey/30',
    elevated: 'bg-white shadow-lg',
  };

  return (
    <a
      className={cn(
        'block rounded-xl overflow-hidden p-5',
        variantClasses[variant],
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-hampstead-sage focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// ============================================================================
// Stat Card
// ============================================================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  className,
}: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  return (
    <Card className={cn('relative', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-hampstead-charcoal/60">{label}</p>
          <p className="mt-1 text-2xl font-display font-bold text-hampstead-charcoal">
            {value}
          </p>
          {change && (
            <span
              className={cn(
                'inline-flex items-center mt-2 px-2 py-0.5 rounded text-xs font-medium',
                trendColors[change.trend]
              )}
            >
              {change.trend === 'up' && '↑'}
              {change.trend === 'down' && '↓'}
              {change.value > 0 ? '+' : ''}{change.value}%
            </span>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-hampstead-sage/10 rounded-xl text-hampstead-sage">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// ============================================================================
// Feature Card
// ============================================================================

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <div className="w-12 h-12 rounded-xl bg-hampstead-sage/10 flex items-center justify-center text-hampstead-sage mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-display font-semibold text-hampstead-charcoal mb-2">
        {title}
      </h3>
      <p className="text-hampstead-charcoal/60">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <InteractiveCard href={href} className={className}>
        {content}
      </InteractiveCard>
    );
  }

  return (
    <Card className={className}>
      {content}
    </Card>
  );
}

// ============================================================================
// Testimonial Card
// ============================================================================

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
  };
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  rating,
  className,
}: TestimonialCardProps) {
  return (
    <Card variant="outlined" className={className}>
      {rating && (
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-5 h-5',
                i < rating ? 'text-amber-400 fill-current' : 'text-gray-200'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      
      <blockquote className="text-hampstead-charcoal/80 italic mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-hampstead-sage/10 flex items-center justify-center">
            <span className="text-hampstead-sage font-medium">
              {author.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium text-hampstead-charcoal">{author.name}</p>
          {author.title && (
            <p className="text-sm text-hampstead-charcoal/60">{author.title}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// ============================================================================
// Pricing Card
// ============================================================================

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: {
    label: string;
    href: string;
  };
  className?: string;
}

export function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  highlighted = false,
  cta,
  className,
}: PricingCardProps) {
  return (
    <Card
      variant={highlighted ? 'elevated' : 'outlined'}
      className={cn(
        'relative',
        highlighted && 'border-2 border-hampstead-sage',
        className
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-hampstead-sage text-white text-xs font-medium rounded-full">
          Most Popular
        </span>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-hampstead-charcoal">{name}</h3>
        <p className="mt-2">
          <span className="text-4xl font-display font-bold text-hampstead-charcoal">
            {price}
          </span>
          <span className="text-hampstead-charcoal/60">{period}</span>
        </p>
        <p className="mt-2 text-sm text-hampstead-charcoal/60">{description}</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <svg
              className="w-5 h-5 text-hampstead-sage flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-hampstead-charcoal/70">{feature}</span>
          </li>
        ))}
      </ul>
      
      <a
        href={cta.href}
        className={cn(
          'block w-full py-2.5 text-center rounded-lg font-medium transition-colors',
          highlighted
            ? 'bg-hampstead-sage text-white hover:bg-hampstead-sage/90'
            : 'bg-hampstead-grey/20 text-hampstead-charcoal hover:bg-hampstead-grey/40'
        )}
      >
        {cta.label}
      </a>
    </Card>
  );
}


export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-display font-semibold text-hampstead-charcoal', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('mt-1 text-sm text-hampstead-charcoal/60', className)} {...props}>
      {children}
    </p>
  );
}

