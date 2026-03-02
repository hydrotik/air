import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders title and description when open', () => {
    render(
      <Modal title="Test Modal" description="Test description" isOpen={true} onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(
      <Modal title="Hidden" isOpen={false} onClose={() => {}}>
        <p>Should not appear</p>
      </Modal>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onClose when dialog closes', () => {
    const onClose = jest.fn();
    render(
      <Modal title="Closable" isOpen={true} onClose={onClose}>
        <p>Close me</p>
      </Modal>,
    );
    // Click the X button (close button rendered by DialogContent)
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('omits description element when not provided', () => {
    render(
      <Modal title="No Desc" isOpen={true} onClose={() => {}}>
        <p>Just content</p>
      </Modal>,
    );
    expect(screen.getByText('No Desc')).toBeInTheDocument();
    // Should not have a description paragraph
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });
});
