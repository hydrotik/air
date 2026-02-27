import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from './Menubar';

const meta = {
  title: 'Components/Menubar',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab<MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
          <MenubarItem>New Window<MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut<MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
          <MenubarItem>Copy<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
          <MenubarItem>Paste<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In<MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
          <MenubarItem>Zoom Out<MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Full Screen<MenubarShortcut>⌃⌘F</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
