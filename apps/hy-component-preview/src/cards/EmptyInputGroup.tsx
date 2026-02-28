import React from 'react';
import { Input, Kbd } from '@hydrotik/design-system';
import { Search } from 'lucide-react';

/** 404 search — matches shadcn empty-input-group.tsx */
export function EmptyInputGroup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>404 - Not Found</div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <span style={{
          display: 'flex', alignItems: 'center', padding: '0 10px', height: '32px',
          borderRadius: '6px 0 0 6px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none',
        }}>
          <Search size={14} style={{ opacity: 0.5 }} />
        </span>
        <Input placeholder="" style={{ borderRadius: '0', flex: 1 }} />
        <span style={{
          display: 'flex', alignItems: 'center', padding: '0 8px', height: '32px',
          borderRadius: '0 6px 6px 0', border: '1px solid rgba(255,255,255,0.1)', borderLeft: 'none',
        }}>
          <Kbd>/</Kbd>
        </span>
      </div>
      <a href="#" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'underline' }}>
        Need help? Contact support
      </a>
    </div>
  );
}
