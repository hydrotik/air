import { render, screen } from '@testing-library/react';
import { EventFeed } from './EventFeed';
import { makeEvent, tokenUsage } from '../__testing__/fixtures';

function rows(container: HTMLElement) {
  return Array.from(container.querySelectorAll('.eventRow'));
}

describe('EventFeed', () => {
  it('shows a waiting state with no events', () => {
    render(<EventFeed events={[]} />);
    expect(screen.getByText('Waiting for events…')).toBeInTheDocument();
  });

  it('treats a heartbeat-only stream as empty', () => {
    render(<EventFeed events={[makeEvent('heartbeat')]} />);
    expect(screen.getByText('Waiting for events…')).toBeInTheDocument();
  });

  it('renders newest first with the type label de-underscored', () => {
    const { container } = render(
      <EventFeed
        events={[
          makeEvent('turn_start', { turnIndex: 1 }),
          makeEvent('turn_end', { turnIndex: 1, toolCallCount: 3 }),
        ]}
      />
    );
    const r = rows(container);
    expect(r).toHaveLength(2);
    expect(r[0]).toHaveTextContent('turn end');
    expect(r[0]).toHaveTextContent('Turn #1 — 3 tool calls');
    expect(r[1]).toHaveTextContent('turn start');
    expect(r[1]).toHaveTextContent(/\d{2}:\d{2}:\d{2}/);
  });

  it('keeps only the most recent maxItems events', () => {
    const events = [1, 2, 3, 4].map((turnIndex) => makeEvent('turn_start', { turnIndex }));
    const { container } = render(<EventFeed events={events} maxItems={2} />);
    expect(rows(container).map((r) => r.querySelector('.eventDetail')!.textContent)).toEqual([
      'Turn #4',
      'Turn #3',
    ]);
  });

  it.each([
    [
      'tool_call_end success with byte size',
      makeEvent('tool_call_end', {
        toolName: 'read',
        isError: false,
        durationMs: 42,
        outputSizeBytes: 2_500,
      }),
      'read ✓ 42ms (2.5KB)',
    ],
    [
      'tool_call_end error',
      makeEvent('tool_call_end', {
        toolName: 'bash',
        isError: true,
        durationMs: 7,
        outputSizeBytes: 12,
      }),
      'bash ✗ 7ms (12B)',
    ],
    [
      'tool_call_start truncated preview',
      makeEvent('tool_call_start', { toolName: 'grep', inputPreview: 'x'.repeat(120) }),
      `grep → ${'x'.repeat(80)}`,
    ],
    [
      'token usage with K/M formatting',
      tokenUsage(1_500_000, 2_300, { cacheRead: 999 }),
      'in:1.5M out:2.3K cache:999 $0.0123',
    ],
    [
      'context usage',
      makeEvent('context_usage', {
        utilizationPct: 81.234,
        tokensUsed: 162_000,
        contextWindow: 200_000,
      }),
      '81.2% (162.0K/200.0K)',
    ],
    [
      'model change without previous model',
      makeEvent('model_change', { newModel: 'opus' }),
      '— → opus',
    ],
    [
      'mcp request with tool',
      makeEvent('mcp_request', { serverName: 'fs', method: 'tools/call', toolName: 'readFile' }),
      'fs:tools/call (readFile)',
    ],
    [
      'mcp response error',
      makeEvent('mcp_response', {
        serverName: 'fs',
        method: 'tools/call',
        isError: true,
        errorMessage: 'boom',
        durationMs: 9,
      }),
      'fs:tools/call ✗ boom 9ms',
    ],
    [
      'rag retrieval with score',
      makeEvent('rag_retrieval', {
        source: 'docs',
        query: 'how do I',
        resultCount: 4,
        durationMs: 30,
        topScore: 0.876,
      }),
      'docs "how do I" → 4 results 30ms (score:0.88)',
    ],
    [
      'cost over budget',
      makeEvent('cost', {
        totalCost: 0.5,
        cumulativeCost: 12.25,
        budgetExceeded: true,
        model: 'opus',
      }),
      '$0.5000 (cumulative: $12.2500) ⚠ BUDGET EXCEEDED [opus]',
    ],
    [
      'drift',
      makeEvent('drift', {
        severity: 'critical',
        metric: 'latency',
        direction: 'increase',
        deviationPct: -54.6,
        baseline: 100,
        current: 154.6,
        model: 'opus',
      }),
      'CRITICAL latency increase 55% (100.00 → 154.60) [opus]',
    ],
    ['session end', makeEvent('session_end'), 'Session ended'],
  ])('summarises %s', (_name, event, summary) => {
    const { container } = render(<EventFeed events={[event]} />);
    expect(container.querySelector('.eventDetail')).toHaveTextContent(summary, {
      normalizeWhitespace: false,
    });
  });
});
