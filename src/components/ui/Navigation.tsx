'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// Tabs Component
// ============================================================================

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'boxed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const currentTab = controlledActiveTab ?? activeTab;

  // Update indicator position
  useEffect(() => {
    const activeTabElement = tabRefs.current.get(currentTab);
    if (activeTabElement && tabsRef.current) {
      const containerRect = tabsRef.current.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [currentTab]);

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) {
      setActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  const variantStyles = {
    default: {
      container: 'border-b border-hampstead-grey/30',
      tab: 'text-hampstead-charcoal/60 hover:text-hampstead-charcoal',
      activeTab: 'text-hampstead-sage',
      indicator: 'bg-hampstead-sage',
    },
    pills: {
      container: 'bg-hampstead-grey/20 p-1 rounded-lg',
      tab: 'rounded-md text-hampstead-charcoal/60 hover:text-hampstead-charcoal',
      activeTab: 'text-hampstead-charcoal bg-white shadow-sm',
      indicator: null,
    },
    underline: {
      container: '',
      tab: 'text-hampstead-charcoal/60 hover:text-hampstead-charcoal border-b-2 border-transparent',
      activeTab: 'text-hampstead-sage border-hampstead-sage',
      indicator: null,
    },
    boxed: {
      container: 'border border-hampstead-grey/30 rounded-lg overflow-hidden',
      tab: 'text-hampstead-charcoal/60 border-r border-hampstead-grey/30 last:border-r-0',
      activeTab: 'text-white bg-hampstead-sage',
      indicator: null,
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={className}>
      <div
        ref={tabsRef}
        className={cn(
          'relative flex',
          fullWidth && 'w-full',
          styles.container
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === currentTab;
          
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'relative flex items-center gap-2 font-medium transition-colors',
                sizeClasses[size],
                fullWidth && 'flex-1 justify-center',
                styles.tab,
                isActive && styles.activeTab,
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'ml-1 px-1.5 py-0.5 text-xs rounded-full',
                    isActive
                      ? 'bg-hampstead-sage/20 text-hampstead-sage'
                      : 'bg-hampstead-grey/30 text-hampstead-charcoal/60'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Animated indicator for default variant */}
        {variant === 'default' && (
          <motion.div
            className={cn('absolute bottom-0 h-0.5', styles.indicator)}
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </div>

      {/* Tab panels */}
      {children}
    </div>
  );
}

// ============================================================================
// Tab Panel
// ============================================================================

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function TabPanel({
  id,
  activeTab,
  children,
  className,
  animate = true,
}: TabPanelProps) {
  const isActive = id === activeTab;

  if (!isActive) return null;

  if (animate) {
    return (
      <motion.div
        id={`tabpanel-${id}`}
        role="tabpanel"
        aria-labelledby={id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className={cn('focus:outline-none', className)}
        tabIndex={0}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={id}
      className={cn('focus:outline-none', className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Accordion Component
// ============================================================================

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  multiple?: boolean;
  variant?: 'default' | 'bordered' | 'separated';
  className?: string;
}

export function Accordion({
  items,
  defaultOpen,
  multiple = false,
  variant = 'default',
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set();
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  const variantStyles = {
    default: {
      container: 'divide-y divide-hampstead-grey/20',
      item: '',
      header: 'py-4',
    },
    bordered: {
      container: 'border border-hampstead-grey/30 rounded-lg divide-y divide-hampstead-grey/20',
      item: '',
      header: 'px-4 py-4',
    },
    separated: {
      container: 'space-y-3',
      item: 'border border-hampstead-grey/30 rounded-lg overflow-hidden',
      header: 'px-4 py-4',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className={styles.item}>
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              className={cn(
                'w-full flex items-center justify-between text-left',
                styles.header,
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              disabled={item.disabled}
            >
              <span className="font-medium text-hampstead-charcoal">
                {item.title}
              </span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-hampstead-charcoal/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <motion.div
              id={`accordion-${item.id}`}
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  'pb-4 text-hampstead-charcoal/70',
                  variant !== 'default' && 'px-4'
                )}
              >
                {item.content}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// Steps Component
// ============================================================================

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'numbered';
  className?: string;
}

export function Steps({
  steps,
  currentStep,
  orientation = 'horizontal',
  variant = 'default',
  className,
}: StepsProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'flex items-start' : 'flex flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              'flex',
              orientation === 'horizontal'
                ? 'flex-1 items-start'
                : 'items-start'
            )}
          >
            {/* Step indicator */}
            <div
              className={cn(
                'flex flex-col items-center',
                orientation === 'vertical' && 'mr-4'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full transition-colors',
                  variant === 'dots'
                    ? 'w-3 h-3'
                    : 'w-10 h-10',
                  isCompleted
                    ? 'bg-hampstead-sage text-white'
                    : isActive
                    ? 'bg-hampstead-sage text-white'
                    : 'bg-hampstead-grey/30 text-hampstead-charcoal/50'
                )}
              >
                {variant === 'numbered' && !isCompleted && (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
                {variant === 'default' && step.icon}
                {isCompleted && variant !== 'dots' && (
                  <svg
                    className="w-5 h-5"
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
                )}
              </div>

              {/* Connector line (vertical) */}
              {orientation === 'vertical' && !isLast && (
                <div
                  className={cn(
                    'w-0.5 h-12 my-2',
                    isCompleted ? 'bg-hampstead-sage' : 'bg-hampstead-grey/30'
                  )}
                />
              )}
            </div>

            {/* Step content */}
            <div
              className={cn(
                'flex-1',
                orientation === 'horizontal' && 'px-4',
                orientation === 'vertical' && 'pb-8'
              )}
            >
              <p
                className={cn(
                  'text-sm font-medium',
                  isActive
                    ? 'text-hampstead-charcoal'
                    : 'text-hampstead-charcoal/60'
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="mt-1 text-xs text-hampstead-charcoal/50">
                  {step.description}
                </p>
              )}

              {/* Connector line (horizontal) */}
              {orientation === 'horizontal' && !isLast && (
                <div
                  className={cn(
                    'mt-4 h-0.5',
                    isCompleted ? 'bg-hampstead-sage' : 'bg-hampstead-grey/30'
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// Breadcrumb Component
// ============================================================================

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = (
    <svg
      className="w-4 h-4 text-hampstead-charcoal/30"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-sm text-hampstead-charcoal/60 hover:text-hampstead-sage transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'text-sm',
                    isLast
                      ? 'text-hampstead-charcoal font-medium'
                      : 'text-hampstead-charcoal/60'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && <span className="mx-1">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
