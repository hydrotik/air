import React from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Avatar, AvatarFallback, Button,
} from '@hydrotik/design-system';
import { Plus } from 'lucide-react';

export function TeamCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '24px' }}>
        <div style={{ display: 'flex', gap: '-8px', marginBottom: '4px' }}>
          {['CN', 'LR', 'ER'].map((initials) => (
            <Avatar key={initials} size="sm" style={{ border: '2px solid var(--color-background, #09090b)' }}>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>No Team Members</div>
          <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '2px' }}>
            Invite your team to collaborate on this project.
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" style={{ width: '100%' }}>
          <Plus size={14} /> Invite Members
        </Button>
      </CardFooter>
    </Card>
  );
}
