import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SourceRatingBar } from './SourceRatingBar';

const meta = {
  title: 'Components/SourceRatingBar',
  component: SourceRatingBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Segment dimensions — xs (4×6), sm (5×8), md (6×10), lg (8×12)',
    },
    color: {
      control: 'select',
      options: ['primary', 'chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'destructive', 'success', 'warning'],
      description: 'Accent color for lit segments. Dim segments use same color at 12% opacity.',
    },
    total: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
      description: 'Total number of segments (used with value prop)',
    },
    value: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Number of lit segments from left (used with total prop)',
    },
  },
} satisfies Meta<typeof SourceRatingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Basic: boolean array ── */
export const Default: Story = {
  args: {
    sources: [true, true, true, false, true, false, false, true, false, false],
    size: 'sm',
    color: 'chart2',
  },
};

/* ── Numeric mode ── */
export const NumericMode: Story = {
  args: {
    value: 7,
    total: 10,
    size: 'md',
    color: 'primary',
  },
  name: 'Numeric (value/total)',
};

/* ── All sizes ── */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', width: '24px', color: '#888' }}>{size}</span>
          <SourceRatingBar value={6} total={10} size={size} />
        </div>
      ))}
    </div>
  ),
};

/* ── All colors ── */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      {(['chart2', 'primary', 'chart1', 'chart3', 'chart4', 'chart5', 'destructive', 'success', 'warning'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '80px', color: '#888' }}>{color}</span>
          <SourceRatingBar value={7} total={10} size="md" color={color} />
        </div>
      ))}
    </div>
  ),
};

/* ── Scatter pattern ── */
export const ScatterPattern: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
      <SourceRatingBar sources={[true, false, true, false, true, false, true, false, true, false]} size="md" />
      <SourceRatingBar sources={[false, true, false, true, false, true, false, true, false, true]} size="md" />
      <SourceRatingBar sources={[true, true, true, true, true, false, false, false, false, false]} size="md" />
      <SourceRatingBar sources={[false, false, false, false, false, true, true, true, true, true]} size="md" />
    </div>
  ),
  name: 'Scatter Patterns',
};

/* ── Full / Empty ── */
export const Extremes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '60px', color: '#888' }}>10/10</span>
        <SourceRatingBar value={10} total={10} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '60px', color: '#888' }}>0/10</span>
        <SourceRatingBar value={0} total={10} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '60px', color: '#888' }}>1/10</span>
        <SourceRatingBar value={1} total={10} size="md" />
      </div>
    </div>
  ),
};

/* ── In a data table context ── */
export const TableContext: Story = {
  render: () => {
    const data = [
      { name: 'Aldric Ashworth', dollars: '$957K', sources: [true,true,true,true,true,true,true,false,false,false] },
      { name: 'Belen Blackstone', dollars: '$419.5M', sources: [true,true,true,true,true,true,false,true,true,false] },
      { name: 'Cassian Carrington', dollars: '$571.2M', sources: [true,false,true,false,true,true,false,false,false,false] },
      { name: 'Delphine Drexel', dollars: '$328.5M', sources: [true,true,false,false,true,false,false,false,false,false] },
      { name: 'Emeric Enright', dollars: '$250.8M', sources: [true,true,true,true,false,false,false,false,false,false] },
    ];
    return (
      <table style={{ borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '11px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid rgba(96,165,250,0.3)' }}>
            <th style={{ textAlign: 'left', padding: '4px 12px 4px 0', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>NAME</th>
            <th style={{ textAlign: 'right', padding: '4px 12px', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>DIRECT $</th>
            <th style={{ textAlign: 'center', padding: '4px 0', fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888' }}>SOURCES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '5px 12px 5px 0', color: 'hsl(217, 91%, 60%)' }}>{d.name}</td>
              <td style={{ padding: '5px 12px', textAlign: 'right', color: 'hsl(217, 91%, 60%)' }}>{d.dollars}</td>
              <td style={{ padding: '5px 0', textAlign: 'center' }}>
                <SourceRatingBar sources={d.sources} size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  name: 'In Table Context',
};

/* ── Custom segment count ── */
export const CustomTotal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '40px', color: '#888' }}>5</span>
        <SourceRatingBar value={3} total={5} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '40px', color: '#888' }}>10</span>
        <SourceRatingBar value={7} total={10} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '40px', color: '#888' }}>15</span>
        <SourceRatingBar value={11} total={15} size="md" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', width: '40px', color: '#888' }}>20</span>
        <SourceRatingBar value={14} total={20} size="md" />
      </div>
    </div>
  ),
  name: 'Custom Segment Counts',
};
