import React from 'react';
import { Badge } from '@hydrotik/design-system';
import { Sparkles } from 'lucide-react';

export function CopilotCard() {
  return (
    <Badge style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <Sparkles size={12} /> Copilot
    </Badge>
  );
}
