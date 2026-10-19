/**
 * cli.ts runs on import: it parses process.argv, calls createServer and listens.
 * The server and config modules are mocked (cli imports them with `.js`
 * specifiers, hence the virtual mocks), so nothing binds a port.
 */

const mockListen = jest.fn();
const mockCreateServer = jest.fn();
const mockLoadConfig = jest.fn();

jest.mock('./index.js', () => ({ createServer: mockCreateServer }), { virtual: true });
jest.mock('../shared/config.js', () => ({ loadConfig: mockLoadConfig }), { virtual: true });
jest.mock('./origin.js', () => jest.requireActual('./origin'), { virtual: true });

const originalArgv = process.argv;
let logSpy: jest.SpyInstance;
let errorSpy: jest.SpyInstance;
let exitSpy: jest.SpyInstance;

/** Import the CLI with the given flags and let its async main() settle */
async function runCli(flags: string[] = []) {
  process.argv = ['node', 'air', ...flags];
  jest.isolateModules(() => {
    require('./cli');
  });
  for (let i = 0; i < 10; i++) await new Promise((r) => setImmediate(r));
}

const banner = () => logSpy.mock.calls.map((c) => String(c[0])).join('\n');

beforeEach(() => {
  mockListen.mockReset().mockResolvedValue(undefined);
  mockCreateServer.mockReset().mockResolvedValue({ app: { listen: mockListen }, port: 0 });
  mockLoadConfig.mockReset().mockReturnValue({});
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  exitSpy = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
  delete process.env.AIR_REDACTION_LEVEL;
});

afterEach(() => {
  process.argv = originalArgv;
  delete process.env.AIR_REDACTION_LEVEL;
  jest.restoreAllMocks();
});

describe('air CLI', () => {
  it('starts on port 5200, loopback only, preview redaction by default', async () => {
    await runCli();
    expect(mockCreateServer).toHaveBeenCalledWith(5200, {
      redaction: { level: 'preview' },
      config: {},
      allowedOrigins: [],
    });
    expect(mockListen).toHaveBeenCalledWith({ port: 5200, host: '127.0.0.1' });
    expect(banner()).not.toContain('Listening:');
    expect(banner()).toContain('Dashboard:  http://localhost:5200');
    expect(banner()).toContain('Collector:  ws://localhost:5200/ws/collector');
    expect(banner()).toContain('PREVIEW');
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('honours --port, --host and --redaction', async () => {
    await runCli(['--port', '8080', '--host', '0.0.0.0', '--redaction', 'full']);
    expect(mockCreateServer).toHaveBeenCalledWith(8080, {
      redaction: { level: 'full' },
      config: {},
      allowedOrigins: [],
    });
    expect(mockListen).toHaveBeenCalledWith({ port: 8080, host: '0.0.0.0' });
    expect(banner()).toContain(
      'Listening:  0.0.0.0:8080 (other machines can connect; no authentication)'
    );
    expect(banner()).toContain('http://localhost:8080/api/health');
    expect(banner()).toContain('FULL (all content stripped)');
  });

  it('labels redaction "none" as development only', async () => {
    await runCli(['--redaction', 'none']);
    expect(banner()).toContain('NONE (development only');
  });

  it('ignores a flag given without a value', async () => {
    await runCli(['--port']);
    expect(mockCreateServer).toHaveBeenCalledWith(5200, expect.anything());
  });

  it('takes port and redaction from the config file when no flag is given', async () => {
    const config = { port: 7000, redaction: 'full' as const };
    mockLoadConfig.mockReturnValue(config);
    await runCli();
    expect(mockCreateServer).toHaveBeenCalledWith(7000, {
      redaction: { level: 'full' },
      config,
      allowedOrigins: [],
    });
  });

  it('takes the host from the config file when no flag is given', async () => {
    mockLoadConfig.mockReturnValue({ host: '0.0.0.0' });
    await runCli();
    expect(mockListen).toHaveBeenCalledWith({ port: 5200, host: '0.0.0.0' });
  });

  it('passes --allow-origin values on as origins', async () => {
    await runCli(['--allow-origin', 'https://a.example/x, http://b.example:8080']);
    expect(mockCreateServer.mock.calls[0][1].allowedOrigins).toEqual([
      'https://a.example',
      'http://b.example:8080',
    ]);
  });

  it('ranks redaction sources: flag > AIR_REDACTION_LEVEL > config file', async () => {
    mockLoadConfig.mockReturnValue({ redaction: 'full' });
    process.env.AIR_REDACTION_LEVEL = 'none';
    await runCli();
    expect(mockCreateServer.mock.calls[0][1].redaction).toEqual({ level: 'none' });

    mockCreateServer.mockClear();
    await runCli(['--redaction', 'preview']);
    expect(mockCreateServer.mock.calls[0][1].redaction).toEqual({ level: 'preview' });
  });

  it('lists configured providers and the budget in the banner', async () => {
    mockLoadConfig.mockReturnValue({
      providers: {
        rag: [
          { name: 'kb', type: 'q' },
          { name: 'docs', type: 'p' },
        ],
        mcp: [{ name: 'm1' }],
      },
      budgetLimit: 10,
    });
    await runCli();
    expect(banner()).toMatch(/RAG:\s+kb, docs/);
    expect(banner()).toMatch(/MCP:\s+m1/);
    expect(banner()).toMatch(/Budget:\s+\$10\.00/);
  });

  it('logs and exits with status 1 when the server cannot start', async () => {
    const err = new Error('EADDRINUSE');
    mockListen.mockRejectedValue(err);
    await runCli();
    expect(errorSpy).toHaveBeenCalledWith('Failed to start AIr:', err);
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  // BUG (server/cli.ts:31-36): the redaction level from --redaction or
  // AIR_REDACTION_LEVEL is cast, not validated. parseRedactionLevel() (used when
  // createServer builds its own config) maps unknown values to 'preview', but the
  // CLI passes e.g. 'ful' straight through, so /api/health and /api/config report
  // a level that does not exist while events are in fact redacted at 'preview'.
  it.failing('normalises an unknown redaction level to "preview"', async () => {
    await runCli(['--redaction', 'ful']);
    expect(mockCreateServer.mock.calls[0][1].redaction).toEqual({ level: 'preview' });
  });
});
