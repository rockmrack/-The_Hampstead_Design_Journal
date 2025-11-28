import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from '@/components/ui/Typography';

describe('Typography Component', () => {
  it('renders h1 variant correctly', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const heading = screen.getByText('Heading 1');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-4xl', 'font-bold');
  });

  it('renders h2 variant correctly', () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const heading = screen.getByText('Heading 2');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-3xl', 'font-semibold');
  });

  it('renders h3 variant correctly', () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    const heading = screen.getByText('Heading 3');
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveClass('text-2xl', 'font-medium');
  });

  it('renders paragraph by default', () => {
    render(<Typography>Default paragraph</Typography>);
    const para = screen.getByText('Default paragraph');
    expect(para.tagName).toBe('P');
    expect(para).toHaveClass('text-base');
  });

  it('renders body variant as paragraph', () => {
    render(<Typography variant="body">Body text</Typography>);
    const para = screen.getByText('Body text');
    expect(para.tagName).toBe('P');
    expect(para).toHaveClass('text-base');
  });

  it('renders small variant correctly', () => {
    render(<Typography variant="small">Small text</Typography>);
    const small = screen.getByText('Small text');
    expect(small.tagName).toBe('SMALL');
    expect(small).toHaveClass('text-sm');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Custom styled</Typography>);
    const element = screen.getByText('Custom styled');
    expect(element).toHaveClass('custom-class');
  });
});
