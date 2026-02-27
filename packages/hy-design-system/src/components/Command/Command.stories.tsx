import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './Command';

const meta = {
  title: 'Components/Command',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar<CommandShortcut>⌘C</CommandShortcut></CommandItem>
            <CommandItem>Search<CommandShortcut>⌘S</CommandShortcut></CommandItem>
            <CommandItem>Settings<CommandShortcut>⌘,</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>New File<CommandShortcut>⌘N</CommandShortcut></CommandItem>
            <CommandItem>New Window<CommandShortcut>⇧⌘N</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
