import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import { useTelemetry } from '../hooks/useTelemetry';
import { TokenFlowChart } from '../visualizations/TokenFlowChart';
import { fullData, mockTelemetry } from '../__testing__/telemetry';
import { NOW, makeEvent, makeSession, tokenUsage } from '../__testing__/fixtures';

jest.mock('../hooks/useTelemetry', () => ({ useTelemetry: jest.fn() }));
// Real chart, wrapped so tests can read the events the page hands it.
jest.mock('../visualizations/TokenFlowChart', () => {
  const actual = jest.requireActual('../visualizations/TokenFlowChart');
  return { TokenFlowChart: jest.fn(actual.TokenFlowChart) };
});

const useTelemetryMock = useTelemetry as jest.MockedFunction<typeof useTelemetry>;
const tokenFlowMock = TokenFlowChart as unknown as jest.Mock;

const driftEvent = (sessionId = 's1') =>
  makeEvent('drift', {
    sessionId,
    severity: 'warning',
    metric: 'latency',
    direction: 'increase',
    deviationPct: 40,
    baseline: 100,
    current: 140,
    model: 'opus',
  });

function kpi(label: string): string | null | undefined {
  return screen.getByText(label, { selector: '.kpiLabel' }).nextElementSibling?.textContent;
}

function panelHeader(title: string): HTMLElement {
  return screen.getByText(title).closest('.panelHeader') as HTMLElement;
}

beforeEach(() => {
  jest.spyOn(Date, 'now').mockReturnValue(NOW);
  tokenFlowMock.mockClear();
});
afterEach(() => jest.restoreAllMocks());

