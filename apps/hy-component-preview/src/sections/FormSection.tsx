import React from 'react';
import {
  Input,
  Label,
  FieldMessage,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@hydrotik/design-system';

export function FormSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '640px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="preview-name">Full name</Label>
        <Input id="preview-name" placeholder="Jane Smith" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="preview-email">Email</Label>
        <Input id="preview-email" type="email" placeholder="jane@company.com" error />
        <FieldMessage intent="error">Enter a valid email address.</FieldMessage>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="preview-role">Role</Label>
        <Select>
          <SelectTrigger id="preview-role">
            <SelectValue placeholder="Select role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="preview-bio">Bio</Label>
        <Textarea id="preview-bio" placeholder="Tell us about yourself..." rows={3} />
      </div>
    </div>
  );
}
