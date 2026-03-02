import React from 'react';
import { render, screen } from '@testing-library/react';
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

function TestForm({ onSubmit }: { onSubmit?: (d: any) => void }) {
  const form = useForm({ defaultValues: { name: '' } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormDescription>Enter your name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('renders label and description', () => {
    render(<TestForm />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<TestForm />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<TestForm />);
    const label = screen.getByText('Name');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', input.id);
  });
});
