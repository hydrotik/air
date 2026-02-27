import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'Hydrotik Design System',
    brandUrl: 'https://github.com/hydrotik/hydrotik',

    // UI colors — match our dark token palette
    appBg: '#0e0f11',
    appContentBg: '#17181c',
    appPreviewBg: '#0e0f11',
    appBorderColor: '#2e3038',
    appBorderRadius: 6,

    // Typography
    fontBase: "'Inter', system-ui, -apple-system, sans-serif",
    fontCode: "'JetBrains Mono', 'Fira Code', Menlo, monospace",

    // Text
    textColor: '#e8e9ec',
    textMutedColor: '#8b8d98',
    textInverseColor: '#0e0f11',

    // Toolbar + form
    barBg: '#17181c',
    barTextColor: '#8b8d98',
    barHoverColor: '#e8e9ec',
    barSelectedColor: '#3b82f6',

    // Form
    inputBg: '#1f2025',
    inputBorder: '#2e3038',
    inputTextColor: '#e8e9ec',
    inputBorderRadius: 6,

    // Brand color
    colorPrimary: '#3b82f6',
    colorSecondary: '#3b82f6',
  },
});
