import React from 'react';
import { Badge, Spinner } from '@hydrotik/design-system';

export function LoadingCard() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      {['Syncing', 'Updating', 'Loading'].map((label) => (
        <Badge key={label} variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Spinner size="sm" /> {label}
        </Badge>
      ))}
    </div>
  );
}
