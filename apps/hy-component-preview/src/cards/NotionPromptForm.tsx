import React from 'react';
import {
  Textarea, Button, Badge,
  InputGroup, InputGroupToolbar, inputGroupInputClass,
} from '@hydrotik/design-system';
import { IconPaperclip, IconArrowUp, IconPlus, IconWorld } from '@tabler/icons-react';

/** Simplified prompt form — inspired by shadcn notion-prompt-form.tsx */
export function NotionPromptForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>Prompt</div>

      {/* Textarea with toolbar */}
      <InputGroup column>
        <Textarea
          placeholder="Add context"
          rows={3}
          className={inputGroupInputClass}
          style={{ resize: 'none' }}
        />
        <InputGroupToolbar>
          <Button variant="ghost" size="icon-sm" aria-label="Mention">
            <IconPlus size={14} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Attach file">
            <IconPaperclip size={14} />
          </Button>
          <div style={{ flex: 1 }} />
          <Badge variant="secondary">Auto</Badge>
          <Badge variant="outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <IconWorld size={12} /> All Sources
          </Badge>
          <Button size="icon-sm" aria-label="Send">
            <IconArrowUp size={14} />
          </Button>
        </InputGroupToolbar>
      </InputGroup>
    </div>
  );
}
