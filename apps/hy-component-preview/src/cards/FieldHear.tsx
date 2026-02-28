import React from 'react';
import { Checkbox, Label } from '@hydrotik/design-system';

/** "How did you hear about us?" — matches shadcn field-hear.tsx (uses Checkboxes, not Radio) */
const options = ['Social Media', 'Search Engine', 'Referral', 'Other'];

export function FieldHear() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>How did you hear about us?</div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>
          Select the option that best describes how you heard about us.
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map(opt => {
          const id = `hear-${opt.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id={id} />
              <Label htmlFor={id} style={{ margin: 0, fontWeight: 400 }}>{opt}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
