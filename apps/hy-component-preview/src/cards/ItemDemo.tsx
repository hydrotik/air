import React from 'react';
import { Button, Separator } from '@hydrotik/design-system';
import { BadgeCheck, ChevronRight } from 'lucide-react';

/** 2FA toggle + verified alert — matches shadcn item-demo.tsx */
export function ItemDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Two-factor auth item */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Two-factor authentication</div>
          <div style={{ fontSize: '13px', opacity: 0.5 }}>Verify via email or phone number.</div>
        </div>
        <Button variant="outline" size="sm">Enable</Button>
      </div>

      <Separator />

      {/* Verified profile item */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <BadgeCheck size={18} style={{ color: 'var(--color-primary, #3b82f6)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Your profile has been verified.</div>
        </div>
        <ChevronRight size={16} style={{ opacity: 0.4 }} />
      </div>
    </div>
  );
}
