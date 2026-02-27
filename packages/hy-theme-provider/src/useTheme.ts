'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue } from './types';

/**
 * Hook to read and update the current theme and brand.
 *
 * Must be used inside a `<ThemeProvider>`.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme } = useTheme();
 *   return (
 *     <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
 *       Switch to {theme === 'dark' ? 'light' : 'dark'} mode
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
