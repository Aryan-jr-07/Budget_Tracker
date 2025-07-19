import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-icon">
        <Sun
          className={`sun transition-all ${
            theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        />
        <Moon
          className={`moon transition-all ${
            theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  );
};