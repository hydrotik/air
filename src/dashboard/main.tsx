import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@hydrotik/theme-provider';
import { CompactModeProvider } from './contexts/CompactModeContext';
import { DashboardPage } from './pages/DashboardPage';
import { CompactDashboardPage } from './pages/CompactDashboardPage';

// Detect compact mode from query param or Electron environment
const params = new URLSearchParams(window.location.search);
const isCompact =
  params.get('compact') === 'true' || (window as { __ELECTRON__?: unknown }).__ELECTRON__ === true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <CompactModeProvider value={isCompact}>
        {isCompact ? <CompactDashboardPage /> : <DashboardPage />}
      </CompactModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
