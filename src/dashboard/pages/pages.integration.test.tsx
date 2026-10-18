import { act, render, screen } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import { CompactDashboardPage } from './CompactDashboardPage';
import { MockWebSocket, callsTo, installFetch } from '../__testing__/mockWebSocket';
import { makeSession } from '../__testing__/fixtures';

/** Pages wired to the real useTelemetry, over a mocked WebSocket and fetch. */

const realFetch = globalThis.fetch;
const realWebSocket = globalThis.WebSocket;
const COST_URL = '/api/sessions/s1/cost';

beforeEach(() => {
  MockWebSocket.instances = [];
  (globalThis as any).WebSocket = MockWebSocket;
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  (globalThis as any).fetch = realFetch;
  (globalThis as any).WebSocket = realWebSocket;
});

const settle = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 50)));

function serve() {
  return installFetch({
    '/api/sessions': [makeSession()],
    '/api/config': { redactionLevel: 'full' },
    [COST_URL]: [],
  });
}

describe('DashboardPage + useTelemetry', () => {
  it('loads the session once and reflects server config and connection', async () => {
    const fetchMock = serve();
    render(<DashboardPage />);
    await settle();
    act(() => MockWebSocket.latest().open());

    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('1 session')).toBeInTheDocument();
    expect(screen.getByTitle('Data redaction: full')).toHaveTextContent('FULL');
    expect(callsTo(fetchMock, COST_URL)).toBe(1);
  });
});

describe('CompactDashboardPage + useTelemetry', () => {
  // Waits without act(): act() waits for React to go idle, which never happens while
  // the page is stuck in the loop described below.
  async function renderAndWatch(ms: number) {
    const g = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previous = g.IS_REACT_ACT_ENVIRONMENT;
    g.IS_REACT_ACT_ENVIRONMENT = false;
    const view = render(<CompactDashboardPage />);
    try {
      await new Promise((resolve) => setTimeout(resolve, ms));
      return view;
    } finally {
      view.unmount();
      g.IS_REACT_ACT_ENVIRONMENT = previous;
    }
  }

  it('renders live session data', async () => {
    serve();
    const g = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    g.IS_REACT_ACT_ENVIRONMENT = false;
    try {
      render(<CompactDashboardPage />);
      expect(await screen.findByText('1 session')).toBeInTheDocument();
      expect((await screen.findAllByText('anthropic/sonnet-4')).length).toBeGreaterThan(0);
    } finally {
      g.IS_REACT_ACT_ENVIRONMENT = true;
    }
  });

  // BUG: CompactDashboardPage lists the whole `telemetry` object as an effect dependency.
  // useTelemetry returns a fresh object every render, so the "load all session data" effect
  // re-runs after every render; each fetch resolves into setState, which re-renders and
  // fetches again: an unbounded request loop (~14 requests per cycle) for as long as the
  // page is open. DashboardPage destructures the stable callbacks and does not loop (above).
  it.failing('fetches each session endpoint a bounded number of times', async () => {
    const fetchMock = serve();
    await renderAndWatch(100);
    expect(callsTo(fetchMock, COST_URL)).toBeLessThanOrEqual(1);
  });

  it('documents the size of the refetch loop', async () => {
    const fetchMock = serve();
    await renderAndWatch(100);
    // Remove this test (and flip the it.failing above) once the loop is fixed.
    expect(callsTo(fetchMock, COST_URL)).toBeGreaterThan(5);
  });
});
