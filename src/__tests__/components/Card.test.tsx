/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from '@/components/ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies default styles', () => {
      render(<Card data-testid="card">Content</Card>);

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
    });

    it('accepts custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);

      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('renders different variants', () => {
      const { rerender } = render(
        <Card variant="default" data-testid="card">Content</Card>
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();

      rerender(<Card variant="outline" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toBeInTheDocument();

      rerender(<Card variant="elevated" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('shadow-lg');
    });

    it('handles hover state for interactive cards', () => {
      render(
        <Card hoverable data-testid="card">
          Content
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:shadow-md');
    });

    it('renders as a link when href is provided', () => {
      render(
        <Card href="/articles/test" data-testid="card">
          Link Card
        </Card>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/articles/test');
    });

    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(
        <Card onClick={handleClick} data-testid="card">
          Clickable Card
        </Card>
      );

      await userEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('CardHeader', () => {
    it('renders header content', () => {
      render(
        <CardHeader>
          <span>Header content</span>
        </CardHeader>
      );

      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('applies spacing styles', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);

      const header = screen.getByTestId('header');
      expect(header).toHaveClass('p-6');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 by default', () => {
      render(<CardTitle>Title</CardTitle>);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title');
    });

    it('accepts different heading levels', () => {
      render(<CardTitle as="h2">Title</CardTitle>);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title');
    });

    it('applies typography styles', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);

      const title = screen.getByTestId('title');
      expect(title).toHaveClass('font-bold');
    });
  });

  describe('CardDescription', () => {
    it('renders description text', () => {
      render(<CardDescription>Description text</CardDescription>);

      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('applies muted text styles', () => {
      render(
        <CardDescription data-testid="description">
          Description
        </CardDescription>
      );

      const description = screen.getByTestId('description');
      expect(description).toHaveClass('text-gray-500');
    });
  });

  describe('CardContent', () => {
    it('renders content with proper padding', () => {
      render(
        <CardContent data-testid="content">
          <p>Main content</p>
        </CardContent>
      );

      const content = screen.getByTestId('content');
      expect(content).toHaveClass('px-6');
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('removes top padding when noPadding is true', () => {
      render(
        <CardContent noPadding data-testid="content">
          Content
        </CardContent>
      );

      expect(screen.getByTestId('content')).not.toHaveClass('p-6');
    });
  });

  describe('CardFooter', () => {
    it('renders footer content', () => {
      render(
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies border and padding', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);

      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('border-t');
      expect(footer).toHaveClass('p-6');
    });
  });

  describe('CardImage', () => {
    it('renders image with src and alt', () => {
      render(
        <CardImage 
          src="/images/test.jpg" 
          alt="Test image" 
        />
      );

      const img = screen.getByAltText('Test image');
      expect(img).toBeInTheDocument();
    });

    it('applies aspect ratio styles', () => {
      render(
        <CardImage 
          src="/images/test.jpg" 
          alt="Test" 
          aspectRatio="16:9"
          data-testid="image-container"
        />
      );

      const container = screen.getByTestId('image-container');
      expect(container).toHaveClass('aspect-video');
    });

    it('supports different aspect ratios', () => {
      const { rerender } = render(
        <CardImage 
          src="/test.jpg" 
          alt="Test" 
          aspectRatio="1:1"
          data-testid="image-container"
        />
      );

      expect(screen.getByTestId('image-container')).toHaveClass('aspect-square');

      rerender(
        <CardImage 
          src="/test.jpg" 
          alt="Test" 
          aspectRatio="4:3"
          data-testid="image-container"
        />
      );

      expect(screen.getByTestId('image-container')).toHaveClass('aspect-[4/3]');
    });
  });
});

describe('Card Composition', () => {
  it('renders a complete article card', () => {
    render(
      <Card>
        <CardImage src="/article.jpg" alt="Article image" />
        <CardHeader>
          <CardTitle>Article Title</CardTitle>
          <CardDescription>Short description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Article excerpt...</p>
        </CardContent>
        <CardFooter>
          <span>Read more</span>
        </CardFooter>
      </Card>
    );

    expect(screen.getByAltText('Article image')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Article Title');
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Article excerpt...')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('renders a minimal card', () => {
    render(
      <Card>
        <CardContent>
          <p>Simple content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Simple content')).toBeInTheDocument();
  });

  it('renders a card with actions', async () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    render(
      <Card>
        <CardHeader>
          <CardTitle>Item</CardTitle>
        </CardHeader>
        <CardFooter>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </CardFooter>
      </Card>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(handleEdit).toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(handleDelete).toHaveBeenCalled();
  });
});

describe('Card Accessibility', () => {
  it('is keyboard navigable when interactive', async () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick} data-testid="card" tabIndex={0}>
        Focusable Card
      </Card>
    );

    const card = screen.getByTestId('card');
    card.focus();
    expect(document.activeElement).toBe(card);
  });

  it('supports aria attributes', () => {
    render(
      <Card 
        aria-label="Featured article" 
        role="article"
        data-testid="card"
      >
        Content
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('aria-label', 'Featured article');
    expect(card).toHaveAttribute('role', 'article');
  });
});
