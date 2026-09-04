import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
