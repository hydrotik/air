import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { ThemeProvider } from '@hydrotik/theme-provider';
// global baseline styles (vanilla-extract) — processed by Vite plugin
import '@hydrotik/design-system/global.css.ts';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as 'dark' | 'light') ?? 'dark';
      return (
        <ThemeProvider defaultTheme={theme}>
          <div style={{ padding: '2rem', minHeight: '100vh' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
