import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from './ColorSwatch';

const meta: Meta<typeof ColorSwatch> = {
  title: 'E-Commerce/ColorSwatch',
  component: ColorSwatch,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {
  args: { hex: '#1a2744', name: 'Navy' },
};

export const Selected: Story = {
  args: { hex: '#1a2744', name: 'Navy', isSelected: true },
};

export const Circle: Story = {
  args: { hex: '#d4c5a9', name: 'Cream', shape: 'circle' },
};

export const Disabled: Story = {
  args: { hex: '#000', name: 'Black', disabled: true },
};

export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <ColorSwatch hex="#1a2744" name="Navy" isSelected onClick={() => {}} />
      <ColorSwatch hex="#d4c5a9" name="Cream" onClick={() => {}} />
      <ColorSwatch hex="#000000" name="Black" onClick={() => {}} />
      <ColorSwatch hex="#8b2252" name="Berry" onClick={() => {}} />
      <ColorSwatch hex="#4a6741" name="Forest" onClick={() => {}} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ColorSwatch hex="#3b82f6" name="Blue" size="sm" onClick={() => {}} />
      <ColorSwatch hex="#3b82f6" name="Blue" size="md" onClick={() => {}} />
      <ColorSwatch hex="#3b82f6" name="Blue" size="lg" onClick={() => {}} />
    </div>
  ),
};
