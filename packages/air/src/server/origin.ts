/**
 * Which browser origins may call the AIr server.
 *
 * The server has no authentication, so a web page must not be able to read sessions or send
 * events. Browsers attach an `Origin` header to cross-origin requests and to every WebSocket
 * upgrade; collectors, the SDK and command-line clients do not. A request is accepted when:
 *
 * - it has no `Origin` header (not a browser page);
 * - its origin is on loopback (`localhost`, `127.0.0.1`, `[::1]`, any port): the dashboard, its
 *   dev server, or another local tool;
 * - its origin is the server itself reached by IP address (the `Host` header names the same
 *   host and port, as an IP literal). A host *name* is not enough: a page on another site can
 *   re-point its own name at this machine (DNS rebinding) and would pass that test;
 * - its origin is listed in `allowedOrigins` (`.air.json`) or `--allow-origin`.
 */

const LOOPBACK = new Set(['localhost', '127.0.0.1', '[::1]']);
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

function isIpLiteral(hostname: string): boolean {
  return IPV4.test(hostname) || (hostname.startsWith('[') && hostname.endsWith(']'));
}

export function isAllowedOrigin(
  origin: string | undefined,
  host: string | undefined,
  allowed: readonly string[] = []
): boolean {
  if (origin === undefined || origin === '') return true;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  if (allowed.includes(url.origin)) return true;
  if (LOOPBACK.has(url.hostname)) return true;
  return host !== undefined && url.host === host && isIpLiteral(url.hostname);
}

/** Parses a comma-separated `--allow-origin` value into origins (`scheme://host[:port]`). */
export function parseOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => new URL(s).origin);
}
