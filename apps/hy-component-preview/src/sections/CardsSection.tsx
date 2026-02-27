import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@hydrotik/design-system';

export function CardsSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {(['Standard', 'Featured', 'Compact'] as const).map((label) => (
        <Card key={label}>
          <CardHeader>
            <CardTitle>{label}</CardTitle>
            <CardDescription>A {label.toLowerCase()} card example.</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '13px', opacity: 0.7 }}>Content area.</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">View</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
