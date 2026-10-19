import React, { useEffect, useMemo, useState } from 'react';
import type { TelemetryEvent } from '@hydrotik/air';
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

function hasError(event: TelemetryEvent): boolean {
  return 'isError' in event && event.isError === true;
}

function getTickerSummary(event: TelemetryEvent): string {
  switch (event.type) {
    case 'tool_call_end':
      if (event.isError) {
        return `${event.toolName ?? 'unknown'} ✗ failed`;
      }
      return `${event.toolName ?? 'unknown'} ✓ ${event.durationMs ?? 0}ms`;
    case 'compaction':
      return `${formatTokens(event.tokensBefore ?? 0)} tokens → summary`;
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
  if (hasError(e)) return true;
  return false;
}

function getTypeInfo(event: TelemetryEvent): { label: string; color: string } {
  if (hasError(event)) return { label: 'ERROR', color: TYPE_COLORS.error! };
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
  const latest = useMemo(() => {
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i];
      if (event && isKeyEvent(event)) return event;
    }
    return null;
  }, [events]);
  const [shown, setShown] = useState<{
    current: TelemetryEvent | null;
    prev: TelemetryEvent | null;
    animKey: number;
  }>({ current: null, prev: null, animKey: 0 });

  // A new key event slides in during render (no effect round-trip); the one it
  // replaces slides out.
  if (latest && latest.id !== shown.current?.id) {
    setShown({ current: latest, prev: shown.current, animKey: shown.animKey + 1 });
  }

  // Clear the exiting event once its animation is done. Keyed on the exiting
  // event itself, so unrelated event updates cannot cancel the timer and leave
  // it on screen.
  useEffect(() => {
    if (!shown.prev) return;
    const timer = setTimeout(() => setShown((s) => ({ ...s, prev: null })), 300);
    return () => clearTimeout(timer);
  }, [shown.prev]);

  const { current: currentEvent, prev: prevEvent, animKey } = shown;

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
