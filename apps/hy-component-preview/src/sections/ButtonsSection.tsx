import React from 'react';
import { Button } from '@hydrotik/design-system';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

export function ButtonsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={rowStyle}>
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={rowStyle}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
