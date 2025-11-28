'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hampsteaddesignjournal.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://hampsteaddesignjournal.com${item.href}` })
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1 text-hampstead-charcoal/60">
          {/* Home link */}
          <li className="flex items-center">
            <Link 
              href="/"
              className="hover:text-hampstead-black transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {/* Separator */}
          <li className="flex items-center" aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-hampstead-charcoal/40" />
          </li>

          {/* Dynamic items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <React.Fragment key={item.label}>
                <li className="flex items-center">
                  {isLast || !item.href ? (
                    <span 
                      className={isLast ? 'text-hampstead-black font-medium' : ''}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link 
                      href={item.href}
                      className="hover:text-hampstead-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
                
                {/* Separator between items (not after last) */}
                {!isLast && (
                  <li className="flex items-center" aria-hidden="true">
                    <ChevronRight className="w-3.5 h-3.5 text-hampstead-charcoal/40" />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
