import React from 'react';

const Typography = ({ variant, children, className }) => {
  const variants = {
    h1: 'text-4xl font-bold mb-4',
    h2: 'text-3xl font-semibold mb-3',
    h3: 'text-2xl font-medium mb-2',
    p: 'text-base mb-4',
    small: 'text-sm text-gray-600',
  };

  const Tag = variant || 'p';
  const classes = variants[variant] || variants.p;

  return (
    <Tag className={`${classes} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;