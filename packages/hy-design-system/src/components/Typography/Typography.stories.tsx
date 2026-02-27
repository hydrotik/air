import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyInlineCode,
  TypographyBlockquote,
  TypographyUl,
  TypographyOl,
  TypographyHr,
} from './Typography';

const meta = {
  title: 'Components/Typography',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllElements: Story = {
  render: () => (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyHr />
      <TypographyP>
        The king, seeing how much happier his subjects were, felt a warm glow of
        satisfaction. He googled &quot;how to mass delete apps from phone&quot; and mass
        deleted all social media from his device.
      </TypographyP>
      <TypographyLead>
        A modal dialog that interrupts the user with important content and expects a response.
      </TypographyLead>
      <TypographyLarge>Are you absolutely sure?</TypographyLarge>
      <TypographySmall>Email address</TypographySmall>
      <TypographyMuted>Enter your email address.</TypographyMuted>
      <TypographyHr />
      <TypographyBlockquote>
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so it&apos;s only fair
        that they should pay for the privilege.&quot;
      </TypographyBlockquote>
      <div>
        <TypographyP>
          Use the <TypographyInlineCode>Button</TypographyInlineCode> component for actions.
        </TypographyP>
      </div>
      <TypographyUl>
        <li>First item in the list</li>
        <li>Second item with more detail</li>
        <li>Third and final item</li>
      </TypographyUl>
      <TypographyOl>
        <li>Install dependencies</li>
        <li>Configure theme</li>
        <li>Start building</li>
      </TypographyOl>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <TypographyH1>This is H1</TypographyH1>
      <TypographyH2>This is H2</TypographyH2>
      <TypographyH3>This is H3</TypographyH3>
      <TypographyH4>This is H4</TypographyH4>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: 500 }}>
      <TypographyP>Default paragraph text — used for body content.</TypographyP>
      <TypographyLead>Lead text — used for introductory content.</TypographyLead>
      <TypographyLarge>Large text — used for emphasis.</TypographyLarge>
      <TypographySmall>Small text — used for labels.</TypographySmall>
      <TypographyMuted>Muted text — used for secondary info.</TypographyMuted>
    </div>
  ),
};
