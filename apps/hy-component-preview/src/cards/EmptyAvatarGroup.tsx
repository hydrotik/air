import React from 'react';
import { Avatar, AvatarFallback, Button } from '@hydrotik/design-system';
import { Plus } from 'lucide-react';

/** Avatar group + empty state — matches shadcn empty-avatar-group.tsx */
export function EmptyAvatarGroup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Avatar stack with overlap */}
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

      {/* Empty state */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>No Team Members</div>
        <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '2px' }}>
          Invite your team to collaborate on this project.
        </div>
      </div>

      <Button variant="outline" size="sm">
        <Plus size={14} /> Invite Members
      </Button>
    </div>
  );
}
