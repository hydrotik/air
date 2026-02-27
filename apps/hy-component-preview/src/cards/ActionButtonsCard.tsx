import React from 'react';
import { Card, CardContent, Button } from '@hydrotik/design-system';
import { Archive, Flag, AlarmClock } from 'lucide-react';

export function ActionButtonsCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm"><Archive size={14} /> Archive</Button>
          <Button variant="outline" size="sm"><Flag size={14} /> Report</Button>
          <Button variant="outline" size="sm"><AlarmClock size={14} /> Snooze</Button>
        </div>
      </CardContent>
    </Card>
  );
}
