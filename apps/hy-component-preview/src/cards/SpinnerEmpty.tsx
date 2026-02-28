import React from 'react';
import { Spinner, Button } from '@hydrotik/design-system';

/** Processing state — matches shadcn spinner-empty.tsx */
export function SpinnerEmpty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '16px 0' }}>
      <Spinner size="lg" />
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Processing your request</div>
        <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '4px' }}>
          Please wait while we process your request. Do not refresh the page.
        </div>
      </div>
      <Button variant="outline" size="sm">Cancel</Button>
    </div>
  );
}
