// SOURCE: https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(examples)/dashboard-03/settings/page.tsx
// Settings page with Tabs (Account, Security, Notifications, Privacy)
// Uses: Card, Tabs, Input, Label, Select, Switch, Checkbox, Table, Button

import { type Metadata } from "next"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Switch } from "@/registry/new-york-v4/ui/switch"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/registry/new-york-v4/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}

const timezones = [
  {
    label: "Americas",
    timezones: [
      { value: "America/New_York", label: "(GMT-5) New York" },
      { value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
      { value: "America/Chicago", label: "(GMT-6) Chicago" },
      { value: "America/Toronto", label: "(GMT-5) Toronto" },
      { value: "America/Vancouver", label: "(GMT-8) Vancouver" },
      { value: "America/Sao_Paulo", label: "(GMT-3) São Paulo" },
    ],
  },
  {
    label: "Europe",
    timezones: [
      { value: "Europe/London", label: "(GMT+0) London" },
      { value: "Europe/Paris", label: "(GMT+1) Paris" },
      { value: "Europe/Berlin", label: "(GMT+1) Berlin" },
      { value: "Europe/Rome", label: "(GMT+1) Rome" },
      { value: "Europe/Madrid", label: "(GMT+1) Madrid" },
      { value: "Europe/Amsterdam", label: "(GMT+1) Amsterdam" },
    ],
  },
  {
    label: "Asia/Pacific",
    timezones: [
      { value: "Asia/Tokyo", label: "(GMT+9) Tokyo" },
      { value: "Asia/Shanghai", label: "(GMT+8) Shanghai" },
      { value: "Asia/Singapore", label: "(GMT+8) Singapore" },
      { value: "Asia/Dubai", label: "(GMT+4) Dubai" },
      { value: "Australia/Sydney", label: "(GMT+11) Sydney" },
      { value: "Asia/Seoul", label: "(GMT+9) Seoul" },
    ],
  },
] as const

const loginHistory = [
  { date: "2024-01-01", ip: "192.168.1.1", location: "New York, USA" },
  { date: "2023-12-29", ip: "172.16.0.100", location: "London, UK" },
  { date: "2023-12-28", ip: "10.0.0.50", location: "Toronto, Canada" },
  { date: "2023-12-25", ip: "192.168.2.15", location: "Sydney, Australia" },
] as const

const activeSessions = [
  { device: "MacBook Pro", browser: "Chrome", os: "macOS" },
  { device: "iPhone", browser: "Safari", os: "iOS" },
  { device: "iPad", browser: "Safari", os: "iOS" },
  { device: "Android Phone", browser: "Chrome", os: "Android" },
] as const

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Tabs defaultValue="account" className="px-4 lg:px-6">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy" disabled>Privacy</TabsTrigger>
            </TabsList>
            {/* Account Tab */}
            <TabsContent value="account" className="flex flex-col gap-4 pt-2 md:gap-6 md:pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Make changes to your account here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <Label>Name</Label>
                      <FieldControl>
                        <Input defaultValue="shadcn" />
                      </FieldControl>
                      <FieldDescription>This is your public display name.</FieldDescription>
                    </Field>
                    <Field>
                      <Label>Email</Label>
                      <FieldControl>
                        <Input defaultValue="m@example.com" />
                      </FieldControl>
                    </Field>
                    <Field>
                      <Label>Timezone</Label>
                      <FieldControl>
                        <Select defaultValue="America/New_York">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map((timezone) => (
                              <SelectGroup key={timezone.label}>
                                <SelectLabel>{timezone.label}</SelectLabel>
                                {timezone.timezones.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                      </FieldControl>
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Notifications Tab */}
            <TabsContent value="notifications" className="flex flex-col gap-4 pt-2 md:gap-6 md:pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <Label>Notification Channels</Label>
                      <FieldControl className="flex gap-4">
                        <Label className="flex items-center gap-2"><Checkbox defaultChecked />Email</Label>
                        <Label className="flex items-center gap-2"><Checkbox defaultChecked />SMS</Label>
                        <Label className="flex items-center gap-2"><Checkbox />Push</Label>
                      </FieldControl>
                      <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
                    </Field>
                    <Field>
                      <Label>Notification Types</Label>
                      <FieldControl className="flex flex-col gap-4">
                        <Label className="flex items-center gap-2"><Switch defaultChecked />Account Activity</Label>
                        <Label className="flex items-center gap-2"><Switch defaultChecked />Security Alerts</Label>
                        <Label className="flex items-center gap-2"><Switch />Marketing & Promotions</Label>
                      </FieldControl>
                      <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security" className="flex flex-col gap-4 pt-2 md:gap-6 md:pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Make changes to your security settings here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <Label>Current Password</Label>
                      <FieldControl>
                        <Input type="password" defaultValue="password" />
                      </FieldControl>
                      <FieldDescription>This is your current password.</FieldDescription>
                    </Field>
                    <Field>
                      <Label>New Password</Label>
                      <FieldControl><Input type="password" /></FieldControl>
                    </Field>
                    <Field>
                      <Label>Confirm Password</Label>
                      <FieldControl><Input type="password" /></FieldControl>
                    </Field>
                    <Field className="flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable two-factor authentication</Label>
                        <FieldDescription>
                          This will add an extra layer of security to your account.
                          Make this an extra long description to test the layout.
                        </FieldDescription>
                      </div>
                      <Switch />
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent login activities on your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden sm:table-cell">IP</TableHead>
                        <TableHead>Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loginHistory.map((login) => (
                        <TableRow key={login.date}>
                          <TableCell>
                            {new Date(login.date).toLocaleDateString("en-US", {
                              year: "numeric", month: "long", day: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{login.ip}</TableCell>
                          <TableCell>{login.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Current active sessions on your account.</CardDescription>
                  <CardAction>
                    <Button variant="outline" size="sm">Manage Sessions</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Browser</TableHead>
                        <TableHead>OS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeSessions.map((session) => (
                        <TableRow key={session.device}>
                          <TableCell>{session.device}</TableCell>
                          <TableCell>{session.browser}</TableCell>
                          <TableCell>{session.os}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function FieldGroup({ children }: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-6">{children}</div>
}

function Field({ children, className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props}>{children}</div>
}

function FieldControl({ children, className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props}>{children}</div>
}

function FieldDescription({ children, className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground text-[0.8rem]", className)} {...props}>{children}</p>
}
