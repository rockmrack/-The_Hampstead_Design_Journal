/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Import components after mocking
import { Input, Textarea, Select, Checkbox, RadioGroup, Toggle } from '@/components/ui/FormElements';

describe('Form Elements', () => {
  describe('Input', () => {
    it('renders with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('shows required indicator', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Input label="Email" error="Invalid email" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    });

    it('displays hint text', () => {
      render(<Input label="Email" hint="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('handles value changes', async () => {
      const handleChange = jest.fn();
      render(<Input label="Email" onChange={handleChange} />);
      
      const input = screen.getByLabelText('Email');
      await userEvent.type(input, 'test@example.com');
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports different variants', () => {
      const { rerender } = render(<Input label="Test" variant="default" />);
      expect(screen.getByLabelText('Test')).toBeInTheDocument();
      
      rerender(<Input label="Test" variant="filled" />);
      expect(screen.getByLabelText('Test')).toBeInTheDocument();
      
      rerender(<Input label="Test" variant="outline" />);
      expect(screen.getByLabelText('Test')).toBeInTheDocument();
    });

    it('renders left and right icons', () => {
      render(
        <Input 
          label="Search" 
          leftIcon={<span data-testid="left-icon">L</span>}
          rightIcon={<span data-testid="right-icon">R</span>}
        />
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('applies disabled state correctly', () => {
      render(<Input label="Disabled" disabled />);
      expect(screen.getByLabelText('Disabled')).toBeDisabled();
    });
  });

  describe('Textarea', () => {
    it('renders with label', () => {
      render(<Textarea label="Message" />);
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('shows character count when enabled', () => {
      render(
        <Textarea 
          label="Message" 
          showCharCount 
          maxLength={100} 
          value="Hello" 
          onChange={() => {}}
        />
      );
      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Textarea label="Message" error="Message too short" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Message too short');
    });
  });

  describe('Select', () => {
    const options = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3', disabled: true },
    ];

    it('renders with label', () => {
      render(<Select label="Choose" options={options} />);
      expect(screen.getByLabelText('Choose')).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<Select label="Choose" options={options} />);
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('shows placeholder when provided', () => {
      render(<Select label="Choose" options={options} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('handles selection changes', async () => {
      const handleChange = jest.fn();
      render(<Select label="Choose" options={options} onChange={handleChange} />);
      
      const select = screen.getByLabelText('Choose');
      await userEvent.selectOptions(select, 'opt2');
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('disables individual options', () => {
      render(<Select label="Choose" options={options} />);
      const option = screen.getByText('Option 3') as HTMLOptionElement;
      expect(option.disabled).toBe(true);
    });
  });

  describe('Checkbox', () => {
    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('toggles on click', async () => {
      const handleChange = jest.fn();
      render(<Checkbox label="Accept terms" onChange={handleChange} />);
      
      const checkbox = screen.getByLabelText('Accept terms');
      await userEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('shows description', () => {
      render(
        <Checkbox 
          label="Accept terms" 
          description="By checking this, you agree to our terms"
        />
      );
      expect(screen.getByText('By checking this, you agree to our terms')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Checkbox label="Accept terms" error="You must accept the terms" />);
      expect(screen.getByRole('alert')).toHaveTextContent('You must accept the terms');
    });
  });

  describe('RadioGroup', () => {
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C', description: 'Extra info' },
    ];

    it('renders all options', () => {
      render(<RadioGroup name="test" options={options} />);
      
      expect(screen.getByLabelText('Option A')).toBeInTheDocument();
      expect(screen.getByLabelText('Option B')).toBeInTheDocument();
      expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<RadioGroup name="test" label="Select one" options={options} />);
      expect(screen.getByText('Select one')).toBeInTheDocument();
    });

    it('handles selection', async () => {
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={options} onChange={handleChange} />);
      
      await userEvent.click(screen.getByLabelText('Option B'));
      expect(handleChange).toHaveBeenCalledWith('b');
    });

    it('shows option descriptions', () => {
      render(<RadioGroup name="test" options={options} />);
      expect(screen.getByText('Extra info')).toBeInTheDocument();
    });

    it('supports horizontal orientation', () => {
      const { container } = render(
        <RadioGroup name="test" options={options} orientation="horizontal" />
      );
      expect(container.querySelector('.flex-wrap')).toBeInTheDocument();
    });
  });

  describe('Toggle', () => {
    it('renders with label', () => {
      render(<Toggle label="Enable feature" />);
      expect(screen.getByText('Enable feature')).toBeInTheDocument();
    });

    it('toggles state on click', async () => {
      const handleChange = jest.fn();
      render(<Toggle label="Enable feature" onChange={handleChange} />);
      
      const toggle = screen.getByRole('checkbox');
      await userEvent.click(toggle);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports different sizes', () => {
      const { rerender } = render(<Toggle label="Test" size="sm" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      
      rerender(<Toggle label="Test" size="md" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      
      rerender(<Toggle label="Test" size="lg" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('shows description', () => {
      render(
        <Toggle 
          label="Enable feature" 
          description="This will enable the feature"
        />
      );
      expect(screen.getByText('This will enable the feature')).toBeInTheDocument();
    });
  });
});
