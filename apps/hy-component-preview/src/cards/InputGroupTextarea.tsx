import React from 'react';
import { Textarea, Button } from '@hydrotik/design-system';
import { Play, Copy } from 'lucide-react';
import * as s from '../App.css';

/** Code editor textarea — matches shadcn input-group-textarea.tsx */
export function InputGroupTextarea() {
  return (
    <div className={s.fieldContainer}>
      <Textarea
        rows={3}
        defaultValue={`console.log("Hello, world!");`}
        style={{
          border: 'none', borderRadius: 0, resize: 'none',
          fontFamily: 'var(--font-mono, monospace)', fontSize: '13px',
        }}
      />
      <div className={s.fieldToolbar}>
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
