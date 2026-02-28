import React from 'react';
import { Badge, Spinner } from '@hydrotik/design-system';

/** Loading state badges — matches shadcn spinner-badge.tsx */
export function SpinnerBadge() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {['Syncing', 'Updating', 'Loading'].map(label => (
        <Badge key={label} variant="outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Spinner size="sm" /> {label}
        </Badge>
      ))}
    </div>
  );
}
