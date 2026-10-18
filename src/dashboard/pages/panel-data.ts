// Row shapes the dashboard pages hold in state, taken from the panels they feed so the
// two cannot drift apart. The fetch helpers in useTelemetry return the server's JSON.
import type { ComponentProps } from 'react';
import type { ContextSegment } from '../../shared/events';
import type { ActivitySparklines } from '../visualizations/ActivitySparklines';
import type { ContextUtilizationChart } from '../visualizations/ContextUtilizationChart';
import type { CostPanel } from '../visualizations/CostPanel';
import type { DriftPanel } from '../visualizations/DriftPanel';
import type { LatencyPanel } from '../visualizations/LatencyPanel';
import type { McpStatsPanel } from '../visualizations/McpStatsPanel';
import type { PromptPanel } from '../visualizations/PromptPanel';
import type { QualityPanel } from '../visualizations/QualityPanel';
import type { RagStatsPanel } from '../visualizations/RagStatsPanel';
import type { ToolWaterfall } from '../visualizations/ToolWaterfall';

export type ToolCallRow = ComponentProps<typeof ToolWaterfall>['toolCalls'][number];
export type ContextSnapshotRow = ComponentProps<
  typeof ContextUtilizationChart
>['snapshots'][number];
export type McpStatRow = ComponentProps<typeof McpStatsPanel>['stats'][number];
export type RagStatRow = ComponentProps<typeof RagStatsPanel>['stats'][number];
export type LatencyStatRow = ComponentProps<typeof LatencyPanel>['stats'][number];
export type LatencyPointRow = ComponentProps<typeof LatencyPanel>['timeseries'][number];
export type CostBreakdownRow = ComponentProps<typeof CostPanel>['breakdown'][number];
export type CostPointRow = ComponentProps<typeof CostPanel>['timeseries'][number];
export type EvalStatRow = ComponentProps<typeof QualityPanel>['stats'][number];
export type EvalPointRow = ComponentProps<typeof QualityPanel>['timeseries'][number];
export type PromptVariantRow = ComponentProps<typeof PromptPanel>['variants'][number];
export type DriftEventRow = ComponentProps<typeof DriftPanel>['events'][number];
export type DriftSummaryRow = ComponentProps<typeof DriftPanel>['summary'][number];
export type TimeseriesRow = ComponentProps<typeof ActivitySparklines>['toolTimeseries'][number];

export interface ContextBreakdown {
  segments: ContextSegment[];
  tokens_used: number;
  context_window: number;
}

/** The latest-breakdown endpoint, which has answered with either key for the segments. */
interface BreakdownResponse {
  breakdown?: ContextSegment[];
  segments?: ContextSegment[];
  tokens_used?: number;
  context_window?: number;
}

export function mapBreakdown(data: BreakdownResponse | null | undefined): ContextBreakdown | null {
  if (!data) return null;
  return {
    segments: data.breakdown ?? data.segments ?? [],
    tokens_used: data.tokens_used ?? 0,
    context_window: data.context_window ?? 200_000,
  };
}

/** Appends the events `prev` does not already hold (by id), keeping `prev` when none are new. */
export function appendNewEvents<T extends { id: string }>(prev: T[], incoming: T[]): T[] {
  const seen = new Set(prev.map((e) => e.id));
  const fresh = incoming.filter((e) => !seen.has(e.id));
  return fresh.length > 0 ? [...prev, ...fresh] : prev;
}

/**
 * Resolves a panel fetch into its state setter. The fetch helpers in useTelemetry already
 * turn network failures into empty fallbacks, so a rejection here is a bug in `apply` or in a
 * helper; it is logged rather than left unhandled. `isCurrent` drops a response that arrives
 * after the user has switched sessions, so one session's data never lands in another's panels.
 */
export function loadInto<T>(
  request: Promise<T>,
  apply: (value: T) => void,
  isCurrent: () => boolean = () => true
): void {
  request
    .then((value) => {
      if (isCurrent()) apply(value);
    })
    .catch((err: unknown) => {
      console.error('[AIr] Dashboard fetch failed', err);
    });
}
