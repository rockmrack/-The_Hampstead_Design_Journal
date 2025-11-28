import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '@/components/ui/Container';

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Container className="custom-container">
        <p>Content</p>
      </Container>
    );
    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveClass('custom-container');
  });
});
