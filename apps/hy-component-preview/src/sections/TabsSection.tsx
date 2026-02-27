import React from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
} from '@hydrotik/design-system';

export function TabsSection() {
  return (
    <Tabs defaultValue="account" style={{ maxWidth: '460px' }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here. Click save when you&apos;re done.</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="tab-name">Name</Label>
                <Input id="tab-name" defaultValue="Pedro Duarte" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="tab-username">Username</Label>
                <Input id="tab-username" defaultValue="@peduarte" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="current-pw">Current password</Label>
                <Input id="current-pw" type="password" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="new-pw">New password</Label>
                <Input id="new-pw" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          <CardContent style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', opacity: 0.6 }}>
              No team members yet. Invite someone to get started.
            </div>
          </CardContent>
          <CardFooter style={{ justifyContent: 'center' }}>
            <Button variant="outline">Invite Members</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
