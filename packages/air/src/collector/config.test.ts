import { DEFAULT_AIR_PORT, resolveAirPort, resolveAirUrl, resolveConfig } from './config';

describe('resolveAirPort', () => {
  it('defaults to 5200 without a warning', () => {
    const warn = jest.fn();
    expect(DEFAULT_AIR_PORT).toBe(5200);
    expect(resolveAirPort({}, warn)).toBe(5200);
    expect(warn).not.toHaveBeenCalled();
  });

  it('reads AIR_PORT, at either end of the range', () => {
    expect(resolveAirPort({ AIR_PORT: '5300' })).toBe(5300);
    expect(resolveAirPort({ AIR_PORT: ' 1 ' })).toBe(1);
    expect(resolveAirPort({ AIR_PORT: '65535' })).toBe(65535);
  });

  it.each(['', '52OO', '0', '65536', '-1', '5200.5', '1e3', 'abc'])(
    'falls back to 5200 with a warning for AIR_PORT=%j',
    (value) => {
      const warn = jest.fn();
      expect(resolveAirPort({ AIR_PORT: value }, warn)).toBe(5200);
      expect(warn).toHaveBeenCalledWith(
        `AIR_PORT=${JSON.stringify(value)} is not a port number (1-65535); using 5200`
      );
    }
  );

  it('warns nowhere unless asked to', () => {
    expect(resolveAirPort({ AIR_PORT: 'x' })).toBe(5200);
    expect(resolveConfig({ AIR_PORT: 'x' }).port).toBe(5200);
  });

  it('reads process.env by default', () => {
    process.env.AIR_PORT = '5400';
    try {
      expect(resolveAirPort()).toBe(5400);
      expect(resolveAirUrl(5400)).toBe('ws://localhost:5400/ws/collector');
      expect(resolveConfig().port).toBe(5400);
    } finally {
      delete process.env.AIR_PORT;
    }
  });
});

describe('resolveAirUrl', () => {
  it('derives the WebSocket URL from the port', () => {
    expect(resolveAirUrl(5300, {})).toBe('ws://localhost:5300/ws/collector');
  });

  it('lets AIR_URL override it; an empty AIR_URL does not', () => {
    expect(resolveAirUrl(5300, { AIR_URL: 'ws://example:1/x' })).toBe('ws://example:1/x');
    expect(resolveAirUrl(5300, { AIR_URL: '' })).toBe('ws://localhost:5300/ws/collector');
  });
});

describe('resolveConfig', () => {
  it('is enabled, auto-starting, on 5200 by default', () => {
    expect(resolveConfig({})).toEqual({
      enabled: true,
      autoStart: true,
      port: 5200,
      url: 'ws://localhost:5200/ws/collector',
    });
  });

  it('reads AIR_ENABLED and AIR_AUTOSTART', () => {
    expect(resolveConfig({ AIR_AUTOSTART: 'false' }).autoStart).toBe(false);
    expect(resolveConfig({ AIR_ENABLED: 'false' }).enabled).toBe(false);
  });

  it('does not warn about the port when disabled', () => {
    const warn = jest.fn();
    resolveConfig({ AIR_ENABLED: 'false', AIR_PORT: 'x' }, warn);
    expect(warn).not.toHaveBeenCalled();
  });
});
