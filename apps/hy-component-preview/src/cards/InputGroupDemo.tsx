import React from 'react';
import {
  Input, Badge, Progress, Button, Separator,
  InputGroup, InputGroupAddon, inputGroupInputClass,
} from '@hydrotik/design-system';
import { IconArrowUp } from '@tabler/icons-react';

/** Input group demos — matches shadcn input-group-demo.tsx */
export function InputGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Row 1: Badge */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="secondary">12 results</Badge>
      </div>

      {/* URL prefix input */}
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input className={inputGroupInputClass} fullWidth />
      </InputGroup>

      <Separator />

      {/* Auto + Progress row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="outline">Auto</Badge>
        <span style={{ fontSize: '13px', opacity: 0.5, flex: 1 }}>52% used</span>
      </div>
      <Progress value={52} />

      <Separator />

      {/* Send button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Input placeholder="" fullWidth />
        <Button size="sm">
          Send <IconArrowUp size={14} />
        </Button>
      </div>
    </div>
  );
}
