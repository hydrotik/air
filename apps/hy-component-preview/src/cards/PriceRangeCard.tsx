import React, { useState } from 'react';
import { Card, CardContent, Label, Slider, Badge } from '@hydrotik/design-system';

export function PriceRangeCard() {
  const [value, setValue] = useState([200]);

  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Label style={{ fontWeight: 600, margin: 0 }}>Price Range</Label>
          </div>
          <span style={{ fontSize: '13px', opacity: 0.5, marginTop: '-8px' }}>
            Set your budget range (<strong>${value[0]}</strong> - <strong>800</strong>).
          </span>
          <Slider
            defaultValue={[200]}
            min={0}
            max={1000}
            step={10}
            onValueChange={setValue}
          />
          <Badge variant="secondary" style={{ alignSelf: 'flex-start' }}>12 results</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
