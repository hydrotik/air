import React from 'react';
import { Button } from '@hydrotik/design-system';
import { Mail, Loader2, ChevronRight, Plus } from 'lucide-react';

export function ButtonsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <Button><Mail size={16} /> Login with Email</Button>
        <Button variant="outline"><ChevronRight size={16} /> Continue</Button>
        <Button variant="secondary"><Plus size={16} /> Create New</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <Button variant="outline" size="icon"><Plus size={16} /></Button>
        <Button variant="outline" size="icon-sm"><Plus size={14} /></Button>
        <Button loading><Loader2 size={16} /> Please wait</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
