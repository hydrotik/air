import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './Form';
import { Input } from '../Input';
import { Button } from '../Button';

const meta = {
  title: 'Components/Form',
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicFormDemo() {
  const form = useForm({
    defaultValues: { username: '', email: '' },
  });

  const onSubmit = (data: Record<string, string>) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <FormField
          control={form.control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" type="email" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <BasicFormDemo />,
};

function ValidationDemo() {
  const form = useForm({
    defaultValues: { name: '' },
    mode: 'onBlur',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} style={{ maxWidth: '400px' }}>
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: 'Name is required',
            minLength: { value: 3, message: 'Must be at least 3 characters' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type and blur to validate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" style={{ marginTop: '16px' }}>Submit</Button>
      </form>
    </Form>
  );
}

export const WithValidation: Story = {
  render: () => <ValidationDemo />,
};
