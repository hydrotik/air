import React from 'react';
import { Input, Kbd } from '@hydrotik/design-system';
import { Search } from 'lucide-react';
import * as s from '../App.css';

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

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
        <span className={cx(s.inputAddon, s.inputAddonStart)}>
          <Search size={14} />
        </span>
        <div style={{ flex: 1 }}>
          <Input placeholder="" className={s.inputGroupMiddle} fullWidth />
        </div>
        <span className={cx(s.inputAddon, s.inputAddonEnd)}>
          <Kbd>/</Kbd>
        </span>
      </div>
      <a href="#" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'underline' }}>
        Need help? Contact support
      </a>
    </div>
  );
}
