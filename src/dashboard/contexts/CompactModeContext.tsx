import React, { createContext, use } from 'react';

const CompactModeContext = createContext(false);

interface CompactModeProviderProps {
  value: boolean;
  children: React.ReactNode;
}

export const CompactModeProvider: React.FC<CompactModeProviderProps> = ({ value, children }) => (
  <CompactModeContext value={value}>{children}</CompactModeContext>
);

export const useCompactMode = (): boolean => use(CompactModeContext);
