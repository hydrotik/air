import React, { useState } from 'react';
import { Input, Button, InputGroup, inputGroupInputClass } from '@hydrotik/design-system';
import { IconWaveSine, IconPlus, IconArrowUp } from '@tabler/icons-react';

/** Prompt with voice toggle — matches shadcn button-group-input-group.tsx */
export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <InputGroup>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Add"
        style={{ flexShrink: 0, borderRadius: 0 }}
      >
        <IconPlus size={14} />
      </Button>
      <Input placeholder="" className={inputGroupInputClass} fullWidth />
      <Button
        variant={voiceEnabled ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        aria-label="Voice Mode"
        aria-pressed={voiceEnabled}
        style={{ flexShrink: 0, borderRadius: 0 }}
      >
        <IconWaveSine size={14} />
      </Button>
      <Button
        size="icon-sm"
        aria-label="Send"
        style={{ flexShrink: 0, borderRadius: '0 5px 5px 0' }}
      >
        <IconArrowUp size={14} />
      </Button>
    </InputGroup>
  );
}
