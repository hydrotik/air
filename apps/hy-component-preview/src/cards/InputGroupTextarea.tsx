import React from 'react';
import { Textarea, Button, Kbd } from '@hydrotik/design-system';
import { Play, Copy, RotateCcw } from 'lucide-react';

/** Code editor textarea — matches shadcn input-group-textarea.tsx */
export function InputGroupTextarea() {
  return (
    <div style={{
      borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
      overflow: 'hidden',
    }}>
      <Textarea
        rows={3}
        defaultValue={`console.log("Hello, world!");`}
        style={{
          border: 'none', borderRadius: '0', resize: 'none',
          fontFamily: 'var(--font-mono, monospace)', fontSize: '13px',
        }}
      />
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 8px',
        borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '12px', opacity: 0.5,
      }}>
        <span>Line 1, Column 1</span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" size="icon-sm" aria-label="Run">
          <Play size={12} />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Copy">
          <Copy size={12} />
        </Button>
        <span style={{ fontSize: '11px', opacity: 0.6 }}>script.js</span>
      </div>
    </div>
  );
}
