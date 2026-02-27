import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of what this card represents.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
          This is the main content area of the card. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm" style={{ marginLeft: '8px' }}>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card elevation="flat" style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Flat Card</CardTitle>
      </CardHeader>
      <CardContent>No shadow, subtle border only.</CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card elevation="elevated" style={{ width: '360px' }}>
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
      </CardHeader>
      <CardContent>More prominent shadow for higher emphasis content.</CardContent>
    </Card>
  ),
};
