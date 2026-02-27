import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Separator,
} from '@hydrotik/design-system';
import { CalendarDays } from 'lucide-react';

export function AvatarSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Avatar sizes */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Sizes</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Avatar group */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Group</div>
        <div style={{ display: 'flex' }}>
          {['SD', 'JL', 'IN', 'MK', '+3'].map((initials, i) => (
            <Avatar
              key={initials}
              size="md"
              style={{ marginLeft: i > 0 ? '-8px' : 0, border: '2px solid var(--background, #0e0f11)' }}
            >
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <Separator />

      {/* HoverCard */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Hover Card</div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a href="#" style={{ fontWeight: 600, textDecoration: 'underline', fontSize: '14px' }}>@hydrotik</a>
          </HoverCardTrigger>
          <HoverCardContent style={{ width: '280px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Avatar size="md">
                <AvatarFallback>HY</AvatarFallback>
              </Avatar>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Hydrotik</div>
                <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '2px' }}>
                  Design system built with vanilla-extract and Radix UI primitives.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '12px', opacity: 0.5 }}>
                  <CalendarDays size={12} /> Joined February 2026
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
