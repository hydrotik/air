import React, { useState } from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  FieldMessage,
  Textarea,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  TableWrapper,
  Table,
  TableHeader as THead,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@hydrotik/design-system';

const sectionStyle: React.CSSProperties = {
  marginBottom: '48px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  opacity: 0.5,
  marginBottom: '16px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
};

export default function App() {
  const { theme, setTheme } = useTheme();
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <TooltipProvider>
      <ToastProvider>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Hydrotik DS</h1>
              <p style={{ opacity: 0.6, marginTop: '4px', fontSize: '14px' }}>Component Preview</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </Button>
          </div>

          {/* Buttons */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Buttons</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={rowStyle}>
                <Button variant="primary">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div style={rowStyle}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Badges */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Badges</p>
            <div style={rowStyle}>
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Inputs */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Form Controls</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '640px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="preview-name">Full name</Label>
                <Input id="preview-name" placeholder="Jane Smith" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="preview-email">Email</Label>
                <Input id="preview-email" type="email" placeholder="jane@company.com" error />
                <FieldMessage intent="error">Enter a valid email address.</FieldMessage>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="preview-role">Role</Label>
                <Select>
                  <SelectTrigger id="preview-role">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Label htmlFor="preview-bio">Bio</Label>
                <Textarea id="preview-bio" placeholder="Tell us about yourself..." rows={3} />
              </div>
            </div>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Cards */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Cards</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {(['flat', 'raised', 'elevated'] as const).map((elevation) => (
                <Card key={elevation} elevation={elevation}>
                  <CardHeader>
                    <CardTitle style={{ textTransform: 'capitalize' }}>{elevation}</CardTitle>
                    <CardDescription>Card with {elevation} elevation.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p style={{ fontSize: '13px', opacity: 0.7 }}>Content area.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">View</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Tabs */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Tabs</p>
            <Tabs defaultValue="overview" style={{ maxWidth: '480px' }}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
                    Overview content goes here.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
                    Analytics content goes here.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardContent style={{ padding: '16px', fontSize: '14px', opacity: 0.8 }}>
                    Settings content goes here.
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Overlays row */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Overlays &amp; Popovers</p>
            <div style={rowStyle}>
              {/* Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>This is a confirmation dialog. Are you sure you want to proceed?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover for Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a helpful tooltip.</p>
                </TooltipContent>
              </Tooltip>

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Dropdown ▾</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Toast */}
              <Button variant="outline" onClick={() => setToastOpen(true)}>
                Show Toast
              </Button>
            </div>
          </section>

          <Separator />
          <div style={{ height: '32px' }} />

          {/* Table */}
          <section style={sectionStyle}>
            <p style={headingStyle}>Table</p>
            <TableWrapper>
              <Table>
                <THead>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead data-align="right">Joined</TableHead>
                  </TableRow>
                </THead>
                <TableBody>
                  {[
                    { name: 'Jane Smith', role: 'Admin', status: 'active', joined: 'Jan 2024' },
                    { name: 'Bob Lee', role: 'Editor', status: 'inactive', joined: 'Mar 2024' },
                    { name: 'Alice Chen', role: 'Viewer', status: 'active', joined: 'Jun 2024' },
                  ].map((user) => (
                    <TableRow key={user.name}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell data-align="right">{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableWrapper>
          </section>
        </div>

        {/* Toast */}
        <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success" duration={3000}>
          <ToastTitle>Action complete</ToastTitle>
          <ToastDescription>Your changes were saved successfully.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  );
}
