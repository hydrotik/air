import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders text content', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
