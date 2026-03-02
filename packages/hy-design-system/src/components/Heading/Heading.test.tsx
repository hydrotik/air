import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders title text', () => {
    render(<Heading title="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Heading title="Title" description="Subtitle text" />);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('omits description when not provided', () => {
    const { container } = render(<Heading title="Title Only" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('renders correct heading level', () => {
    render(<Heading title="H3 Heading" as="h3" />);
    const heading = screen.getByText('H3 Heading');
    expect(heading.tagName).toBe('H3');
  });

  it('defaults to h2', () => {
    render(<Heading title="Default" />);
    expect(screen.getByText('Default').tagName).toBe('H2');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Heading ref={ref} title="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes className to root', () => {
    const { container } = render(<Heading title="Styled" className="custom-class" />);
    expect(container.firstElementChild).toHaveClass('custom-class');
  });
});
