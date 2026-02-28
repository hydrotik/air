import React from 'react';
import { Button } from '@hydrotik/design-system';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/** Pagination-style button group — matches shadcn button-group-nested.tsx */
export function ButtonGroupNested() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <Button variant="ghost" size="icon-sm" aria-label="Previous" style={{ borderRadius: '6px 0 0 6px' }}>
        <ArrowLeft size={14} />
      </Button>
      {[1, 2, 3].map(n => (
        <Button
          key={n}
          variant={n === 1 ? 'outline' : 'ghost'}
          size="sm"
          style={{ borderRadius: '0', minWidth: '32px' }}
        >
          {n}
        </Button>
      ))}
      <Button variant="ghost" size="icon-sm" aria-label="Next" style={{ borderRadius: '0 6px 6px 0' }}>
        <ArrowRight size={14} />
      </Button>
    </div>
  );
}
