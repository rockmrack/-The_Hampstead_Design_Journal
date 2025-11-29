'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// Skeleton Component
// ============================================================================

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'bg-hampstead-grey/30',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
}

// ============================================================================
// Article Card Skeleton
// ============================================================================

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <Skeleton variant="rectangular" height={200} className="w-full" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton width={60} height={20} variant="rounded" />
          <Skeleton width={80} height={20} variant="rounded" />
        </div>
        <Skeleton height={24} className="w-3/4" />
        <div className="space-y-2">
          <Skeleton />
          <Skeleton className="w-2/3" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// List Skeleton
// ============================================================================

interface ListSkeletonProps {
  rows?: number;
  showAvatar?: boolean;
  showActions?: boolean;
}

export function ListSkeleton({ rows = 5, showAvatar = true, showActions = false }: ListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {showAvatar && (
            <Skeleton variant="circular" width={40} height={40} />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton height={16} className="w-1/3" />
            <Skeleton height={12} className="w-2/3" />
          </div>
          {showActions && (
            <Skeleton variant="rounded" width={80} height={32} />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Table Skeleton
// ============================================================================

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="border border-hampstead-grey/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-hampstead-grey/10 px-4 py-3 flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height={16} className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="px-4 py-3 flex gap-4 border-t border-hampstead-grey/20"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              height={14}
              className={cn(
                'flex-1',
                colIndex === 0 && 'w-1/4',
                colIndex === columns - 1 && 'w-1/6'
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Stat Card Skeleton
// ============================================================================

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton width={80} height={14} />
          <Skeleton width={120} height={32} />
          <Skeleton width={60} height={20} variant="rounded" />
        </div>
        <Skeleton variant="rounded" width={48} height={48} />
      </div>
    </div>
  );
}

// ============================================================================
// Form Skeleton
// ============================================================================

interface FormSkeletonProps {
  fields?: number;
  showLabels?: boolean;
}

export function FormSkeleton({ fields = 4, showLabels = true }: FormSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          {showLabels && <Skeleton width={100} height={14} />}
          <Skeleton variant="rounded" height={44} />
        </div>
      ))}
      <Skeleton variant="rounded" width={120} height={44} className="mt-4" />
    </div>
  );
}

// ============================================================================
// Profile Skeleton
// ============================================================================

export function ProfileSkeleton() {
  return (
    <div className="flex items-start gap-6">
      <Skeleton variant="circular" width={80} height={80} />
      <div className="flex-1 space-y-3">
        <Skeleton width={180} height={24} />
        <Skeleton width={120} height={14} />
        <div className="flex gap-4 pt-2">
          <Skeleton width={80} height={14} />
          <Skeleton width={80} height={14} />
          <Skeleton width={80} height={14} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Grid Skeleton
// ============================================================================

interface GridSkeletonProps {
  items?: number;
  columns?: 2 | 3 | 4;
  aspectRatio?: 'square' | '4/3' | '16/9';
}

export function GridSkeleton({ items = 6, columns = 3, aspectRatio = '4/3' }: GridSkeletonProps) {
  const aspectClasses = {
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
  };

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns])}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton variant="rounded" className={cn('w-full', aspectClasses[aspectRatio])} />
          <div className="space-y-2">
            <Skeleton height={16} className="w-3/4" />
            <Skeleton height={12} className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Dashboard Skeleton
// ============================================================================

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Skeleton width={150} height={20} className="mb-4" />
            <Skeleton variant="rounded" height={250} />
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Skeleton width={150} height={20} className="mb-4" />
            <TableSkeleton rows={4} columns={4} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <Skeleton width={120} height={20} className="mb-4" />
            <ListSkeleton rows={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Page Skeleton
// ============================================================================

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton width={100} height={14} />
        <Skeleton width="60%" height={40} />
        <Skeleton width="40%" height={20} />
      </div>

      {/* Featured Image */}
      <Skeleton variant="rounded" height={400} className="w-full" />

      {/* Content */}
      <div className="max-w-3xl space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={16} className={i % 3 === 2 ? 'w-2/3' : 'w-full'} />
        ))}
      </div>
    </div>
  );
}
