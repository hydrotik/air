import React from 'react';
import { Card, CardContent, ToggleGroup, ToggleGroupItem } from '@hydrotik/design-system';

export function SourceCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <ToggleGroup type="single" defaultValue="auto">
          <ToggleGroupItem value="auto">Auto</ToggleGroupItem>
          <ToggleGroupItem value="all">All Sources</ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}
