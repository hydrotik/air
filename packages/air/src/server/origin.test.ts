import { isAllowedOrigin, parseOrigins } from './origin';

describe('isAllowedOrigin', () => {
  it('accepts requests without an Origin header (collectors, SDK, curl)', () => {
    expect(isAllowedOrigin(undefined, 'localhost:5200')).toBe(true);
    expect(isAllowedOrigin('', 'localhost:5200')).toBe(true);
  });

  it('accepts loopback origins on any port', () => {
    for (const o of [
      'http://localhost:5200',
      'http://localhost:5201',
      'http://127.0.0.1:9999',
      'http://[::1]:5200',
    ]) {
      expect(isAllowedOrigin(o, 'localhost:5200')).toBe(true);
    }
  });

  it('refuses other sites', () => {
    expect(isAllowedOrigin('https://evil.example', 'localhost:5200')).toBe(false);
    expect(isAllowedOrigin('http://192.168.1.20:5200', 'localhost:5200')).toBe(false);
  });

  it('refuses opaque, malformed and non-http origins', () => {
    expect(isAllowedOrigin('null', 'localhost:5200')).toBe(false);
    expect(isAllowedOrigin('not a url', 'localhost:5200')).toBe(false);
    expect(isAllowedOrigin('file:///tmp/x.html', 'localhost:5200')).toBe(false);
  });

  it('accepts the server itself reached by IP address', () => {
    expect(isAllowedOrigin('http://192.168.1.20:5200', '192.168.1.20:5200')).toBe(true);
    expect(isAllowedOrigin('http://[fe80::1]:5200', '[fe80::1]:5200')).toBe(true);
  });

  it('refuses a same-host match by name (DNS rebinding)', () => {
    expect(isAllowedOrigin('http://rebind.example:5200', 'rebind.example:5200')).toBe(false);
  });

  it('accepts listed origins', () => {
    expect(
      isAllowedOrigin('https://dash.example', 'localhost:5200', ['https://dash.example'])
    ).toBe(true);
    expect(
      isAllowedOrigin('https://dash.example:8443', 'localhost:5200', ['https://dash.example'])
    ).toBe(false);
  });
});

describe('parseOrigins', () => {
  it('splits, trims and normalises to scheme://host[:port]', () => {
    expect(parseOrigins(' https://a.example/path ,http://b.example:8080,')).toEqual([
      'https://a.example',
      'http://b.example:8080',
    ]);
  });

  it('returns nothing for an empty value', () => {
    expect(parseOrigins(undefined)).toEqual([]);
    expect(parseOrigins('')).toEqual([]);
  });

  it('throws on a value that is not a URL', () => {
    expect(() => parseOrigins('nope')).toThrow('Invalid URL');
  });
});
