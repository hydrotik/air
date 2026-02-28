import React from 'react';
import { Button, Separator } from '@hydrotik/design-system';
import { Archive, Flag, AlarmClock, MoreHorizontal } from 'lucide-react';

/** Action button group — matches shadcn button-group-demo.tsx */
export function ButtonGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Primary action buttons */}
      <div style={{ display: 'flex', gap: '0' }}>
        <Button variant="outline" size="sm" style={{ borderRadius: '6px 0 0 6px', borderRight: 'none' }}>
          <Archive size={14} /> Archive
        </Button>
        <Button variant="outline" size="sm" style={{ borderRadius: '0', borderRight: 'none' }}>
          <Flag size={14} /> Report
        </Button>
        <Button variant="outline" size="sm" style={{ borderRadius: '0 6px 6px 0' }}>
          <AlarmClock size={14} /> Snooze
        </Button>
      </div>

      <Separator />

      {/* Secondary row with more button */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="outline" size="sm">Mark as Read</Button>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" size="icon-sm" aria-label="More options">
          <MoreHorizontal size={14} />
        </Button>
      </div>
    </div>
  );
}