describe('DashboardPage', () => {
  it('renders an empty, disconnected dashboard', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry());
    render(<DashboardPage />);

    expect(screen.getByText('Reconnecting…')).toBeInTheDocument();
    expect(screen.getByTitle('Disconnected')).toBeInTheDocument();
    expect(screen.getByText('0 sessions')).toBeInTheDocument();
    expect(screen.getByTitle('Data redaction: preview')).toHaveTextContent('PREVIEW');
    expect(screen.getByText('No telemetry data yet')).toBeInTheDocument();
    for (const label of [
      'Total Tokens',
      'Total Cost',
      'Tool Calls',
      'Turns',
      'Avg Latency',
      'Context',
    ]) {
      expect(kpi(label)).toBe('—');
    }
    expect(screen.getByText('No sessions recorded')).toBeInTheDocument();
    expect(screen.getByText('Waiting for events…')).toBeInTheDocument();
    // optional panels stay hidden without data
    expect(screen.queryByText('⚠ Drift Detection')).toBeNull();
    expect(screen.queryByText('Activity Monitor')).toBeNull();
    expect(screen.queryByText('Latency')).toBeNull();
    expect(screen.queryByText('Output Quality')).toBeNull();
    expect(screen.queryByText('Integrations')).toBeNull();
  });

  it('auto-selects the first session and loads its data', async () => {
    const telemetry = mockTelemetry(
      { sessions: [makeSession(), makeSession({ sessionId: 's2' })], connected: true },
      fullData
    );
    useTelemetryMock.mockReturnValue(telemetry);
    render(<DashboardPage />);

    await waitFor(() => expect(kpi('Total Tokens')).toBe('150.0K'));
    expect(telemetry.fetchSessionEvents).toHaveBeenCalledWith('s1');
    expect(telemetry.fetchCostBreakdown).toHaveBeenCalledWith('s1');
    expect(telemetry.fetchDriftSummary).toHaveBeenCalledWith('s1');
    expect(telemetry.fetchPromptVariants).toHaveBeenCalledWith();
    expect(telemetry.fetchSessionEvents).not.toHaveBeenCalledWith('s2');

    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('2 sessions')).toBeInTheDocument();
    expect(screen.queryByText('No telemetry data yet')).toBeNull();
  });

  it('computes KPIs from the session summary and loaded stats', async () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry({ sessions: [makeSession({ contextUtilizationPct: 85 })] }, fullData)
    );
    render(<DashboardPage />);
    await waitFor(() => expect(kpi('Avg Latency')).toBe('1200ms'));

    expect(kpi('Total Cost')).toBe('$0.1235');
    expect(kpi('Tool Calls')).toBe('17');
    expect(kpi('Turns')).toBe('6');
    expect(kpi('Context')).toBe('85.0%');
    expect(screen.getByText('85.0%')).toHaveStyle({ color: '#f59e0b' });
  });

  it.each([
    [42, '#ec4899'],
    [80, '#f59e0b'],
    [93.44, '#ef4444'],
  ])('colours %s%% context utilisation as %s', async (pct, color) => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry({ sessions: [makeSession({ contextUtilizationPct: pct })] })
    );
    render(<DashboardPage />);
    const value = await screen.findByText(`${pct.toFixed(1)}%`);
    expect(value).toHaveStyle({ color });
  });

  it('shows optional panels with aggregated headers when data exists', async () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry(
        {
          sessions: [makeSession()],
          providers: {
            rag: [{ name: 'docs', type: 'chroma', eventCount: 1, active: true }],
            mcp: [],
          },
        },
        fullData
      )
    );
    render(<DashboardPage />);

    await screen.findByText('⚠ Drift Detection');
    expect(panelHeader('⚠ Drift Detection')).toHaveTextContent('1 alert');
    expect(panelHeader('Activity Monitor')).toHaveTextContent('2 events · latency sparklines');
    expect(panelHeader('Latency')).toHaveTextContent('avg 650ms');
    expect(panelHeader('Cost')).toHaveTextContent('$0.3234');
    expect(panelHeader('Output Quality')).toHaveTextContent('7 evals');
    expect(panelHeader('Prompt Variants')).toHaveTextContent('2 variants');
    expect(panelHeader('Integrations')).toHaveTextContent('1 RAG · 0 MCP');
    expect(screen.getByText('7 calls')).toBeInTheDocument();
    expect(screen.getByText('11 ops')).toBeInTheDocument();
    // child panels receive the loaded data
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('docs', { selector: 'td' })).toBeInTheDocument();
  });

  it('maps the redaction level to a badge', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry({ redactionLevel: 'none' }));
    render(<DashboardPage />);
    expect(screen.getByTitle('Data redaction: none')).toHaveTextContent('NONE');
  });

  it('falls back to the preview badge for an unknown redaction level', () => {
    useTelemetryMock.mockReturnValue(mockTelemetry({ redactionLevel: 'weird' }));
    render(<DashboardPage />);
    expect(screen.getByTitle('Data redaction: weird')).toHaveTextContent('PREVIEW');
  });

  it('loads another session when it is selected', async () => {
    const telemetry = mockTelemetry({
      sessions: [makeSession(), makeSession({ sessionId: 's2', model: 'haiku', totalCost: 2 })],
    });
    useTelemetryMock.mockReturnValue(telemetry);
    render(<DashboardPage />);
    await waitFor(() => expect(telemetry.fetchSessionEvents).toHaveBeenCalledWith('s1'));

    fireEvent.click(screen.getByText('anthropic/haiku'));
    await waitFor(() => expect(telemetry.fetchSessionEvents).toHaveBeenCalledWith('s2'));
    expect(telemetry.fetchToolCalls).toHaveBeenCalledWith('s2');
    expect(kpi('Total Cost')).toBe('$2.0000');
  });

  it('refetches only the panels affected by live events for the active session', async () => {
    const telemetry = mockTelemetry({ sessions: [makeSession()] });
    useTelemetryMock.mockReturnValue(telemetry);
    const { rerender } = render(<DashboardPage />);
    await waitFor(() => expect(telemetry.fetchDriftEvents).toHaveBeenCalledTimes(1));

    // an event for another session triggers nothing
    useTelemetryMock.mockReturnValue({
      ...telemetry,
      events: [driftEvent('other')],
    });
    rerender(<DashboardPage />);
    await act(async () => {});
    expect(telemetry.fetchDriftEvents).toHaveBeenCalledTimes(1);

    useTelemetryMock.mockReturnValue({
      ...telemetry,
      events: [driftEvent('other'), driftEvent()],
    });
    rerender(<DashboardPage />);
    await waitFor(() => expect(telemetry.fetchDriftEvents).toHaveBeenCalledTimes(2));
    expect(telemetry.fetchDriftSummary).toHaveBeenCalledTimes(2);
    expect(telemetry.fetchCostBreakdown).toHaveBeenCalledTimes(1);
    expect(telemetry.fetchToolCalls).toHaveBeenCalledTimes(1);
  });

  it('shows the live event count in the feed header', () => {
    useTelemetryMock.mockReturnValue(
      mockTelemetry({ events: [makeEvent('turn_start', { turnIndex: 1 }), makeEvent('heartbeat')] })
    );
    render(<DashboardPage />);
    expect(panelHeader('Live Event Feed')).toHaveTextContent('2 events');
    expect(screen.getByText('Turn #1')).toBeInTheDocument();
  });

  // BUG: the "refresh on new events" effect appends *every* buffered event for the session
  // each time the `events` array changes, not just the new ones. With a rolling buffer
  // [A] → [A, B], sessionEvents becomes [...fetched, A, A, B], so TokenFlowChart double
  // counts token usage (and the duplication grows with every live event).
  it.failing('passes each live event to the token flow chart once', async () => {
    const telemetry = mockTelemetry(
      { sessions: [makeSession()] },
      { sessionEvents: [tokenUsage(1, 1)] }
    );
    useTelemetryMock.mockReturnValue(telemetry);
    const { rerender } = render(<DashboardPage />);
    await act(async () => {});

    const a = tokenUsage(10, 10);
    const b = tokenUsage(20, 20);
    useTelemetryMock.mockReturnValue({ ...telemetry, events: [a] });
    rerender(<DashboardPage />);
    useTelemetryMock.mockReturnValue({ ...telemetry, events: [a, b] });
    rerender(<DashboardPage />);
    await act(async () => {});

    const lastEvents = tokenFlowMock.mock.calls.at(-1)![0].events as { id: string }[];
    const ids = lastEvents.map((e) => e.id);
    expect(ids).toHaveLength(new Set(ids).size);
  });
});
