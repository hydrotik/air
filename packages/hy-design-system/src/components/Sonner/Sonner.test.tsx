import React from 'react';
import { render } from '@testing-library/react';
import { Toaster } from './Sonner';

describe('Toaster (Sonner)', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toaster />);
    // Sonner renders a toaster container as an <ol> or section
    expect(container).toBeTruthy();
  });

  it('accepts theme prop', () => {
    const { container } = render(<Toaster theme="light" />);
    expect(container).toBeTruthy();
  });
});
