/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast, ToastProvider, useToast } from '@/components/ui/Toast';

// Test wrapper component that uses the toast hook
const TestToastComponent: React.FC = () => {
  const { toast, success, error, warning, info, dismiss, clearAll } = useToast();

  return (
    <div>
      <button onClick={() => toast({ type: 'info', title: 'Default toast', message: 'Default message' })}>
        Show Toast
      </button>
      <button onClick={() => success('Success Title', { message: 'Success message' })}>
        Show Success
      </button>
      <button onClick={() => error('Error Title', { message: 'Error message' })}>
        Show Error
      </button>
      <button onClick={() => warning('Warning Title', { message: 'Warning message' })}>
        Show Warning
      </button>
      <button onClick={() => info('Info Title', { message: 'Info message' })}>
        Show Info
      </button>
      <button onClick={() => dismiss('test-id')}>
        Dismiss
      </button>
      <button onClick={clearAll}>
        Dismiss All
      </button>
    </div>
  );
};

describe('Toast Component', () => {
  describe('Individual Toast Unit Test', () => {
    it('renders correctly with required props', () => {
      const mockDismiss = jest.fn();
      const toastData = {
        id: 'test-id',
        type: 'success' as const,
        title: 'Test Title',
        message: 'Test Message',
      };

      render(
        <Toast
          toast={toastData}
          onDismiss={mockDismiss}
          position="top-right"
        />
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Message')).toBeInTheDocument();
    });
  });

  describe('Toast Integration', () => {
    it('shows toast when triggered', async () => {
      render(
        <ToastProvider>
          <TestToastComponent />
        </ToastProvider>
      );

      const button = screen.getByText('Show Success');
      fireEvent.click(button);

      // Toast renders in a portal, so we look for it in the document
      expect(await screen.findByText('Success Title')).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('shows error toast', async () => {
      render(
        <ToastProvider>
          <TestToastComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByText('Show Error'));
      expect(await screen.findByText('Error Title')).toBeInTheDocument();
    });
  });
});
