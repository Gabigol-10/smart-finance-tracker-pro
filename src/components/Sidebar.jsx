import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiTrendingUp, FiTrendingDown, FiTarget, FiCalendar, FiPieChart, FiFileText } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <FiGrid size={18} /> },
    { path: '/incomes', label: 'Ingresos', icon: <FiTrendingUp size={18} /> },
    { path: '/expenses', label: 'Gastos', icon: <FiTrendingDown size={18} /> },
    { path: '/savings', label: 'Ahorros y Metas', icon: <FiTarget size={18} /> },
    { path: '/calendar', label: 'Calendario', icon: <FiCalendar size={18} /> },
    { path: '/analytics', label: 'Análisis', icon: <FiPieChart size={18} /> },
    { path: '/reports', label: 'Reportes y Exportación', icon: <FiFileText size={18} /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? '' : 'sidebar-collapsed'}`}>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4 px-2">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-success text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <FiTarget size={22} />
            </div>
            <div>
              <span className="h5 mb-0 fw-bold d-block">SmartFinance</span>
              <span className="text-success fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>TRACKER PRO</span>
            </div>
          </div>
          <button className="btn d-lg-none text-white border-0" onClick={toggleSidebar}>✕</button>
        </div>

        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 992) toggleSidebar();
              }}
              className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-top pt-3 d-flex align-items-center justify-content-between px-2">
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px' }}>
            U
          </div>
          <div>
            <span className="fw-semibold d-block" style={{ fontSize: '0.85rem' }}>Usuario Demo</span>
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Pro Plan</span>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;
