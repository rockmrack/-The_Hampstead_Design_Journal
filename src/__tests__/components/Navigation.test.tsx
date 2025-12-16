import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/layout/Navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  X: () => <div data-testid="close-icon">X</div>,
  Search: () => <div data-testid="search-icon">Search</div>,
  Instagram: () => <div data-testid="instagram-icon">Instagram</div>,
  Twitter: () => <div data-testid="twitter-icon">Twitter</div>,
  ChevronDown: () => <div data-testid="chevron-down">Chevron</div>,
}));

describe('Navigation Component', () => {
  it('renders the navigation header', () => {
    render(<Navigation />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('The Hampstead Design Journal')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Latest')).toBeInTheDocument();
    expect(screen.getByText('Interiors')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('The Archive')).toBeInTheDocument();
  });

  it('renders mobile menu button on small screens', () => {
    render(<Navigation />);
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when button is clicked', () => {
    render(<Navigation />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Mobile navigation menu')).toBeInTheDocument();
  });
});
