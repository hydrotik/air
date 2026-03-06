import React from 'react';
import {
  Input, Label, Button,
  InputGroup, InputGroupAddon, inputGroupInputClass,
} from '@hydrotik/design-system';
import { IconLock, IconStar } from '@tabler/icons-react';

/** Input variants with secure indicator — matches shadcn input-group-button.tsx */
export function InputGroupButton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Label style={{ margin: 0, flex: 1 }}>Input</Label>
        <span style={{ fontSize: '12px', opacity: 0.5, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <IconLock size={12} /> Secure
        </span>
      </div>

      {/* URL prefix input with star button */}
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input className={inputGroupInputClass} fullWidth />
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Favorite"
          style={{ flexShrink: 0, borderRadius: 0 }}
        >
          <IconStar size={14} />
        </Button>
      </InputGroup>
    </div>
  );
}
