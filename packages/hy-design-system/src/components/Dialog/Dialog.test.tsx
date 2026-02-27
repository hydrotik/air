import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './Dialog';

expect.extend(toHaveNoViolations);

function TestDialog({ showClose = true }: { showClose?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent showClose={showClose}>
        <DialogHeader>
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Test description text.</DialogDescription>
        </DialogHeader>
        <div>Dialog body content</div>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('renders trigger button', () => {
    render(<TestDialog />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('content is not visible before opening', () => {
    render(<TestDialog />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('opens dialog on trigger click', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description text.')).toBeInTheDocument();
  });

  it('closes dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    await user.click(screen.getByLabelText('Close dialog'));
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('closes dialog via Cancel button', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open'));
    await user.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('hides the X button when showClose=false', async () => {
    const user = userEvent.setup();
    render(<TestDialog showClose={false} />);
    await user.click(screen.getByText('Open'));
    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('has no accessibility violations when closed', async () => {
    const { container } = render(<TestDialog />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when open', async () => {
    const user = userEvent.setup();
    const { container } = render(<TestDialog />);
    await user.click(screen.getByText('Open'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
