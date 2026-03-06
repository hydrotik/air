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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@hydrotik/design-system';
import { IconPlus } from '@tabler/icons-react';
import type { SourceType } from '../types';
import { SOURCE_TYPE_LABELS } from '../constants';

interface AddSourceDialogProps {
  onAdd: (source: { name: string; type: SourceType }) => void;
}

const SOURCE_TYPES = Object.keys(SOURCE_TYPE_LABELS) as SourceType[];

export function AddSourceDialog({ onAdd }: AddSourceDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<SourceType>('credit_card');

  const reset = () => { setName(''); setType('credit_card'); };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), type });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" style={{ width: '100%' }}>
          <IconPlus size={14} />
          Add Source
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Source</DialogTitle>
          <DialogDescription>Add a new financial source to track.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
          <div>
            <Label htmlFor="src-name">Source Name</Label>
            <Input id="src-name" placeholder="e.g. Chase Sapphire" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="src-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as SourceType)}>
              <SelectTrigger id="src-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SOURCE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{SOURCE_TYPE_LABELS[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Source</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
