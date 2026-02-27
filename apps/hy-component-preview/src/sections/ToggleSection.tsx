import React from 'react';
import {
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Kbd,
  Separator,
} from '@hydrotik/design-system';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function ToggleSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Single toggles */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Toggle aria-label="Toggle bold" size="sm"><Bold size={14} /></Toggle>
        <Toggle aria-label="Toggle italic" size="sm"><Italic size={14} /></Toggle>
        <Toggle aria-label="Toggle underline" size="sm"><Underline size={14} /></Toggle>
        <Toggle variant="outline" aria-label="Toggle bold outline"><Bold size={14} /></Toggle>
      </div>

      {/* Toggle group - single selection */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Alignment (single)</div>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft size={14} /></ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter size={14} /></ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right"><AlignRight size={14} /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Toggle group - multiple */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Formatting (multiple)</div>
        <ToggleGroup type="multiple" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="Bold"><Bold size={14} /></ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic"><Italic size={14} /></ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline"><Underline size={14} /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      {/* Kbd */}
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.5, marginBottom: '8px' }}>Keyboard shortcuts</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', fontSize: '14px' }}>
          <span>Copy <Kbd>⌘C</Kbd></span>
          <span>Paste <Kbd>⌘V</Kbd></span>
          <span>Undo <Kbd>⌘Z</Kbd></span>
          <span>Save <Kbd>⌘S</Kbd></span>
        </div>
      </div>
    </div>
  );
}
