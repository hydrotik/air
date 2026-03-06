import React from 'react';
import { Button, Badge } from '@hydrotik/design-system';
import { IconRobot, IconChevronDown } from '@tabler/icons-react';

/** Copilot button group — matches shadcn button-group-popover.tsx */
export function ButtonGroupPopover() {
  return (
    <div style={{ display: 'flex', gap: '0' }}>
      <Button size="sm" style={{ borderRadius: '6px 0 0 6px', borderRight: 'none', gap: '6px' }}>
        <IconRobot size={14} /> Copilot
      </Button>
      <Button size="sm" style={{ borderRadius: '0 6px 6px 0', padding: '0 8px' }} aria-label="More">
        <IconChevronDown size={14} />
      </Button>
    </div>
  );
}
