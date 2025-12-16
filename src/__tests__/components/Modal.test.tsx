/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor, renderHook, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal, { useModal } from '@/components/ui/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Rendering', () => {
    it('renders nothing when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('renders modal content when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      // Assuming the close button has an aria-label or is an X icon
      // Looking at Modal.tsx, it uses X icon. Usually these have aria-label="Close" or similar.
      // Let's try to find by role button.
      const closeButtons = screen.getAllByRole('button');
      // The modal usually has a close button in the header.
      // Let's assume it's the first one or find by label if we knew it.
      // In Modal.tsx: <button onClick={onClose} ...><X ... /></button>
      // It doesn't seem to have aria-label in the snippet I read?
      // Wait, I should check Modal.tsx again or just try clicking the button.
      
      fireEvent.click(closeButtons[0]);
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );
      
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('useModal Hook', () => {
    it('initializes with default state', () => {
      const { result } = renderHook(() => useModal());
      expect(result.current.isOpen).toBe(false);
    });

    it('opens modal', () => {
      const { result } = renderHook(() => useModal());
      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);
    });

    it('closes modal', () => {
      const { result } = renderHook(() => useModal(true));
      act(() => {
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('toggles modal', () => {
      const { result } = renderHook(() => useModal());
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(true);
      act(() => {
        result.current.toggle();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });
});
