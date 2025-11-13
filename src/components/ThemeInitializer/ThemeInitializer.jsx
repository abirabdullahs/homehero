import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeInitializer = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to HTML element
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    }
  }, [theme]);

  return null;
};
