/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage, InteractiveCard } from '@/components/ui/Card';

console.log('Card imports:', { Card, CardHeader, CardTitle, CardDescription });

describe('Card Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div>Test Content</div>
        </Card>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies default styles', () => {
      render(<Card data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-xl');
      expect(card).toHaveClass('bg-white');
    });

    it('supports different variants', () => {
      render(<Card variant="outlined" data-testid="card-outlined" />);
      expect(screen.getByTestId('card-outlined')).toHaveClass('bg-transparent');
    });
  });

  describe('InteractiveCard', () => {
    it('renders as a link when href is provided', () => {
      render(
        <InteractiveCard href="/test" data-testid="interactive-card">
          Link Content
        </InteractiveCard>
      );
      const card = screen.getByTestId('interactive-card');
      expect(card.tagName).toBe('A');
      expect(card).toHaveAttribute('href', '/test');
    });
  });

  describe('CardHeader', () => {
    it('renders title and subtitle', () => {
      render(
        <CardHeader title="Header Title" subtitle="Header Subtitle" />
      );
      expect(screen.getByText('Header Title')).toBeInTheDocument();
      expect(screen.getByText('Header Subtitle')).toBeInTheDocument();
    });
  });

  describe('CardTitle', () => {
    it('renders correctly', () => {
      render(<CardTitle>My Title</CardTitle>);
      expect(screen.getByText('My Title')).toBeInTheDocument();
      expect(screen.getByText('My Title').tagName).toBe('H3');
    });
  });

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(<CardDescription>My Description</CardDescription>);
      expect(screen.getByText('My Description')).toBeInTheDocument();
    });
  });

  describe('CardImage', () => {
    it('renders image with src and alt', () => {
      render(<CardImage src="/test.jpg" alt="Test Image" />);
      const img = screen.getByAltText('Test Image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');
    });
  });

  describe('Card Composition', () => {
    it('renders a complete article card', () => {
      render(
        <Card>
          <CardImage src="/article.jpg" alt="Article image" />
          <CardHeader>
            <CardTitle>Article Title</CardTitle>
            <CardDescription>Article Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content</p>
          </CardContent>
          <CardFooter>
            <span>Footer</span>
          </CardFooter>
        </Card>
      );

      expect(screen.getByAltText('Article image')).toBeInTheDocument();
      expect(screen.getByText('Article Title')).toBeInTheDocument();
      expect(screen.getByText('Article Description')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });
});
