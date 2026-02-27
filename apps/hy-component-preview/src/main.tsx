import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@hydrotik/theme-provider';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
