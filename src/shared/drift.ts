/**
 * AIr Drift Detection
 *
 * Tracks rolling baselines for key metrics and emits DriftEvents
 * when current values deviate beyond configured thresholds.
 *
 * Runs server-side — no sensitive data involved, purely numeric analysis.
 */

import type { DriftEvent, TelemetryEvent, TokenUsageEvent, ToolCallEndEvent, LatencyEvent, CostEvent } from './events';

export interface DriftConfig {
  /** Minimum samples before drift detection activates (default: 10) */
  minSamples: number;
  /** Rolling window size for baseline computation (default: 50) */
  windowSize: number;
  /** Deviation thresholds (percentage) for each severity level */
  thresholds: {
    info: number;     // default: 25%
    warning: number;  // default: 50%
    critical: number; // default: 100%
  };
  /** Which metrics to monitor */
  metrics: Set<string>;
}

export const DEFAULT_DRIFT_CONFIG: DriftConfig = {
  minSamples: 10,
  windowSize: 50,
  thresholds: {
    info: 25,
    warning: 50,
    critical: 100,
  },
  metrics: new Set([
    'latency',
    'cost',
    'token_usage',
    'error_rate',
    'cache_hit_rate',
    'output_tokens',
  ]),
};

interface MetricWindow {
  values: number[];
  sum: number;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}

/**
 * Drift detector that tracks metric baselines and emits events on deviation.
 */
export class DriftDetector {
  private windows = new Map<string, MetricWindow>();
  private config: DriftConfig;

  constructor(config?: Partial<DriftConfig>) {
    this.config = { ...DEFAULT_DRIFT_CONFIG, ...config };
  }

  /**
   * Feed an event and get back any drift alerts.
   * Returns empty array if no drift detected.
   */
  checkEvent(event: TelemetryEvent): DriftEvent[] {
    const drifts: DriftEvent[] = [];

    switch (event.type) {
      case 'tool_call_end': {
        const e = event as ToolCallEndEvent;
        if (e.durationMs > 0 && this.config.metrics.has('latency')) {
          const d = this.check(`latency:${e.toolName}`, e.durationMs, event);
          if (d) { d.metric = 'latency'; drifts.push(d); }
        }
        if (this.config.metrics.has('error_rate')) {
          const d = this.check(`error_rate:${e.toolName}`, e.isError ? 1 : 0, event);
          if (d) { d.metric = 'error_rate'; drifts.push(d); }
        }
        break;
      }

      case 'token_usage': {
        const e = event as TokenUsageEvent;
        if (this.config.metrics.has('token_usage')) {
          const d = this.check(`token_usage:${e.model}`, e.totalTokens, event);
          if (d) { d.metric = 'token_usage'; drifts.push(d); }
        }
        if (this.config.metrics.has('output_tokens')) {
          const d = this.check(`output_tokens:${e.model}`, e.output, event);
          if (d) { d.metric = 'output_tokens'; drifts.push(d); }
        }
        if (this.config.metrics.has('cost') && e.cost?.total > 0) {
          const d = this.check(`cost:${e.model}`, e.cost.total, event);
          if (d) { d.metric = 'cost'; drifts.push(d); }
        }
        if (this.config.metrics.has('cache_hit_rate') && e.totalTokens > 0) {
          const rate = e.cacheRead / e.totalTokens;
          const d = this.check(`cache_hit_rate:${e.model}`, rate, event);
          if (d) { d.metric = 'cache_hit_rate'; drifts.push(d); }
        }
        break;
      }

      case 'latency': {
        const e = event as LatencyEvent;
        if (this.config.metrics.has('latency')) {
          const d = this.check(`latency:${e.operation}`, e.totalMs, event);
          if (d) { d.metric = 'latency'; drifts.push(d); }
        }
        break;
      }

      case 'cost': {
        const e = event as CostEvent;
        if (this.config.metrics.has('cost')) {
          const d = this.check(`cost:${e.model}`, e.totalCost, event);
          if (d) { d.metric = 'cost'; drifts.push(d); }
        }
        break;
      }

      default:
        break;
    }

    return drifts;
  }

  /**
   * Check a single metric value against its rolling baseline.
   */
  private check(key: string, value: number, sourceEvent: TelemetryEvent): DriftEvent | null {
    let window = this.windows.get(key);
    if (!window) {
      window = { values: [], sum: 0 };
      this.windows.set(key, window);
    }

    // Add value to window
    window.values.push(value);
    window.sum += value;

    // Trim to window size
    while (window.values.length > this.config.windowSize) {
      window.sum -= window.values.shift()!;
    }

    // Need minimum samples before detecting drift
    if (window.values.length < this.config.minSamples) return null;

    const baseline = window.sum / window.values.length;
    if (baseline === 0) return null;

    const deviationPct = ((value - baseline) / baseline) * 100;
    const absDeviation = Math.abs(deviationPct);

    // Determine severity
    let severity: 'info' | 'warning' | 'critical';
    if (absDeviation >= this.config.thresholds.critical) {
      severity = 'critical';
    } else if (absDeviation >= this.config.thresholds.warning) {
      severity = 'warning';
    } else if (absDeviation >= this.config.thresholds.info) {
      severity = 'info';
    } else {
      return null; // Below threshold
    }

    const [metric, context] = key.split(':');

    return {
      id: uid(),
      sessionId: sourceEvent.sessionId,
      timestamp: Date.now(),
      type: 'drift',
      metric: metric ?? key,
      model: (sourceEvent as any).model ?? context ?? 'unknown',
      provider: (sourceEvent as any).provider ?? 'unknown',
      baseline: Math.round(baseline * 1000) / 1000,
      current: Math.round(value * 1000) / 1000,
      deviationPct: Math.round(deviationPct * 10) / 10,
      direction: deviationPct > 0 ? 'increase' : 'decrease',
      severity,
      windowSize: window.values.length,
      threshold: this.config.thresholds[severity],
    };
  }

  /** Reset all baselines */
  reset(): void {
    this.windows.clear();
  }
}
