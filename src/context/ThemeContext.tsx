// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}) => {
  // Estado para el tema actual
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      return savedTheme || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // Estado para la preferencia del sistema
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Calcula el tema resuelto basado en el tema actual y la preferencia del sistema
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Manejador para cambios en la preferencia del sistema
  const handleSystemThemeChange = useCallback((e: MediaQueryListEvent) => {
    setSystemTheme(e.matches ? 'dark' : 'light');
  }, []);

  // Efecto para manejar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [handleSystemThemeChange]);

  // Efecto para actualizar el DOM y localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [theme, resolvedTheme, storageKey]);

  // Función para establecer el tema
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Función para alternar entre temas
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      if (prev === 'system') return systemTheme === 'light' ? 'dark' : 'light';
      return prev === 'light' ? 'dark' : 'light';
    });
  }, [systemTheme]);

  // Previene el flash de tema incorrecto durante la hidratación
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        systemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook personalizado para aplicar clases condicionales basadas en el tema
export const useThemeValue = <L, D>(lightValue: L, darkValue: D): L | D => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'light' ? lightValue : darkValue;
};