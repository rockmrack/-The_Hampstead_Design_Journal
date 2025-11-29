/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProvider, useToast, ToastContainer } from '@/components/ui/Toast';

// Test wrapper component that uses the toast hook
const TestToastComponent: React.FC = () => {
  const { toast, success, error, warning, info, dismiss, dismissAll } = useToast();

  return (
    <div>
      <button onClick={() => toast({ message: 'Default toast' })}>
        Show Toast
      </button>
      <button onClick={() => success('Success message')}>
        Show Success
      </button>
      <button onClick={() => error('Error message')}>
        Show Error
      </button>
      <button onClick={() => warning('Warning message')}>
        Show Warning
      </button>
      <button onClick={() => info('Info message')}>
        Show Info
      </button>
      <button onClick={() => dismiss('test-id')}>
        Dismiss
      </button>
      <button onClick={dismissAll}>
        Dismiss All
      </button>
    </div>
  );
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <ToastProvider>
      {ui}
      <ToastContainer />
    </ToastProvider>
  );
};

describe('Toast Component', () => {
  describe('Individual Toast', () => {
    it('renders toast message', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test-toast"
          message="Test message"
          type="default"
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('renders with different types', () => {
      const onDismiss = jest.fn();
      const { rerender } = render(
        <Toast
          id="test"
          message="Success"
          type="success"
          onDismiss={onDismiss}
        />
      );
      
      expect(screen.getByText('Success')).toBeInTheDocument();

      rerender(
        <Toast
          id="test"
          message="Error"
          type="error"
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('calls onDismiss when close button is clicked', async () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test-toast"
          message="Test message"
          type="default"
          onDismiss={onDismiss}
        />
      );

      const closeButton = screen.getByRole('button', { name: /dismiss/i });
      await userEvent.click(closeButton);

      expect(onDismiss).toHaveBeenCalledWith('test-toast');
    });

    it('renders title when provided', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Message"
          title="Toast Title"
          type="default"
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByText('Toast Title')).toBeInTheDocument();
    });

    it('renders action button when provided', async () => {
      const onAction = jest.fn();
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Message"
          type="default"
          onDismiss={onDismiss}
          action={{
            label: 'Undo',
            onClick: onAction,
          }}
        />
      );

      const actionButton = screen.getByRole('button', { name: 'Undo' });
      await userEvent.click(actionButton);

      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Toast Hook', () => {
    it('creates success toast', async () => {
      renderWithProvider(<TestToastComponent />);

      await userEvent.click(screen.getByRole('button', { name: 'Show Success' }));

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });
    });

    it('creates error toast', async () => {
      renderWithProvider(<TestToastComponent />);

      await userEvent.click(screen.getByRole('button', { name: 'Show Error' }));

      await waitFor(() => {
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });
    });

    it('creates warning toast', async () => {
      renderWithProvider(<TestToastComponent />);

      await userEvent.click(screen.getByRole('button', { name: 'Show Warning' }));

      await waitFor(() => {
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });
    });

    it('creates info toast', async () => {
      renderWithProvider(<TestToastComponent />);

      await userEvent.click(screen.getByRole('button', { name: 'Show Info' }));

      await waitFor(() => {
        expect(screen.getByText('Info message')).toBeInTheDocument();
      });
    });

    it('dismisses all toasts', async () => {
      renderWithProvider(<TestToastComponent />);

      // Create multiple toasts
      await userEvent.click(screen.getByRole('button', { name: 'Show Success' }));
      await userEvent.click(screen.getByRole('button', { name: 'Show Error' }));

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      // Dismiss all
      await userEvent.click(screen.getByRole('button', { name: 'Dismiss All' }));

      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
        expect(screen.queryByText('Error message')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toast Auto-dismiss', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('auto-dismisses after duration', async () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Auto dismiss"
          type="default"
          duration={3000}
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByText('Auto dismiss')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledWith('test');
      });
    });

    it('does not auto-dismiss when duration is Infinity', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Persistent"
          type="default"
          duration={Infinity}
          onDismiss={onDismiss}
        />
      );

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(onDismiss).not.toHaveBeenCalled();
      expect(screen.getByText('Persistent')).toBeInTheDocument();
    });
  });

  describe('Toast Accessibility', () => {
    it('has proper role for screen readers', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Message"
          type="default"
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has accessible dismiss button', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Message"
          type="default"
          onDismiss={onDismiss}
        />
      );

      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      expect(dismissButton).toHaveAttribute('aria-label');
    });

    it('error toast has error role', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Error"
          type="error"
          onDismiss={onDismiss}
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Toast Styling', () => {
    it('applies success styling', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Success"
          type="success"
          onDismiss={onDismiss}
          data-testid="toast"
        />
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('bg-green-50');
    });

    it('applies error styling', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Error"
          type="error"
          onDismiss={onDismiss}
          data-testid="toast"
        />
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('bg-red-50');
    });

    it('applies warning styling', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Warning"
          type="warning"
          onDismiss={onDismiss}
          data-testid="toast"
        />
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('bg-yellow-50');
    });

    it('applies info styling', () => {
      const onDismiss = jest.fn();
      render(
        <Toast
          id="test"
          message="Info"
          type="info"
          onDismiss={onDismiss}
          data-testid="toast"
        />
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('bg-blue-50');
    });
  });
});

describe('ToastContainer', () => {
  it('renders at the correct position', () => {
    render(
      <ToastProvider position="top-right">
        <ToastContainer />
      </ToastProvider>
    );

    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('top-0', 'right-0');
  });

  it('supports different positions', () => {
    const { rerender } = render(
      <ToastProvider position="bottom-left">
        <ToastContainer />
      </ToastProvider>
    );

    expect(screen.getByTestId('toast-container')).toHaveClass('bottom-0', 'left-0');

    rerender(
      <ToastProvider position="top-center">
        <ToastContainer />
      </ToastProvider>
    );

    expect(screen.getByTestId('toast-container')).toHaveClass('top-0');
  });
});
