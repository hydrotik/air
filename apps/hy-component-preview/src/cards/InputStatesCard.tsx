import React from 'react';
import { Card, CardContent, Input, Label } from '@hydrotik/design-system';
import { Lock } from 'lucide-react';

export function InputStatesCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label style={{ fontSize: '12px', margin: 0 }}>Input</Label>
            <Input placeholder="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Label style={{ fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} /> Secure
            </Label>
            <Input type="password" placeholder="" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <span
              style={{
                fontSize: '13px',
                opacity: 0.5,
                padding: '0 10px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '6px 0 0 6px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRight: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              https://
            </span>
            <Input style={{ borderRadius: '0 6px 6px 0', flex: 1 }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
