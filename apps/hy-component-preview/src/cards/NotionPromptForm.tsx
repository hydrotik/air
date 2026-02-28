import React from 'react';
import { Textarea, Button, Badge } from '@hydrotik/design-system';
import { Paperclip, ArrowUp, Plus, Globe } from 'lucide-react';

/** Simplified prompt form — inspired by shadcn notion-prompt-form.tsx */
export function NotionPromptForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label style={{ fontSize: '14px', fontWeight: 600 }}>Prompt</Label>

      {/* Textarea with toolbar */}
      <div style={{
        borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}>
        <Textarea
          placeholder="Add context"
          rows={3}
          style={{ border: 'none', borderRadius: '8px 8px 0 0', resize: 'none' }}
        />
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px', padding: '8px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Button variant="ghost" size="icon-sm" aria-label="Mention">
            <Plus size={14} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Attach file">
            <Paperclip size={14} />
          </Button>
          <div style={{ flex: 1 }} />
          <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            Auto
          </Badge>
          <Badge variant="outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={12} /> All Sources
          </Badge>
          <Button size="icon-sm" aria-label="Send">
            <ArrowUp size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Label({ children, style: s }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={s}>{children}</div>;
}
