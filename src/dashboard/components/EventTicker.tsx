import React, { useEffect, useRef, useState } from 'react';
import type { TelemetryEvent } from '../../shared/events';
import { tickerContainer, tickerItem, tickerItemEnter, tickerItemExit } from '../compact.css';

// ─── Constants ────────────────────────────────────────────────────────────

const KEY_TYPES = new Set(['tool_call_end', 'compaction']);

const TYPE_COLORS: Record<string, string> = {
  tool_call_end: '#10b981',
  compaction: '#ef4444',
  error: '#ef4444',
};

const TYPE_LABELS: Record<string, string> = {
  tool_call_end: 'TOOL',
  compaction: 'COMPACT',
  error: 'ERROR',
};

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function getTickerSummary(event: TelemetryEvent): string {
  const e = event as any;
  switch (event.type) {
    case 'tool_call_end':
      if (e.isError) {
        return `${e.toolName ?? 'unknown'} ✗ failed`;
      }
      return `${e.toolName ?? 'unknown'} ✓ ${e.durationMs ?? 0}ms`;
    case 'compaction':
      return `${formatTokens(e.tokensBefore ?? 0)} tokens → summary`;
    default:
      return event.type;
  }
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function isKeyEvent(e: TelemetryEvent): boolean {
  if (KEY_TYPES.has(e.type)) return true;
  if ((e as any).isError) return true;
  return false;
}

function getTypeInfo(event: TelemetryEvent): { label: string; color: string } {
  const e = event as any;
  if (e.isError) return { label: 'ERROR', color: TYPE_COLORS.error! };
  return {
    label: TYPE_LABELS[event.type] ?? event.type.toUpperCase(),
    color: TYPE_COLORS[event.type] ?? '#64748b',
  };
}

// ─── Ticker Content ───────────────────────────────────────────────────────

const TickerContent: React.FC<{ event: TelemetryEvent }> = ({ event }) => {
  const { label, color } = getTypeInfo(event);

  return (
    <>
      <span
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 9,
          width: 55,
          flexShrink: 0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatTime(event.timestamp)}
      </span>
      <span
        style={{
          background: `${color}20`,
          color,
          fontSize: 8,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
          padding: '1px 5px',
          borderRadius: 3,
          lineHeight: 1.3,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: 'rgba(255,255,255,0.6)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          fontSize: 10,
        }}
      >
        {getTickerSummary(event)}
      </span>
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────

interface Props {
  events: TelemetryEvent[];
}

export const EventTicker: React.FC<Props> = ({ events }) => {
  const [currentEvent, setCurrentEvent] = useState<TelemetryEvent | null>(null);
  const [prevEvent, setPrevEvent] = useState<TelemetryEvent | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const lastEventIdRef = useRef<string | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Find latest key event
    const keyEvents = events.filter(isKeyEvent);
    if (keyEvents.length === 0) return;

    const latest = keyEvents[keyEvents.length - 1];
    if (!latest || latest.id === lastEventIdRef.current) return;

    lastEventIdRef.current = latest.id;

    // Trigger animation
    setPrevEvent(currentEvent);
    setCurrentEvent(latest);
    setAnimKey((k) => k + 1);

    // Clear prev after animation completes
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => setPrevEvent(null), 300);

    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [events]); // currentEvent intentionally excluded to prevent infinite loop

  return (
    <div className={tickerContainer}>
      {/* Exiting event */}
      {prevEvent && (
        <div key={`exit-${animKey}`} className={`${tickerItem} ${tickerItemExit}`}>
          <TickerContent event={prevEvent} />
        </div>
      )}
      {/* Entering event */}
      {currentEvent && (
        <div key={`enter-${animKey}`} className={`${tickerItem} ${tickerItemEnter}`}>
          <TickerContent event={currentEvent} />
        </div>
      )}
      {/* Empty state */}
      {!currentEvent && (
        <div className={tickerItem} style={{ opacity: 0.3 }}>
          Waiting for events…
        </div>
      )}
    </div>
  );
};
