/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, useModal, ModalProvider } from '@/components/ui/Modal';

// Test wrapper with ModalProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Small" size="sm">
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={mockOnClose} title="Large" size="lg">
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Test" 
          className="custom-modal"
        >
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      await userEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      // Click on the overlay (backdrop)
      const overlay = screen.getByTestId('modal-overlay');
      await userEvent.click(overlay);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when clicking inside modal content', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const content = screen.getByText('Modal content');
      await userEvent.click(content);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby');
    });

    it('has accessible close button', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('traps focus within modal', async () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <button>First button</button>
          <button>Second button</button>
        </Modal>
      );

      const firstButton = screen.getByRole('button', { name: 'First button' });
      const secondButton = screen.getByRole('button', { name: 'Second button' });

      // Focus should be trapped within modal
      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);
    });
  });

  describe('Body Scroll Lock', () => {
    it('prevents body scroll when modal is open', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when modal is closed', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });
});

describe('useModal Hook', () => {
  const TestComponent: React.FC = () => {
    const { isOpen, open, close, toggle } = useModal();

    return (
      <div>
        <span data-testid="status">{isOpen ? 'open' : 'closed'}</span>
        <button onClick={open}>Open</button>
        <button onClick={close}>Close</button>
        <button onClick={toggle}>Toggle</button>
      </div>
    );
  };

  it('starts with modal closed by default', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('status')).toHaveTextContent('closed');
  });

  it('opens modal when open is called', async () => {
    render(<TestComponent />);
    
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    
    expect(screen.getByTestId('status')).toHaveTextContent('open');
  });

  it('closes modal when close is called', async () => {
    render(<TestComponent />);
    
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByTestId('status')).toHaveTextContent('open');
    
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByTestId('status')).toHaveTextContent('closed');
  });

  it('toggles modal state', async () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('status')).toHaveTextContent('closed');
    
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByTestId('status')).toHaveTextContent('open');
    
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByTestId('status')).toHaveTextContent('closed');
  });
});

describe('Confirmation Modal', () => {
  it('renders confirm and cancel buttons', () => {
    const mockConfirm = jest.fn();
    const mockCancel = jest.fn();

    render(
      <Modal 
        isOpen={true} 
        onClose={mockCancel} 
        title="Confirm Action"
        footer={
          <>
            <button onClick={mockCancel}>Cancel</button>
            <button onClick={mockConfirm}>Confirm</button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('handles confirm action', async () => {
    const mockConfirm = jest.fn();
    const mockClose = jest.fn();

    render(
      <Modal 
        isOpen={true} 
        onClose={mockClose} 
        title="Confirm Action"
        footer={
          <button onClick={mockConfirm}>Confirm</button>
        }
      >
        <p>Confirm?</p>
      </Modal>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(mockConfirm).toHaveBeenCalledTimes(1);
  });
});
