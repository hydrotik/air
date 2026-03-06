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
import type { SourceEntry, DeductionCategory } from '../types';
import { CATEGORY_LABELS, DEDUCTION_CATEGORIES } from '../constants';

interface AddEntryDialogProps {
  sources: SourceEntry[];
  /** Pre-select a category (e.g., when adding from a group header) */
  defaultCategory?: DeductionCategory;
  onAdd: (entry: {
    date: string;
    description: string;
    amount: number;
    category: DeductionCategory;
    source: string;
  }) => void;
}

export function AddEntryDialog({ sources, defaultCategory, onAdd }: AddEntryDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<DeductionCategory>(defaultCategory ?? DEDUCTION_CATEGORIES[0]);
  const [source, setSource] = useState('');

  const reset = () => {
    setDate('');
    setDescription('');
    setAmount('');
    setCategory(defaultCategory ?? DEDUCTION_CATEGORIES[0]);
    setSource('');
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!date || !description || isNaN(parsedAmount)) return;
    onAdd({ date, description, amount: parsedAmount, category, source });
    reset();
    setOpen(false);
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
          <DialogTitle>Add Deduction Entry</DialogTitle>
          <DialogDescription>Manually add a deduction entry.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
          <div>
            <Label htmlFor="add-cat">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as DeductionCategory)}>
              <SelectTrigger id="add-cat"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DEDUCTION_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="add-date">Date</Label>
            <Input id="add-date" placeholder="MM/DD/YYYY" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="add-desc">Description</Label>
            <Input id="add-desc" placeholder="Merchant or item name" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="add-amount">Amount</Label>
            <Input id="add-amount" type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="add-source">Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger id="add-source"><SelectValue placeholder="Select source" /></SelectTrigger>
              <SelectContent>
                {sources.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
