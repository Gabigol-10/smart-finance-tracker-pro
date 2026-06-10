import React from 'react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useFinance } from '../hooks/useFinance';

const Navbar = ({ toggleSidebar }) => {
  const { alerts } = useFinance();

  return (
    <nav className="navbar navbar-expand-lg d-lg-none fixed-top glass-panel px-3 py-2" style={{ zIndex: 999, borderBottom: '1px solid var(--border-color)', margin: '10px', borderRadius: '14px' }}>
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <button className="btn p-2 text-primary border-0" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <span className="h5 mb-0 fw-bold">SmartFinance</span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <FiBell size={20} className="text-secondary" />
            {alerts.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1" style={{ fontSize: '0.6rem' }}>
                {alerts.length}
              </span>
            )}
          </div>
          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
            U
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
