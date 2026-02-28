import React from 'react';
import { Avatar, AvatarFallback, Button, Separator } from '@hydrotik/design-system';
import { Plus } from 'lucide-react';

/** Avatar list item + empty invite — matches shadcn item-avatar.tsx */
export function ItemAvatar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Person row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar size="sm">
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Max Leiter</div>
          <div style={{ fontSize: '12px', opacity: 0.5 }}>Last seen 5 months ago</div>
        </div>
      </div>

      <Separator />

      {/* Empty invite state */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex' }}>
          {['CN', 'LR', 'ER'].map((initials, i) => (
            <Avatar
              key={initials}
              size="sm"
              style={{
                marginLeft: i > 0 ? '-8px' : 0,
                border: '2px solid var(--color-background, #09090b)',
                position: 'relative',
                zIndex: 3 - i,
              }}
            >
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 500 }}>No Team Members</div>
          <div style={{ fontSize: '12px', opacity: 0.5 }}>Invite your team to collaborate.</div>
        </div>
        <Button variant="outline" size="sm">
          <Plus size={14} /> Invite
        </Button>
      </div>
    </div>
  );
}
