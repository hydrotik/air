import type { ThemeName, BrandName } from '@hydrotik/tokens';

export type { ThemeName, BrandName };

export interface ThemeContextValue {
  /** Current theme name */
  theme: ThemeName;
  /** Current brand name */
  brand: BrandName;
  /** Toggle or directly set theme */
  setTheme: (theme: ThemeName) => void;
  /** Set brand */
  setBrand: (brand: BrandName) => void;
}

export interface ThemeProviderProps {
  /** Initial theme. Defaults to 'dark'. */
  defaultTheme?: ThemeName;
  /** Initial brand. Defaults to 'default'. */
  defaultBrand?: BrandName;
  /**
   * Storage key for persisting theme preference.
   * Set to null to disable persistence.
   * @default 'hydrotik-theme'
   */
  storageKey?: string | null;
  children: React.ReactNode;
}
