'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { ThemeConfig, getTheme, ThemeId } from '@/themes';

interface ThemeContextValue {
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: getTheme('aurora'),
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  themeId: ThemeId | string;
  children: React.ReactNode;
}

export function ThemeProvider({ themeId, children }: ThemeProviderProps) {
  const theme = getTheme(themeId);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    return () => {
      Object.keys(theme.vars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div
        className="themed-root"
        style={
          Object.fromEntries(
            Object.entries(theme.vars).map(([k, v]) => [k, v])
          ) as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
