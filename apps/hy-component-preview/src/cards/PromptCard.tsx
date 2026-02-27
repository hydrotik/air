import React from 'react';
import { Card, CardContent, Input, Button } from '@hydrotik/design-system';
import { Paperclip, Mic } from 'lucide-react';

export function PromptCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Input placeholder="Add context" style={{ flex: 1 }} />
          <Button variant="ghost" size="icon-sm" aria-label="Attach">
            <Paperclip size={14} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Voice">
            <Mic size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
