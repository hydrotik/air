/**
 * The collector's settings, read from the environment once when pi loads the extension.
 *
 *   AIR_URL        WebSocket endpoint (default: ws://localhost:<AIR_PORT>/ws/collector)
 *   AIR_PORT       server port, an integer 1–65535 (default: 5200)
 *   AIR_ENABLED    "false" turns the collector off
 *   AIR_AUTOSTART  "false" stops it from starting the server
 */

export const DEFAULT_AIR_PORT = 5200;

type Env = Record<string, string | undefined>;
type Warn = (message: string) => void;

export interface CollectorConfig {
  enabled: boolean;
  autoStart: boolean;
  port: number;
  url: string;
}

/**
 * The server port: `AIR_PORT` when it is an integer from 1 to 65535, else
 * {@link DEFAULT_AIR_PORT}. A value that is set but malformed (`''`, `52OO`, `0`, `70000`) is
 * reported through `warn` rather than turned into `ws://localhost:NaN`, which would fail every
 * connection without saying why.
 */
export function resolveAirPort(env: Env = process.env, warn: Warn = () => {}): number {
  const raw = env.AIR_PORT;
  if (raw === undefined) return DEFAULT_AIR_PORT;
  const value = raw.trim();
  const port = /^\d+$/.test(value) ? Number(value) : Number.NaN;
  if (Number.isInteger(port) && port >= 1 && port <= 65535) return port;
  warn(`AIR_PORT=${JSON.stringify(raw)} is not a port number (1-65535); using ${DEFAULT_AIR_PORT}`);
  return DEFAULT_AIR_PORT;
}

/** The collector WebSocket endpoint: `AIR_URL`, else the collector path on `port`. */
export function resolveAirUrl(port: number, env: Env = process.env): string {
  return env.AIR_URL || `ws://localhost:${port}/ws/collector`;
}

export function resolveConfig(env: Env = process.env, warn: Warn = () => {}): CollectorConfig {
  const enabled = env.AIR_ENABLED !== 'false';
  const port = enabled ? resolveAirPort(env, warn) : DEFAULT_AIR_PORT;
  return {
    enabled,
    autoStart: env.AIR_AUTOSTART !== 'false',
    port,
    url: resolveAirUrl(port, env),
  };
}
