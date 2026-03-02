import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from './Sidebar';

// Mock matchMedia for SSR/test environments
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false, // desktop by default
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

function renderSidebar() {
  return render(
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span>App Name</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Nav</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Home</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span>Footer</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
        <div>Main Content</div>
      </SidebarInset>
    </SidebarProvider>,
  );
}

describe('Sidebar', () => {
  it('renders sidebar with menu items', () => {
    renderSidebar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    renderSidebar();
    expect(screen.getByText('App Name')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders group label', () => {
    renderSidebar();
    expect(screen.getByText('Nav')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    renderSidebar();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders trigger button', () => {
    renderSidebar();
    expect(screen.getByText('Toggle Sidebar')).toBeInTheDocument();
  });

  it('marks active menu button', () => {
    renderSidebar();
    const homeButton = screen.getByText('Home').closest('button');
    expect(homeButton).toHaveAttribute('data-active', 'true');
  });
});
