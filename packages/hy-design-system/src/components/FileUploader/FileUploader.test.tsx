import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploader } from './FileUploader';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock');
global.URL.revokeObjectURL = jest.fn();

describe('FileUploader', () => {
  it('renders dropzone text', () => {
    render(<FileUploader />);
    expect(screen.getByText(/Drag 'n' drop/)).toBeInTheDocument();
  });

  it('renders max size info', () => {
    render(<FileUploader maxSize={1024 * 1024 * 5} />);
    expect(screen.getByText(/5 MB/)).toBeInTheDocument();
  });

  it('renders multiple file info', () => {
    render(<FileUploader maxFiles={3} multiple />);
    expect(screen.getByText(/Up to 3 files/)).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<FileUploader disabled />);
    const dropzoneEl = screen.getByRole('button');
    expect(dropzoneEl).toHaveAttribute('tabindex', '-1');
  });

  it('calls onValueChange when files are selected', () => {
    const onChange = jest.fn();
    render(<FileUploader onValueChange={onChange} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);
    expect(onChange).toHaveBeenCalledWith([file]);
  });

  it('shows file list when files are provided', () => {
    const file = new File(['content'], 'photo.jpg', { type: 'image/jpeg' });
    render(<FileUploader value={[file]} />);
    expect(screen.getByText('photo.jpg')).toBeInTheDocument();
  });

  it('removes file when remove button clicked', () => {
    const onChange = jest.fn();
    const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });
    render(<FileUploader value={[file]} onValueChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Remove doc.pdf'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FileUploader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
