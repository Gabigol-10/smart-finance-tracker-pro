import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiTrendingUp, FiTrendingDown, FiTarget, 
  FiCalendar, FiBarChart2, FiFileText, FiSettings,
  FiUser, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';

const PremiumSidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard', color: 'text-blue-500' },
    { path: '/incomes', icon: <FiTrendingUp />, label: 'Ingresos', color: 'text-green-500' },
    { path: '/expenses', icon: <FiTrendingDown />, label: 'Gastos', color: 'text-red-500' },
    { path: '/savings', icon: <FiTarget />, label: 'Metas', color: 'text-purple-500' },
    { path: '/calendar', icon: <FiCalendar />, label: 'Calendario', color: 'text-yellow-500' },
    { path: '/analytics', icon: <FiBarChart2 />, label: 'Análisis', color: 'text-indigo-500' },
    { path: '/reports', icon: <FiFileText />, label: 'Reportes', color: 'text-pink-500' },
  ];

  const bottomItems = [
    { path: '/profile', icon: <FiUser />, label: 'Perfil' },
    { path: '/settings', icon: <FiSettings />, label: 'Configuración' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 z-50 flex flex-col
          ${isCollapsed ? 'w-20' : 'w-72'} transition-all duration-300`}
        style={{
          backdropFilter: 'blur(20px)',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-base)',
        }}
        initial={false}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -300,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
          <motion.div 
            className="flex items-center gap-3"
            animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              💰
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Smart Finance
                </h1>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Tracker Pro
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 shadow-lg' 
                    : 'hover:bg-white/5'
                  }
                  ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? item.label : ''}
              >
                {({ isActive }) => (
                  <>
                    <span 
                      className={`text-xl transition-colors ${
                        isActive ? item.color : 'text-gray-400 group-hover:text-gray-200'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span 
                        className={`font-medium transition-colors ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6" style={{ height: '1px', background: 'var(--border-base)' }} />

          {/* Bottom Items */}
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white/10 border border-white/10' 
                    : 'hover:bg-white/5'
                  }
                  ${isCollapsed ? 'justify-center' : ''}`
                }
                title={isCollapsed ? item.label : ''}
              >
                <span className="text-xl text-gray-400 group-hover:text-gray-200">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium text-gray-400 group-hover:text-gray-200">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Collapse Button - Desktop Only */}
        <div className="hidden lg:block p-4 border-t" style={{ borderColor: 'var(--border-base)' }}>
          <button
            onClick={toggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            {!isCollapsed && <span className="text-sm">Contraer</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default PremiumSidebar;
