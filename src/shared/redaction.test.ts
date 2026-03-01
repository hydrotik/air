import { redactEvent, parseRedactionLevel, createRedactionConfig } from './redaction';
import type { TelemetryEvent, RedactionConfig } from './events';

function makeToolEvent(overrides: Partial<any> = {}): TelemetryEvent {
  return {
    id: 'test-1',
    sessionId: 'session-1',
    timestamp: Date.now(),
    type: 'tool_call_start',
    toolName: 'read',
    toolCallId: 'call-1',
    inputSizeBytes: 100,
    inputPreview: 'read file /etc/passwd with key sk-abc123456789012345678',
    ...overrides,
  } as TelemetryEvent;
}

describe('redactEvent', () => {
  describe('level=none', () => {
    const config: RedactionConfig = { level: 'none' };

    it('passes through event unchanged', () => {
      const event = makeToolEvent();
      const result = redactEvent(event, config);
      expect(result).toEqual(event);
    });
  });

  describe('level=preview', () => {
    const config: RedactionConfig = { level: 'preview' };

    it('truncates content fields to 50 chars', () => {
      const longInput = 'a'.repeat(100);
      const event = makeToolEvent({ inputPreview: longInput });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview.length).toBeLessThanOrEqual(52); // 50 + ellipsis
    });

    it('redacts API keys', () => {
      const event = makeToolEvent({
        inputPreview: 'using key sk-abc123456789012345678',
      });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toContain('[REDACTED]');
      expect(result.inputPreview).not.toContain('sk-abc');
    });

    it('redacts email addresses', () => {
      const event = makeToolEvent({
        inputPreview: 'contact user@example.com please',
      });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toContain('[REDACTED]');
      expect(result.inputPreview).not.toContain('user@example.com');
    });

    it('redacts JWT tokens', () => {
      // JWT short enough to survive 50-char truncation
      const jwt = 'token eyJhbGciOiJIUz.eyJzdWIiOiIxMjM.SflKxwRJSMe';
      const event = makeToolEvent({ inputPreview: jwt });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toContain('[REDACTED]');
    });

    it('redacts AWS keys', () => {
      const event = makeToolEvent({
        inputPreview: 'key is AKIAIOSFODNN7EXAMPLE',
      });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toContain('[REDACTED]');
    });

    it('does not redact non-content fields', () => {
      const event = makeToolEvent();
      const result = redactEvent(event, config) as any;
      expect(result.toolName).toBe('read');
      expect(result.toolCallId).toBe('call-1');
      expect(result.inputSizeBytes).toBe(100);
    });

    it('does not mutate the original event', () => {
      const event = makeToolEvent({ inputPreview: 'sk-abc123456789012345678901234' });
      const original = JSON.parse(JSON.stringify(event));
      redactEvent(event, config);
      expect(event).toEqual(original);
    });
  });

  describe('level=full', () => {
    const config: RedactionConfig = { level: 'full' };

    it('replaces all content fields with [REDACTED]', () => {
      const event = makeToolEvent({
        inputPreview: 'some sensitive data',
      });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toBe('[REDACTED]');
    });

    it('strips metadata objects', () => {
      const event = {
        ...makeToolEvent(),
        type: 'custom',
        provider: 'test',
        eventName: 'test',
        data: { secret: 'value' },
      } as TelemetryEvent;
      const result = redactEvent(event, config) as any;
      expect(result.data).toBeUndefined();
    });

    it('preserves numeric metadata', () => {
      const event = makeToolEvent();
      const result = redactEvent(event, config) as any;
      expect(result.inputSizeBytes).toBe(100);
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('custom patterns', () => {
    it('applies custom regex patterns', () => {
      const config: RedactionConfig = {
        level: 'preview',
        customPatterns: [/project-[a-z]+/gi],
      };
      const event = makeToolEvent({
        inputPreview: 'working on project-secret',
      });
      const result = redactEvent(event, config) as any;
      expect(result.inputPreview).toContain('[REDACTED]');
    });
  });

  describe('stripFields', () => {
    it('strips custom fields at any level', () => {
      const config: RedactionConfig = {
        level: 'preview',
        stripFields: ['toolCallId'],
      };
      const event = makeToolEvent();
      const result = redactEvent(event, config) as any;
      expect(result.toolCallId).toBeUndefined();
    });
  });
});

describe('parseRedactionLevel', () => {
  it('returns "preview" for undefined', () => {
    expect(parseRedactionLevel(undefined)).toBe('preview');
  });

  it('returns "none" for "none"', () => {
    expect(parseRedactionLevel('none')).toBe('none');
  });

  it('returns "full" for "full"', () => {
    expect(parseRedactionLevel('full')).toBe('full');
  });

  it('returns "preview" for invalid values', () => {
    expect(parseRedactionLevel('invalid')).toBe('preview');
    expect(parseRedactionLevel('')).toBe('preview');
  });
});
