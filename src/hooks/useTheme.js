import { useContext } from 'react';
import { AuthContext } from '../context/Context';

export const useTheme = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a Provider');
  }

  const { theme, toggleTheme } = context;
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return {
    theme,
    isDark,
    isLight,
    toggleTheme,
  };
};
