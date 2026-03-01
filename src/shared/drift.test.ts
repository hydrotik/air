import { DriftDetector, DEFAULT_DRIFT_CONFIG } from './drift';
import type { ToolCallEndEvent, TokenUsageEvent, LatencyEvent } from './events';

function makeToolCallEnd(overrides: Partial<ToolCallEndEvent> = {}): ToolCallEndEvent {
  return {
    id: 'e-1',
    sessionId: 's-1',
    timestamp: Date.now(),
    type: 'tool_call_end',
    toolName: 'read',
    toolCallId: 'c-1',
    durationMs: 50,
    outputSizeBytes: 100,
    outputPreview: '',
    isError: false,
    ...overrides,
  };
}

function makeTokenUsage(overrides: Partial<TokenUsageEvent> = {}): TokenUsageEvent {
  return {
    id: 'e-1',
    sessionId: 's-1',
    timestamp: Date.now(),
    type: 'token_usage',
    input: 1000,
    output: 500,
    cacheRead: 200,
    cacheWrite: 0,
    totalTokens: 1700,
    cost: { input: 0.003, output: 0.0075, cacheRead: 0.0002, cacheWrite: 0, total: 0.0107 },
    model: 'gpt-4o',
    provider: 'openai',
    ...overrides,
  };
}

describe('DriftDetector', () => {
  it('does not detect drift below minSamples', () => {
    const detector = new DriftDetector({ minSamples: 10 });
    // Feed 9 events — should never trigger
    for (let i = 0; i < 9; i++) {
      const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 50 }));
      expect(drifts).toHaveLength(0);
    }
  });

  it('does not detect drift for stable values', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 20; i++) {
      const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 50 }));
      expect(drifts).toHaveLength(0);
    }
  });

  it('detects drift when value spikes', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    // Build baseline
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 50 }));
    }
    // Spike — 4x the baseline should be critical (200% deviation)
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 200 }));
    expect(drifts.length).toBeGreaterThan(0);
    expect(drifts[0].direction).toBe('increase');
    expect(drifts[0].severity).toBe('critical');
    expect(drifts[0].metric).toBe('latency');
  });

  it('detects warning-level drift', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 100 }));
    }
    // 60% increase — should be warning (50-100%)
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 160 }));
    expect(drifts.length).toBeGreaterThan(0);
    const latencyDrift = drifts.find(d => d.metric === 'latency');
    expect(latencyDrift?.severity).toBe('warning');
  });

  it('detects info-level drift', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 100 }));
    }
    // 30% increase — should be info (25-50%)
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 130 }));
    expect(drifts.length).toBeGreaterThan(0);
    const latencyDrift = drifts.find(d => d.metric === 'latency');
    expect(latencyDrift?.severity).toBe('info');
  });

  it('detects token_usage drift', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeTokenUsage({ totalTokens: 1000 }));
    }
    const drifts = detector.checkEvent(makeTokenUsage({ totalTokens: 5000 }));
    expect(drifts.length).toBeGreaterThan(0);
    expect(drifts.some(d => d.metric === 'token_usage')).toBe(true);
  });

  it('detects cost drift', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeTokenUsage({
        cost: { input: 0.01, output: 0.01, cacheRead: 0, cacheWrite: 0, total: 0.02 },
      }));
    }
    const drifts = detector.checkEvent(makeTokenUsage({
      cost: { input: 0.05, output: 0.05, cacheRead: 0, cacheWrite: 0, total: 0.10 },
    }));
    expect(drifts.some(d => d.metric === 'cost')).toBe(true);
  });

  it('respects custom thresholds', () => {
    const detector = new DriftDetector({
      minSamples: 5,
      windowSize: 10,
      thresholds: { info: 10, warning: 20, critical: 50 },
    });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 100 }));
    }
    // 15% increase — info under custom thresholds
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 115 }));
    expect(drifts.length).toBeGreaterThan(0);
    expect(drifts[0].severity).toBe('info');
  });

  it('reset clears all baselines', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 50 }));
    }
    detector.reset();
    // After reset, same spike shouldn't trigger (not enough samples)
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 200 }));
    expect(drifts).toHaveLength(0);
  });

  it('drift event has correct structure', () => {
    const detector = new DriftDetector({ minSamples: 5, windowSize: 10 });
    for (let i = 0; i < 10; i++) {
      detector.checkEvent(makeToolCallEnd({ durationMs: 50 }));
    }
    const drifts = detector.checkEvent(makeToolCallEnd({ durationMs: 200 }));
    expect(drifts.length).toBeGreaterThan(0);
    const drift = drifts[0];
    expect(drift.type).toBe('drift');
    expect(drift.sessionId).toBe('s-1');
    expect(drift.baseline).toBeGreaterThan(0);
    expect(drift.current).toBe(200);
    expect(drift.deviationPct).toBeGreaterThan(0);
    expect(drift.windowSize).toBeGreaterThan(0);
    expect(['info', 'warning', 'critical']).toContain(drift.severity);
    expect(['increase', 'decrease']).toContain(drift.direction);
  });

  it('ignores event types not monitored', () => {
    const detector = new DriftDetector({ minSamples: 5 });
    const event = {
      id: 'e-1',
      sessionId: 's-1',
      timestamp: Date.now(),
      type: 'session_start' as const,
      cwd: '/test',
      model: 'gpt-4o',
      provider: 'openai',
    };
    const drifts = detector.checkEvent(event);
    expect(drifts).toHaveLength(0);
  });
});

describe('DEFAULT_DRIFT_CONFIG', () => {
  it('has reasonable defaults', () => {
    expect(DEFAULT_DRIFT_CONFIG.minSamples).toBe(10);
    expect(DEFAULT_DRIFT_CONFIG.windowSize).toBe(50);
    expect(DEFAULT_DRIFT_CONFIG.thresholds.info).toBe(25);
    expect(DEFAULT_DRIFT_CONFIG.thresholds.warning).toBe(50);
    expect(DEFAULT_DRIFT_CONFIG.thresholds.critical).toBe(100);
  });

  it('monitors expected metrics', () => {
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('latency')).toBe(true);
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('cost')).toBe(true);
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('token_usage')).toBe(true);
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('output_tokens')).toBe(true);
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('error_rate')).toBe(true);
    expect(DEFAULT_DRIFT_CONFIG.metrics.has('cache_hit_rate')).toBe(true);
  });
});
