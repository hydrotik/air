import React from 'react';
import { Input, Label, Button } from '@hydrotik/design-system';
import { Lock, Star } from 'lucide-react';
import * as s from '../App.css';

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

      {/* URL prefix input with star button — group wrapper owns border */}
      <div className={s.inputGroup}>
        <span className={s.inputGroupAddon}>https://</span>
        <Input className={s.inputGroupInput} fullWidth />
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Favorite"
          style={{ flexShrink: 0, borderRadius: 0 }}
        >
          <Star size={14} />
        </Button>
      </div>
    </div>
  );
}
