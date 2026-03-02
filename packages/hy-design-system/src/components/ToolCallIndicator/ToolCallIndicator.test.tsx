import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolCallIndicator } from './ToolCallIndicator';

describe('ToolCallIndicator', () => {
  it('renders default "Thinking" label', () => {
    render(<ToolCallIndicator />);
    expect(screen.getByText(/Thinking/)).toBeInTheDocument();
  });

  it('renders tool-specific label', () => {
    render(<ToolCallIndicator toolName="getInformation" />);
    expect(screen.getByText(/Getting information/)).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<ToolCallIndicator label="Processing" />);
    expect(screen.getByText(/Processing/)).toBeInTheDocument();
  });

  it('shows tool name badge when toolName provided', () => {
    render(<ToolCallIndicator toolName="search" />);
    expect(screen.getByText('search')).toBeInTheDocument();
  });

  it('hides badge when showBadge is false', () => {
    render(<ToolCallIndicator toolName="search" showBadge={false} />);
    expect(screen.queryByText('search')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ToolCallIndicator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('falls back to "Thinking" for unknown tools', () => {
    render(<ToolCallIndicator toolName="unknownTool" />);
    expect(screen.getByText(/Thinking/)).toBeInTheDocument();
    expect(screen.getByText('unknownTool')).toBeInTheDocument();
  });
});
