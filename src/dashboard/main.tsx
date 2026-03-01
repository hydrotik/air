import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@hydrotik/theme-provider';
import { DashboardPage } from './pages/DashboardPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <DashboardPage />
    </ThemeProvider>
  </React.StrictMode>,
);
