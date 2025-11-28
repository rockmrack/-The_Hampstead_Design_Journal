'use client';

import React from 'react';

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

/**
 * SkipLink component for accessibility
 * Allows keyboard users to skip navigation and jump to main content
 */
const SkipLink: React.FC<SkipLinkProps> = ({ 
  href = '#main-content', 
  children = 'Skip to main content' 
}) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-hampstead-black focus:text-hampstead-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hampstead-charcoal"
    >
      {children}
    </a>
  );
};

export default SkipLink;
