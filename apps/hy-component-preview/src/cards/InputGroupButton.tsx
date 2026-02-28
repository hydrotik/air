import React from 'react';
import { Input, Label, Button } from '@hydrotik/design-system';
import { Lock, Star } from 'lucide-react';
import * as s from '../App.css';

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
        <span className={cx(s.inputAddon, s.inputAddonStart)}>https://</span>
        <div style={{ flex: 1 }}>
          <Input className={s.inputGroupMiddle} fullWidth />
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className={s.inputAddonEnd}
          aria-label="Favorite"
        >
          <Star size={14} />
        </Button>
      </div>
    </div>
  );
}
