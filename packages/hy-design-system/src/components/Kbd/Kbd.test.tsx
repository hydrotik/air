import React from 'react';
import { render, screen } from '@testing-library/react';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders keyboard shortcut text', () => {
    render(<Kbd>⌘K</Kbd>);
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('renders as a kbd element', () => {
    const { container } = render(<Kbd>Enter</Kbd>);
    expect(container.querySelector('kbd')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Kbd ref={ref}>Esc</Kbd>);
    expect(ref.current?.tagName).toBe('KBD');
  });
});
