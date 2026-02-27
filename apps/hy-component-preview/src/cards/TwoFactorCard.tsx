import React from 'react';
import { Card, CardContent, Label, Switch } from '@hydrotik/design-system';

export function TwoFactorCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Two-factor authentication</div>
          <div style={{ fontSize: '13px', opacity: 0.5 }}>Verify via email or phone number.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <Switch id="tfa" />
            <Label htmlFor="tfa" style={{ margin: 0 }}>Enable</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
