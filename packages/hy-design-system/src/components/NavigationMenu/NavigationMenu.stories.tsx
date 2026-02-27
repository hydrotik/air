import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const meta = {
  title: 'Components/NavigationMenu',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{ padding: '16px', width: '400px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Introduction</h3>
              <p style={{ fontSize: '13px', opacity: 0.7 }}>
                Re-usable components built with Radix UI and vanilla-extract.
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div style={{ padding: '16px', width: '400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ fontSize: '13px' }}>Alert Dialog</div>
              <div style={{ fontSize: '13px' }}>Hover Card</div>
              <div style={{ fontSize: '13px' }}>Progress</div>
              <div style={{ fontSize: '13px' }}>Scroll Area</div>
              <div style={{ fontSize: '13px' }}>Tabs</div>
              <div style={{ fontSize: '13px' }}>Tooltip</div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
