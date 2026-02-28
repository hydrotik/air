import React from 'react';
import { Input, Kbd } from '@hydrotik/design-system';
import { Search } from 'lucide-react';
import * as s from '../App.css';

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
      {/* Search input group — wrapper owns border/shadow */}
      <div className={s.inputGroup} style={{ width: '100%' }}>
        <span className={s.inputGroupAddon}>
          <Search size={14} />
        </span>
        <Input placeholder="" className={s.inputGroupInput} fullWidth />
        <span className={s.inputGroupAddon}>
          <Kbd>/</Kbd>
        </span>
      </div>
      <a href="#" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'underline' }}>
        Need help? Contact support
      </a>
    </div>
  );
}
