import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from './Sidebar';
import { Home, Settings, Users, FileText, Bell, LogOut } from 'lucide-react';

const meta = {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Documents' },
  { icon: Users, label: 'Team' },
  { icon: Bell, label: 'Notifications', badge: '3' },
  { icon: Settings, label: 'Settings' },
];

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-primary, #3b82f6)' }} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>Acme Inc</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.label}>
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut size={16} />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <SidebarTrigger />
          <h1 style={{ margin: 0, fontSize: 18 }}>Main Content</h1>
        </div>
        <div style={{ padding: '0 16px' }}>
          <p>This is the main content area beside the sidebar.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

export const CollapsedByDefault: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div style={{ padding: 16 }}>
          <SidebarTrigger />
          <p style={{ marginTop: 16 }}>Sidebar starts collapsed. Use Cmd+B to toggle.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
