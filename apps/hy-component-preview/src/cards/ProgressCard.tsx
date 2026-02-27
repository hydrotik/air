import React from 'react';
import { Card, CardContent, Badge, Progress, Button } from '@hydrotik/design-system';
import { Send } from 'lucide-react';

export function ProgressCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="outline">Auto</Badge>
            <span style={{ fontSize: '13px', opacity: 0.5 }}>52% used</span>
          </div>
          <Progress value={52} />
          <Button size="sm" style={{ alignSelf: 'flex-start' }}>
            <Send size={14} /> Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
