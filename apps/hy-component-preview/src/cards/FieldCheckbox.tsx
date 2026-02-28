import React from 'react';
import { Checkbox, Label } from '@hydrotik/design-system';

/** Terms checkbox — matches shadcn field-checkbox.tsx */
export function FieldCheckbox() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Checkbox id="terms-agree" />
      <Label htmlFor="terms-agree" style={{ margin: 0, fontWeight: 400 }}>
        I agree to the terms and conditions
      </Label>
    </div>
  );
}
