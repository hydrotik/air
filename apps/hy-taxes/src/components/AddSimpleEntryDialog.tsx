import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
} from '@hydrotik/design-system';
import { IconPlus } from '@tabler/icons-react';

interface AddSimpleEntryDialogProps {
  /** Section title for the dialog header */
  title: string;
  /** Which fields to show */
  fields: Array<'date' | 'description' | 'amount' | 'company'>;
  onAdd: (entry: Record<string, string>) => void;
}

export function AddSimpleEntryDialog({ title, fields, onAdd }: AddSimpleEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const reset = () => setValues({});
  const set = (key: string, val: string) => setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (fields.some((f) => !values[f]?.trim())) return;
    onAdd(values);
    reset();
    setOpen(false);
  };

  const fieldConfig: Record<string, { label: string; placeholder: string; type?: string }> = {
    date: { label: 'Date', placeholder: 'MM/DD/YYYY' },
    description: { label: 'Description', placeholder: 'Description' },
    amount: { label: 'Amount', placeholder: '0.00', type: 'number' },
    company: { label: 'Company', placeholder: 'Company name' },
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus size={14} />
          Add Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {title}</DialogTitle>
          <DialogDescription>Manually add an entry.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
          {fields.map((f) => {
            const cfg = fieldConfig[f];
            return (
              <div key={f}>
                <Label htmlFor={`simple-${f}`}>{cfg.label}</Label>
                <Input
                  id={`simple-${f}`}
                  type={cfg.type}
                  step={cfg.type === 'number' ? '0.01' : undefined}
                  placeholder={cfg.placeholder}
                  value={values[f] ?? ''}
                  onChange={(e) => set(f, e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
