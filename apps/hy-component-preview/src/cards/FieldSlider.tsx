import React, { useState } from 'react';
import { Slider } from '@hydrotik/design-system';

/** Price Range dual-value slider — matches shadcn field-slider.tsx */
export function FieldSlider() {
  const [value, setValue] = useState([200, 800]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ fontSize: '14px', fontWeight: 600 }}>Price Range</div>
      <div style={{ fontSize: '13px', opacity: 0.5 }}>
        Set your budget range (<strong>${value[0]}</strong> - <strong>${value[1]}</strong>).
      </div>
      <Slider
        defaultValue={[200, 800]}
        min={0}
        max={1000}
        step={10}
        onValueChange={setValue}
      />
    </div>
  );
}
