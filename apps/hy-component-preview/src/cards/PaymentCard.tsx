import React from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Input, Label, Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
  Checkbox, Textarea, Button,
} from '@hydrotik/design-system';

export function PaymentCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>All transactions are secure and encrypted</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Label htmlFor="pay-name">Name on Card</Label>
            <Input id="pay-name" placeholder="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Label htmlFor="pay-number">Card Number</Label>
            <Input id="pay-number" placeholder="" />
            <span style={{ fontSize: '12px', opacity: 0.5 }}>Enter your 16-digit number.</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Label>Month</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="MM" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Label>Year</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="YYYY" /></SelectTrigger>
                <SelectContent>
                  {['2025', '2026', '2027', '2028', '2029'].map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Label>CVV</Label>
              <Input placeholder="" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            <Label style={{ fontWeight: 600 }}>Billing Address</Label>
            <span style={{ fontSize: '12px', opacity: 0.5, marginTop: '-8px' }}>The billing address associated with your payment method</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox id="same-address" defaultChecked />
              <Label htmlFor="same-address" style={{ margin: 0, fontWeight: 400 }}>Same as shipping address</Label>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Label htmlFor="pay-comments">Comments</Label>
            <Textarea id="pay-comments" rows={2} />
          </div>
        </div>
      </CardContent>
      <CardFooter style={{ gap: '8px' }}>
        <Button style={{ flex: 1 }}>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
}
