import React from 'react';
import { Input, Badge, Progress, Button, Separator } from '@hydrotik/design-system';
import { ArrowUp, Search } from 'lucide-react';

/** Input group demos — matches shadcn input-group-demo.tsx
 *  Approximated with our Input/Badge/Progress/Button components */
export function InputGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Row 1: Badge + URL input */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="secondary">12 results</Badge>
      </div>

      {/* URL prefix input */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          fontSize: '13px', opacity: 0.5, padding: '0 10px', height: '32px',
          display: 'flex', alignItems: 'center',
          borderRadius: '6px 0 0 6px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none',
          whiteSpace: 'nowrap',
        }}>https://</span>
        <Input style={{ borderRadius: '0 6px 6px 0', flex: 1 }} />
      </div>

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
        <Input placeholder="" style={{ flex: 1 }} />
        <Button size="sm">
          Send <ArrowUp size={14} />
        </Button>
      </div>
    </div>
  );
}
