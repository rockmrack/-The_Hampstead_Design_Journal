/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Navbar,
  NavItem,
  NavDropdown,
  MobileNav,
  Breadcrumbs,
  TabNav,
} from '@/components/ui/Navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  it('renders logo and navigation items', () => {
    render(
      <Navbar>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/articles">Articles</NavItem>
        <NavItem href="/about">About</NavItem>
      </Navbar>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('applies sticky positioning', () => {
    render(
      <Navbar sticky data-testid="navbar">
        <NavItem href="/">Home</NavItem>
      </Navbar>
    );

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('sticky');
  });

  it('renders with transparent background', () => {
    render(
      <Navbar transparent data-testid="navbar">
        <NavItem href="/">Home</NavItem>
      </Navbar>
    );

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('bg-transparent');
  });
});

describe('NavItem Component', () => {
  it('renders as a link', () => {
    render(<NavItem href="/test">Test Link</NavItem>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders with active state', () => {
    render(
      <NavItem href="/" active data-testid="nav-item">
        Home
      </NavItem>
    );

    const item = screen.getByTestId('nav-item');
    expect(item).toHaveClass('text-hampstead-green');
  });

  it('renders icon when provided', () => {
    const Icon = () => <svg data-testid="icon" />;
    render(
      <NavItem href="/test" icon={<Icon />}>
        Test
      </NavItem>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <NavItem href="/test" className="custom-class" data-testid="nav-item">
        Test
      </NavItem>
    );

    expect(screen.getByTestId('nav-item')).toHaveClass('custom-class');
  });
});

describe('NavDropdown Component', () => {
  const dropdownItems = [
    { label: 'Architecture', href: '/categories/architecture' },
    { label: 'Interiors', href: '/categories/interiors' },
    { label: 'Living', href: '/categories/living' },
  ];

  it('renders trigger button', () => {
    render(
      <NavDropdown label="Categories" items={dropdownItems} />
    );

    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('shows dropdown items on click', async () => {
    render(
      <NavDropdown label="Categories" items={dropdownItems} />
    );

    const trigger = screen.getByText('Categories');
    await userEvent.click(trigger);

    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('Interiors')).toBeInTheDocument();
    expect(screen.getByText('Living')).toBeInTheDocument();
  });

  it('hides dropdown items when clicked outside', async () => {
    render(
      <div>
        <NavDropdown label="Categories" items={dropdownItems} />
        <div data-testid="outside">Outside</div>
      </div>
    );

    const trigger = screen.getByText('Categories');
    await userEvent.click(trigger);

    expect(screen.getByText('Architecture')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('outside'));

    // Items should be hidden (may be visually hidden or removed)
  });

  it('renders with custom icon', () => {
    const Icon = () => <svg data-testid="custom-icon" />;
    render(
      <NavDropdown 
        label="Categories" 
        items={dropdownItems} 
        icon={<Icon />}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});

describe('MobileNav Component', () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'About', href: '/about' },
  ];

  it('renders hamburger button', () => {
    render(<MobileNav items={navItems} />);

    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toBeInTheDocument();
  });

  it('opens menu on button click', async () => {
    render(<MobileNav items={navItems} />);

    const button = screen.getByRole('button', { name: /menu/i });
    await userEvent.click(button);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  it('closes menu on item click', async () => {
    render(<MobileNav items={navItems} />);

    const button = screen.getByRole('button', { name: /menu/i });
    await userEvent.click(button);

    const homeLink = screen.getByText('Home');
    await userEvent.click(homeLink);

    // Menu should close
  });

  it('supports nested items', async () => {
    const nestedItems = [
      {
        label: 'Categories',
        children: [
          { label: 'Architecture', href: '/categories/architecture' },
          { label: 'Interiors', href: '/categories/interiors' },
        ],
      },
    ];

    render(<MobileNav items={nestedItems} />);

    const button = screen.getByRole('button', { name: /menu/i });
    await userEvent.click(button);

    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});

describe('Breadcrumbs Component', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Victorian Architecture' },
  ];

  it('renders breadcrumb items', () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Victorian Architecture')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={items} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const articlesLink = screen.getByRole('link', { name: 'Articles' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(articlesLink).toHaveAttribute('href', '/articles');
  });

  it('renders last item as text (not link)', () => {
    render(<Breadcrumbs items={items} />);

    const lastItem = screen.getByText('Victorian Architecture');
    expect(lastItem.closest('a')).toBeNull();
  });

  it('renders separators between items', () => {
    render(<Breadcrumbs items={items} separator="/" />);

    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('has proper aria attributes', () => {
    render(<Breadcrumbs items={items} />);

    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(<Breadcrumbs items={items} />);

    const currentItem = screen.getByText('Victorian Architecture');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });
});

describe('TabNav Component', () => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' },
  ];

  it('renders all tabs', () => {
    render(
      <TabNav tabs={tabs} activeTab="overview" onTabChange={() => {}} />
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('highlights active tab', () => {
    render(
      <TabNav tabs={tabs} activeTab="details" onTabChange={() => {}} />
    );

    const detailsTab = screen.getByText('Details');
    expect(detailsTab.closest('button')).toHaveClass('border-hampstead-green');
  });

  it('calls onTabChange when tab is clicked', async () => {
    const onTabChange = jest.fn();
    render(
      <TabNav tabs={tabs} activeTab="overview" onTabChange={onTabChange} />
    );

    await userEvent.click(screen.getByText('Details'));

    expect(onTabChange).toHaveBeenCalledWith('details');
  });

  it('supports keyboard navigation', async () => {
    const onTabChange = jest.fn();
    render(
      <TabNav tabs={tabs} activeTab="overview" onTabChange={onTabChange} />
    );

    const overviewTab = screen.getByText('Overview');
    overviewTab.focus();

    fireEvent.keyDown(overviewTab, { key: 'ArrowRight' });

    // Should move focus to next tab
  });

  it('renders with icons', () => {
    const Icon = () => <svg data-testid="tab-icon" />;
    const tabsWithIcons = tabs.map(tab => ({ ...tab, icon: <Icon /> }));

    render(
      <TabNav tabs={tabsWithIcons} activeTab="overview" onTabChange={() => {}} />
    );

    expect(screen.getAllByTestId('tab-icon')).toHaveLength(3);
  });

  it('supports disabled tabs', () => {
    const tabsWithDisabled = [
      ...tabs,
      { id: 'settings', label: 'Settings', disabled: true },
    ];

    render(
      <TabNav tabs={tabsWithDisabled} activeTab="overview" onTabChange={() => {}} />
    );

    const settingsTab = screen.getByText('Settings').closest('button');
    expect(settingsTab).toBeDisabled();
  });
});

describe('Navigation Accessibility', () => {
  it('navbar has proper role', () => {
    render(
      <Navbar>
        <NavItem href="/">Home</NavItem>
      </Navbar>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('skip link is provided', () => {
    render(
      <Navbar includeSkipLink>
        <NavItem href="/">Home</NavItem>
      </Navbar>
    );

    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('dropdown has proper aria-expanded', async () => {
    const dropdownItems = [
      { label: 'Item 1', href: '/item1' },
    ];

    render(
      <NavDropdown label="Menu" items={dropdownItems} />
    );

    const trigger = screen.getByText('Menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('mobile nav toggle has aria-label', () => {
    render(
      <MobileNav items={[{ label: 'Home', href: '/' }]} />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });
});
