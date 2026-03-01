import React from 'react';
import type { SessionSummary } from '../../shared/events';
import { sessionList, sessionItem, sessionItemActive } from '../dashboard.css';

interface Props {
  sessions: SessionSummary[];
  activeSessionId: string | null;
  onSelect: (sessionId: string) => void;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function formatCwd(cwd: string): string {
  const parts = cwd.split('/');
  return parts.slice(-2).join('/');
}

const AGENT_BADGE: Record<string, { label: string; color: string }> = {
  pi: { label: 'π', color: '#a855f7' },
  'claude-code': { label: 'CC', color: '#f97316' },
  codex: { label: 'CX', color: '#3b82f6' },
  sdk: { label: 'SDK', color: '#10b981' },
  unknown: { label: '?', color: '#64748b' },
};

const font = "'JetBrains Mono', monospace";

export const SessionSelector: React.FC<Props> = ({ sessions, activeSessionId, onSelect }) => (
  <div className={sessionList}>
    {sessions.length === 0 ? (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: font, fontSize: 11 }}>
        No sessions recorded
      </div>
    ) : (
      sessions.map((s) => {
        const badge = AGENT_BADGE[s.agent] ?? AGENT_BADGE.unknown;
        return (
          <div
            key={s.sessionId}
            className={`${sessionItem} ${s.sessionId === activeSessionId ? sessionItemActive : ''}`}
            onClick={() => onSelect(s.sessionId)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Agent badge */}
              <span style={{
                fontFamily: font, fontSize: 8, fontWeight: 700,
                color: badge.color, background: `${badge.color}15`,
                border: `1px solid ${badge.color}30`,
                padding: '1px 4px', borderRadius: 3,
                textTransform: 'uppercase', letterSpacing: '0.3px',
                lineHeight: 1.3, flexShrink: 0,
              }}>
                {badge.label}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: font, fontSize: 11, fontWeight: 600 }}>
                  {s.provider}/{s.model}
                </span>
                <span style={{ fontFamily: font, fontSize: 10, opacity: 0.5 }}>
                  {formatCwd(s.cwd)}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <span style={{ fontFamily: font, fontSize: 10, opacity: 0.6 }}>
                {timeAgo(s.lastEventTime)}
              </span>
              <span style={{ fontFamily: font, fontSize: 10, opacity: 0.4 }}>
                {s.turnCount} turns · {s.toolCallCount} tools
                {s.totalCost > 0 && ` · $${s.totalCost.toFixed(3)}`}
              </span>
            </div>
          </div>
        );
      })
    )}
  </div>
);
