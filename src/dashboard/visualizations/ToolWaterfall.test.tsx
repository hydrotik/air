import { render, screen } from '@testing-library/react';
import { ToolWaterfall } from './ToolWaterfall';

const call = (fields: Record<string, unknown>) => ({
  tool_call_id: String(Math.random()),
  tool_name: 'read',
  start_time: 1_000,
  is_error: 0,
  ...fields,
});

describe('ToolWaterfall', () => {
  // jsdom defines clientWidth (always 0) on Element.prototype; shadow it for HTML elements.
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 500,
    });
  });
  afterAll(() => {
    delete (HTMLElement.prototype as any).clientWidth;
  });

  it('shows an empty state with no tool calls', () => {
    render(<ToolWaterfall toolCalls={[]} />);
    expect(screen.getByText('No tool calls recorded')).toBeInTheDocument();
  });

  it('draws a labelled bar per call with its duration', () => {
    const { container } = render(
      <ToolWaterfall
        toolCalls={[
          call({ tool_name: 'read', start_time: 1_000, end_time: 1_120, duration_ms: 120 }),
          call({ tool_name: 'bash', start_time: 1_050, end_time: 1_500, duration_ms: 450 }),
        ]}
      />
    );
    const groups = container.querySelectorAll('.bar-group');
    expect(groups).toHaveLength(2);
    expect(groups[0]).toHaveTextContent('read');
    expect(groups[0]).toHaveTextContent('120ms');
    expect(groups[1]).toHaveTextContent('bash');
    expect(groups[1]).toHaveTextContent('450ms');

    const fills = Array.from(container.querySelectorAll('.bar-group rect')).map((r) =>
      r.getAttribute('fill')
    );
    expect(fills).toEqual(['#3b82f6', '#f59e0b']);
  });

  it('places bars on a shared time axis', () => {
    const { container } = render(
      <ToolWaterfall
        toolCalls={[
          call({ start_time: 0, end_time: 100, duration_ms: 100 }),
          call({ start_time: 100, end_time: 200, duration_ms: 100 }),
        ]}
      />
    );
    const [a, b] = Array.from(container.querySelectorAll('.bar-group rect'));
    const ax = Number(a!.getAttribute('x'));
    const aw = Number(a!.getAttribute('width'));
    const bx = Number(b!.getAttribute('x'));
    expect(bx).toBeCloseTo(ax + aw, 5);
    const ticks = Array.from(container.querySelectorAll('.tick text')).map((t) => t.textContent);
    expect(ticks[0]).toBe('0ms');
    expect(ticks.every((t) => t!.endsWith('ms'))).toBe(true);
  });

  it('marks errors red and in-flight calls with an ellipsis', () => {
    const { container } = render(
      <ToolWaterfall
        toolCalls={[
          call({ tool_name: 'edit', is_error: 1, end_time: 1_010, duration_ms: 10 }),
          call({ tool_name: 'mystery' }),
        ]}
      />
    );
    const groups = container.querySelectorAll('.bar-group');
    expect(groups[0]!.querySelector('rect')).toHaveAttribute('fill', '#ef4444');
    expect(groups[1]!.querySelector('rect')).toHaveAttribute('fill', '#64748b');
    expect(groups[1]).toHaveTextContent('…');
  });

  it('grows taller than the 150px minimum for many calls', () => {
    const calls = Array.from({ length: 20 }, (_, i) =>
      call({ start_time: i * 10, end_time: i * 10 + 5, duration_ms: 5 })
    );
    const { container } = render(<ToolWaterfall toolCalls={calls} />);
    // 20 * (14 + 2) + 6 + 16
    expect(container.querySelector('svg')).toHaveAttribute('height', '342');
  });
});
