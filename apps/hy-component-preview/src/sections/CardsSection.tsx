import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Separator,
  Progress,
} from '@hydrotik/design-system';
import { CreditCard, Plus, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Sofia Davis', email: 's.davis@example.com', initials: 'SD', role: 'Owner' },
  { name: 'Jackson Lee', email: 'j.lee@example.com', initials: 'JL', role: 'Member' },
  { name: 'Isabella Nguyen', email: 'i.nguyen@example.com', initials: 'IN', role: 'Member' },
];

export function CardsSection() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
      {/* Payment method card */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Add a new payment method to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Label htmlFor="card-name">Name on card</Label>
              <Input id="card-name" placeholder="Full name" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Label htmlFor="card-number">Card number</Label>
              <Input id="card-number" placeholder="•••• •••• •••• ••••" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
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
                  <SelectTrigger><SelectValue placeholder="YY" /></SelectTrigger>
                  <SelectContent>
                    {['25', '26', '27', '28', '29'].map((y) => (
                      <SelectItem key={y} value={y}>20{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="card-cvv">CVV</Label>
                <Input id="card-cvv" placeholder="•••" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button style={{ width: '100%' }}><CreditCard size={16} /> Submit</Button>
        </CardFooter>
      </Card>

      {/* Team members card */}
      <Card>
        <CardHeader>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} /> Team Members
          </CardTitle>
          <CardDescription>Invite your team members to collaborate.</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teamMembers.map((m) => (
              <div key={m.email} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar size="sm">
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{m.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.6 }}>{m.email}</div>
                </div>
                <Badge variant={m.role === 'Owner' ? 'default' : 'secondary'}>{m.role}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" style={{ width: '100%' }}><Plus size={16} /> Invite Member</Button>
        </CardFooter>
      </Card>

      {/* Stats card */}
      <Card>
        <CardHeader>
          <CardTitle>Storage</CardTitle>
          <CardDescription>You&apos;ve used 52% of your available storage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={52} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
            <span>5.2 GB used</span>
            <span>10 GB total</span>
          </div>
          <Separator style={{ margin: '16px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>1,284</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>Files uploaded</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>48</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>Active projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
