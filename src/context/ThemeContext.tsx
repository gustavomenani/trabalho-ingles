import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContextDef';
import type { Theme } from './ThemeContextDef';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('etec_en_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('etec_en_sound');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('etec_en_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('etec_en_sound', String(soundEnabled));
  }, [soundEnabled]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, soundEnabled, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
};
