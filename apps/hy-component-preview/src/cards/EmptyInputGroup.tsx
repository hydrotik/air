import React from 'react';
import {
  Input, Kbd,
  InputGroup, InputGroupAddon, inputGroupInputClass,
} from '@hydrotik/design-system';
import { IconSearch } from '@tabler/icons-react';

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
      <InputGroup style={{ width: '100%' }}>
        <InputGroupAddon>
          <IconSearch size={14} />
        </InputGroupAddon>
        <Input placeholder="" className={inputGroupInputClass} fullWidth />
        <InputGroupAddon>
          <Kbd>/</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <a href="#" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'underline' }}>
        Need help? Contact support
      </a>
    </div>
  );
}
