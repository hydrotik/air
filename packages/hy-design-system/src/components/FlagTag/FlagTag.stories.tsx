import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FlagTag } from './FlagTag';

const meta = {
  title: 'Components/FlagTag',
  component: FlagTag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['destructive', 'warning', 'success', 'primary', 'muted'],
      description: 'Status color variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Controls font size and icon size',
    },
    label: {
      control: 'text',
      description: 'Label text (uppercase, monospace)',
    },
    icon: {
      control: 'text',
      description: 'Icon character or element',
    },
    marginLeft: {
      control: 'text',
      description: 'Left margin for inline placement',
    },
  },
} satisfies Meta<typeof FlagTag>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default: destructive flag ── */
export const Default: Story = {
  args: {
    label: 'FLAG',
    variant: 'destructive',
    size: 'sm',
  },
};

/* ── All variants ── */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <FlagTag variant="destructive" label="FLAGGED" marginLeft="0" />
      <FlagTag variant="warning" label="REVIEW" icon="🔍" marginLeft="0" />
      <FlagTag variant="success" label="CLEARED" icon="✓" marginLeft="0" />
      <FlagTag variant="primary" label="NOTED" icon="📌" marginLeft="0" />
      <FlagTag variant="muted" label="PENDING" icon="⏳" marginLeft="0" />
    </div>
  ),
};

/* ── All sizes ── */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '24px', color: '#888' }}>{size}</span>
          <FlagTag size={size} label="FLAGGED" marginLeft="0" />
        </div>
      ))}
    </div>
  ),
};

/* ── Inline after name ── */
export const InlineAfterName: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '11px' }}>
      <div>
        <span style={{ color: 'hsl(217, 91%, 60%)' }}>Aldric Ashworth</span>
      </div>
      <div>
        <span style={{ color: 'hsl(35, 92%, 65%)' }}>Belen Blackstone</span>
        <FlagTag />
      </div>
      <div>
        <span style={{ color: 'hsl(35, 92%, 65%)' }}>Cassian Carrington</span>
        <FlagTag />
      </div>
      <div>
        <span style={{ color: 'hsl(217, 91%, 60%)' }}>Delphine Drexel</span>
      </div>
    </div>
  ),
  name: 'Inline After Name',
};

/* ── In table row context ── */
export const TableContext: Story = {
  render: () => {
    const data = [
      { name: 'Aldric Ashworth', volume: '$785.4M', files: '304,946', flagged: true },
      { name: 'Belen Blackstone', volume: '$507.9M', files: '3,951', flagged: true },
      { name: 'Cassian Carrington', volume: '$385.4M', files: '164', flagged: true },
      { name: 'Emeric Enright', volume: '$250.8M', files: '1,723', flagged: false },
      { name: 'Fionnuala Fairclough', volume: '$44.2M', files: '10,854', flagged: false },
    ];
    return (
      <table style={{ borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(96,165,250,0.3)' }}>
            <th style={{ textAlign: 'left', padding: '4px 16px 4px 0', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>PERSON</th>
            <th style={{ textAlign: 'right', padding: '4px 16px', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>VOLUME</th>
            <th style={{ textAlign: 'right', padding: '4px 16px', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>FILES</th>
            <th style={{ textAlign: 'center', padding: '4px 0', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>REPORT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '6px 16px 6px 0' }}>{d.name}</td>
              <td style={{ padding: '6px 16px', textAlign: 'right', color: 'hsl(217, 91%, 60%)' }}>{d.volume}</td>
              <td style={{ padding: '6px 16px', textAlign: 'right', color: 'hsl(217, 91%, 60%)' }}>{d.files}</td>
              <td style={{ padding: '6px 0', textAlign: 'center' }}>
                {d.flagged ? <FlagTag label="FLAGGED" marginLeft="0" /> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  name: 'In Table Context',
};

/* ── Custom icons ── */
export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <FlagTag icon="⚠" label="FLAG" marginLeft="0" />
      <FlagTag icon="🔴" label="CRITICAL" variant="destructive" marginLeft="0" />
      <FlagTag icon="⚡" label="ACTIVE" variant="warning" marginLeft="0" />
      <FlagTag icon="✓" label="VERIFIED" variant="success" marginLeft="0" />
      <FlagTag icon="→" label="REDIRECT" variant="primary" marginLeft="0" />
      <FlagTag icon="◆" label="SAR FILED" variant="destructive" size="md" marginLeft="0" />
    </div>
  ),
  name: 'Custom Icons',
};
