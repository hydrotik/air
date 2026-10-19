import type React from 'react';

/** Stand-in for the theme provider: renders children only. */
export const ThemeProvider: React.FC<{ children?: React.ReactNode; defaultTheme?: string }> = ({
  children,
}) => <>{children}</>;
