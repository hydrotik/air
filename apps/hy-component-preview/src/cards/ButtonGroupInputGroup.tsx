import React, { useState } from 'react';
import { Input, Button } from '@hydrotik/design-system';
import { AudioLines, Plus, ArrowUp } from 'lucide-react';

/** Prompt with voice toggle — matches shadcn button-group-input-group.tsx */
export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Add"
        style={{ borderRadius: '6px 0 0 6px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none' }}
      >
        <Plus size={14} />
      </Button>
      <Input
        placeholder=""
        style={{ borderRadius: '0', flex: 1 }}
      />
      <Button
        variant={voiceEnabled ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        aria-label="Voice Mode"
        aria-pressed={voiceEnabled}
        style={{ borderRadius: '0', border: '1px solid rgba(255,255,255,0.1)', borderLeft: 'none', borderRight: 'none' }}
      >
        <AudioLines size={14} />
      </Button>
      <Button
        size="icon-sm"
        aria-label="Send"
        style={{ borderRadius: '0 6px 6px 0' }}
      >
        <ArrowUp size={14} />
      </Button>
    </div>
  );
}
