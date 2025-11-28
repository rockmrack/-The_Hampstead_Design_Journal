import React from 'react';

type VariantType = 'h1' | 'h2' | 'h3' | 'p' | 'small' | 'body';

interface TypographyProps {
  variant?: VariantType;
  children?: React.ReactNode;
  className?: string;
}

const variants: Record<VariantType, string> = {
  h1: 'text-4xl font-bold mb-4',
  h2: 'text-3xl font-semibold mb-3',
  h3: 'text-2xl font-medium mb-2',
  p: 'text-base mb-4',
  body: 'text-base mb-4',
  small: 'text-sm text-gray-600',
};

const Typography: React.FC<TypographyProps> = ({ variant = 'p', children, className = '' }) => {
  const Tag = variant === 'body' ? 'p' : variant;
  const classes = variants[variant] || variants.p;

  return React.createElement(Tag, { className: `${classes} ${className}` }, children);
};

export { Typography };
export default Typography;