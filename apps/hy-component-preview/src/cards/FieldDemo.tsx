import React from 'react';
import {
  Input, Label, Checkbox, Textarea, Button, Separator,
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from '@hydrotik/design-system';

/** Payment Method form — matches shadcn field-demo.tsx */
export function FieldDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Payment Method</div>
        <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '2px' }}>
          All transactions are secure and encrypted
        </div>
      </div>

      <Separator />

      {/* Name on Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="pay-name">Name on Card</Label>
        <Input id="pay-name" />
      </div>

      {/* Card Number */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="pay-number">Card Number</Label>
        <Input id="pay-number" />
        <span style={{ fontSize: '12px', opacity: 0.5 }}>Enter your 16-digit number.</span>
      </div>

      {/* CVV / Month / Year */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Label>CVV</Label>
          <Input />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Label>Month</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="MM" /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => {
                const v = String(i + 1).padStart(2, '0');
                return <SelectItem key={v} value={v}>{v}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Label>Year</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="YYYY" /></SelectTrigger>
            <SelectContent>
              {['2024', '2025', '2026', '2027', '2028', '2029'].map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Billing Address */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>Billing Address</div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>
          The billing address associated with your payment method
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox id="same-addr" defaultChecked />
        <Label htmlFor="same-addr" style={{ margin: 0, fontWeight: 400 }}>Same as shipping address</Label>
      </div>

      <Separator />

      {/* Comments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="pay-comments">Comments</Label>
        <Textarea id="pay-comments" rows={2} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button style={{ flex: 1 }}>Submit</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  );
}
