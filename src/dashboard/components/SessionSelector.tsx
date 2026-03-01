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

export const SessionSelector: React.FC<Props> = ({ sessions, activeSessionId, onSelect }) => (
  <div className={sessionList}>
    {sessions.length === 0 ? (
      <div style={{ padding: 16, textAlign: 'center', opacity: 0.4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
        No sessions recorded
      </div>
    ) : (
      sessions.map((s) => (
        <div
          key={s.sessionId}
          className={`${sessionItem} ${s.sessionId === activeSessionId ? sessionItemActive : ''}`}
          onClick={() => onSelect(s.sessionId)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600 }}>
              {s.provider}/{s.model}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.5 }}>
              {formatCwd(s.cwd)}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.6 }}>
              {timeAgo(s.lastEventTime)}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.4 }}>
              {s.turnCount} turns · {s.toolCallCount} tools
            </span>
          </div>
        </div>
      ))
    )}
  </div>
);
