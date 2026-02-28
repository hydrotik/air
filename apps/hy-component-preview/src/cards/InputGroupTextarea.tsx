import React from 'react';
import {
  Textarea, Button,
  InputGroup, InputGroupToolbar, inputGroupInputClass,
} from '@hydrotik/design-system';
import { Play, Copy } from 'lucide-react';

/** Code editor textarea — matches shadcn input-group-textarea.tsx */
export function InputGroupTextarea() {
  return (
    <InputGroup column>
      <Textarea
        rows={3}
        defaultValue={`console.log("Hello, world!");`}
        className={inputGroupInputClass}
        style={{
          resize: 'none',
          fontFamily: 'var(--font-mono, monospace)', fontSize: '13px',
        }}
      />
      <InputGroupToolbar>
        <span>Line 1, Column 1</span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" size="icon-sm" aria-label="Run">
          <Play size={12} />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Copy">
          <Copy size={12} />
        </Button>
        <span style={{ fontSize: '11px', opacity: 0.6 }}>script.js</span>
      </InputGroupToolbar>
    </InputGroup>
  );
}
