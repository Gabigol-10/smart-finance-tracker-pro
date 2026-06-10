import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiSun, FiMoon, FiBell, FiSearch, FiUser } from 'react-icons/fi';

const PremiumNavbar = ({ toggleSidebar, isCollapsed }) => {
  const [theme, setTheme] = useState('dark');
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove('dark-mode', 'light-mode');
    document.documentElement.classList.add(`${newTheme}-mode`);
  };

  const notifications = [
    { id: 1, text: 'Nuevo ingreso registrado: $1,500', time: 'Hace 5 min', type: 'success' },
    { id: 2, text: 'Meta de ahorro al 75%', time: 'Hace 1 hora', type: 'info' },
    { id: 3, text: 'Gasto elevado detectado', time: 'Hace 2 horas', type: 'warning' },
  ];

  return (
    <motion.header
      className="sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{
        background: 'var(--glass-bg)',
        borderBottom: '1px solid var(--border-base)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div 
        className={`flex items-center justify-between px-6 py-4 transition-all duration-300
          ${isCollapsed ? 'ml-20' : 'ml-72'} lg:ml-0`}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <FiMenu size={24} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border"
            style={{ borderColor: 'var(--border-base)' }}
          >
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar transacciones..."
              className="bg-transparent border-none outline-none w-64"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ color: 'var(--text-primary)' }}
            >
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden"
                style={{
                  background: 'var(--card-bg)',
                  borderColor: 'var(--border-base)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-4 border-b" style={{ borderColor: 'var(--border-base)' }}>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Notificaciones
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b hover:bg-white/5 transition-colors cursor-pointer"
                      style={{ borderColor: 'var(--border-base)' }}
                    >
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        {notif.text}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t" style={{ borderColor: 'var(--border-base)' }}>
                  <button className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile */}
          <motion.button
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
              JD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                John Doe
              </p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                john@example.com
              </p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default PremiumNavbar;
