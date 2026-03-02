import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeBlock, InlineCode } from './CodeBlock';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

describe('CodeBlock', () => {
  it('renders code content', () => {
    render(<CodeBlock>const x = 42;</CodeBlock>);
    expect(screen.getByText('const x = 42;')).toBeInTheDocument();
  });

  it('renders language badge when provided', () => {
    render(<CodeBlock language="typescript">const x = 42;</CodeBlock>);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('hides language badge when showLanguage is false', () => {
    render(<CodeBlock language="typescript" showLanguage={false}>code</CodeBlock>);
    expect(screen.queryByText('typescript')).not.toBeInTheDocument();
  });

  it('renders copy button by default', () => {
    render(<CodeBlock>code</CodeBlock>);
    expect(screen.getByLabelText('Copy code')).toBeInTheDocument();
  });

  it('hides copy button when showCopy is false', () => {
    render(<CodeBlock showCopy={false}>code</CodeBlock>);
    expect(screen.queryByLabelText('Copy code')).not.toBeInTheDocument();
  });

  it('copies code to clipboard on click', async () => {
    render(<CodeBlock>hello world</CodeBlock>);
    fireEvent.click(screen.getByLabelText('Copy code'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });

  it('strips trailing newlines', () => {
    render(<CodeBlock>{'code\n'}</CodeBlock>);
    expect(screen.getByText('code')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CodeBlock ref={ref}>code</CodeBlock>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('InlineCode', () => {
  it('renders inline code', () => {
    render(<InlineCode>useChat</InlineCode>);
    expect(screen.getByText('useChat')).toBeInTheDocument();
    expect(screen.getByText('useChat').tagName).toBe('CODE');
  });
});
