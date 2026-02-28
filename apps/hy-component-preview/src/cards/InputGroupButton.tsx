import React from 'react';
import { Input, Label, Button } from '@hydrotik/design-system';
import { Lock, Star } from 'lucide-react';

/** Input variants with secure indicator — matches shadcn input-group-button.tsx */
export function InputGroupButton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Label style={{ margin: 0, flex: 1 }}>Input</Label>
        <span style={{ fontSize: '12px', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Lock size={12} /> Secure
        </span>
      </div>

      {/* URL prefix input with star button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          fontSize: '13px', opacity: 0.5, padding: '0 10px', height: '32px',
          display: 'flex', alignItems: 'center',
          borderRadius: '6px 0 0 6px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none',
          whiteSpace: 'nowrap',
        }}>https://</span>
        <Input style={{ borderRadius: '0', flex: 1 }} />
        <Button
          variant="ghost"
          size="icon-sm"
          style={{ borderRadius: '0 6px 6px 0', border: '1px solid rgba(255,255,255,0.1)', borderLeft: 'none' }}
          aria-label="Favorite"
        >
          <Star size={14} />
        </Button>
      </div>
    </div>
  );
}
