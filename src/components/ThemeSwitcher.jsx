import React from 'react';
import { useFinance } from '../hooks/useFinance';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useFinance();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn btn-link nav-link-custom border-0 p-2 d-flex align-items-center justify-content-center"
      style={{ borderRadius: '12px', width: '42px', height: '42px', background: 'rgba(255, 255, 255, 0.05)' }}
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <FiSun size={20} className="text-warning" />
      ) : (
        <FiMoon size={20} className="text-primary" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
