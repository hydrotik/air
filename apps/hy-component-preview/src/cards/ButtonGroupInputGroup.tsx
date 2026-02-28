import React, { useState } from 'react';
import { Input, Button } from '@hydrotik/design-system';
import { AudioLines, Plus, ArrowUp } from 'lucide-react';
import * as s from '../App.css';

/** Prompt with voice toggle — matches shadcn button-group-input-group.tsx */
export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Add"
        className={s.inputAddonStart}
      >
        <Plus size={14} />
      </Button>
      <div style={{ flex: 1 }}>
        <Input placeholder="" className={s.inputGroupMiddle} fullWidth />
      </div>
      <Button
        variant={voiceEnabled ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        aria-label="Voice Mode"
        aria-pressed={voiceEnabled}
        style={{ borderRadius: 0 }}
      >
        <AudioLines size={14} />
      </Button>
      <Button
        size="icon-sm"
        aria-label="Send"
        className={s.inputAddonEnd}
      >
        <ArrowUp size={14} />
      </Button>
    </div>
  );
}
