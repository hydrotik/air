import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CompactDashboardPage } from './CompactDashboardPage';
import { useTelemetry } from '../hooks/useTelemetry';
import { fullData, mockTelemetry } from '../__testing__/telemetry';
import { NOW, makeEvent, makeSession } from '../__testing__/fixtures';

// Each test hands the page one stable telemetry object: the real hook returns a fresh object
// per render, which loops this page (see pages.integration.test.tsx).
jest.mock('../hooks/useTelemetry', () => ({ useTelemetry: jest.fn() }));
const useTelemetryMock = useTelemetry as jest.MockedFunction<typeof useTelemetry>;

function kpi(label: string): string | null | undefined {
  return screen.getByText(label, { selector: '.compactKpiLabel' }).nextElementSibling?.textContent;
}

function header(title: string): HTMLElement {
  return screen
    .getByText(title, { selector: '.compactPanelHeader > span' })
    .closest('.compactPanelHeader') as HTMLElement;
}

const toolError = (toolName: string) =>
  makeEvent('tool_call_end', { toolName, isError: true, durationMs: 5, outputSizeBytes: 10 });

beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
afterEach(() => jest.restoreAllMocks());

describe('CompactDashboardPage', () => {
  it('starts on the overview tab with placeholder KPIs when empty', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry());
    render(<CompactDashboardPage />);

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual([
      'Overview',
      'Errors',
      'Sessions',
      'Integrations',
      'Drift',
    ]);
    expect(kpi('Total Cost')).toBe('—');
    expect(screen.getByText('Reconnecting…')).toBeInTheDocument();
    expect(screen.getByText('0 sessions')).toBeInTheDocument();
    expect(screen.getByText('Waiting for context data…')).toBeInTheDocument();
    expect(screen.getByText('No cost data recorded yet')).toBeInTheDocument();
    // ticker empty state
    expect(screen.getByText('Waiting for events…')).toBeInTheDocument();
  });

  it('auto-selects the first session and shows its KPIs', async () => {
    const telemetry = mockTelemetry(
      { sessions: [makeSession({ contextUtilizationPct: 91 })], connected: true },
      fullData
    );
    useTelemetryMock.mockReturnValue(telemetry);
    render(<CompactDashboardPage />);

    await waitFor(() => expect(kpi('Total Tokens')).toBe('150.0K'));
    expect(telemetry.fetchCostBreakdown).toHaveBeenCalledWith('s1');
    expect(kpi('Total Cost')).toBe('$0.1235');
    expect(kpi('Tool Calls')).toBe('17');
    expect(kpi('Turns')).toBe('6');
    expect(kpi('Avg Latency')).toBe('1200ms');
    expect(screen.getByText('91.0%')).toHaveStyle({ color: '#ef4444' });
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('anthropic/sonnet-4')).toBeInTheDocument();
    // compact panels drop their tables
    expect(screen.queryByRole('columnheader', { name: 'Model' })).toBeNull();
  });

  it('switches tab content when a tab is clicked', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry());
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Drift' }));

    expect(screen.getByRole('tab', { name: 'Drift' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('No drift events')).toBeInTheDocument();
    expect(screen.getByText('No drift summary data')).toBeInTheDocument();
    expect(screen.queryByText('Total Cost')).toBeNull();
  });

  it('lists only failed tool calls on the errors tab', () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry({
        events: [
          toolError('bash'),
          makeEvent('tool_call_end', {
            toolName: 'read',
            isError: false,
            durationMs: 1,
            outputSizeBytes: 1,
          }),
          toolError('edit'),
        ],
      })
    );
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Errors' }));

    expect(header('Tool Errors')).toHaveTextContent('2');
    expect(screen.getByText('bash ✗ 5ms (10B)')).toBeInTheDocument();
    expect(screen.getByText('edit ✗ 5ms (10B)')).toBeInTheDocument();
    expect(screen.queryByText(/^read/)).toBeNull();
    expect(screen.getByText('No drift alerts')).toBeInTheDocument();
  });

  it('shows "No tool errors" when nothing failed', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry());
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Errors' }));
    expect(screen.getByText('No tool errors')).toBeInTheDocument();
  });

  it('lets the user switch session from the sessions tab', async () => {
    const telemetry = mockTelemetry({
      sessions: [
        makeSession(),
        makeSession({ sessionId: 's2', model: 'haiku', totalCost: 1.5, turnCount: 2 }),
      ],
    });
    useTelemetryMock.mockReturnValue(telemetry);
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Sessions' }));
    expect(header('Sessions')).toHaveTextContent('2');

    fireEvent.click(screen.getByText('anthropic/haiku', { selector: '.sessionItem span' }));
    await waitFor(() => expect(telemetry.fetchSessionEvents).toHaveBeenCalledWith('s2'));
    const summary = document.querySelector('.compactSessionSummary')!;
    expect(summary).toHaveTextContent('anthropic/haiku');
    expect(summary).toHaveTextContent('$1.5000');
    expect(summary).toHaveTextContent('2 turns');
  });

  it('shows integration stats and providers', async () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry(
        {
          sessions: [makeSession()],
          providers: { rag: [], mcp: [{ name: 'browser', eventCount: 2, active: true }] },
        },
        fullData
      )
    );
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Integrations' }));

    expect(await screen.findByText('7 calls')).toBeInTheDocument();
    expect(screen.getByText('11 ops')).toBeInTheDocument();
    expect(screen.getByText('Providers')).toBeInTheDocument();
    expect(screen.getByText('browser')).toBeInTheDocument();
  });

  it('shows empty integration states without data', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry());
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Integrations' }));
    expect(screen.getByText('No MCP data')).toBeInTheDocument();
    expect(screen.getByText('No RAG data')).toBeInTheDocument();
    expect(screen.queryByText('Providers')).toBeNull();
  });

  it('shows drift events and summary on the drift tab', async () => {
    useTelemetryMock.mockReturnValue(mockTelemetry({ sessions: [makeSession()] }, fullData));
    render(<CompactDashboardPage />);
    fireEvent.click(screen.getByRole('tab', { name: 'Drift' }));

    expect(await screen.findByTestId('data-grid')).toBeInTheDocument();
    expect(header('Events')).toHaveTextContent('1');
    expect(screen.getByText('×1')).toBeInTheDocument();
  });

  it('refetches cost when a live token_usage event arrives for the active session', async () => {
    const telemetry = mockTelemetry({ sessions: [makeSession()] });
    useTelemetryMock.mockReturnValue(telemetry);
    const { rerender } = render(<CompactDashboardPage />);
    await waitFor(() => expect(telemetry.fetchCostBreakdown).toHaveBeenCalledTimes(1));

    // same object identity, new events array: the stable-object stand-in for a live update
    (telemetry as any).events = [
      makeEvent('token_usage', { input: 1, output: 1, cacheRead: 0, cost: { total: 0 } }),
    ];
    useTelemetryMock.mockReturnValue({ ...telemetry });
    rerender(<CompactDashboardPage />);
    await waitFor(() =>
      expect((telemetry.fetchCostBreakdown as jest.Mock).mock.calls.length).toBeGreaterThan(1)
    );
    expect(telemetry.fetchCostTimeseries).toHaveBeenCalledWith('s1');
  });

  it('feeds the ticker with the latest key event', () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry({ events: [makeEvent('compaction', { tokensBefore: 2_000_000 })] })
    );
    render(<CompactDashboardPage />);
    expect(screen.getByText('COMPACT')).toBeInTheDocument();
    expect(screen.getByText('2.0M tokens → summary')).toBeInTheDocument();
  });
});
