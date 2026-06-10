import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import PremiumSidebar from './components/premium/PremiumSidebar';
import PremiumNavbar from './components/premium/PremiumNavbar';
import PremiumDashboard from './components/premium/PremiumDashboard';
import IncomeManager from './components/IncomeManager';
import ExpenseManager from './components/ExpenseManager';
import SavingsGoals from './components/SavingsGoals';
import FinancialCalendar from './components/FinancialCalendar';
import AnalyticsPanel from './components/AnalyticsPanel';
import ReportsCenter from './components/ReportsCenter';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.add('dark-mode');
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <FinanceProvider>
      <Router>
        <div className="app-container">
          <PremiumSidebar 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar}
            isCollapsed={sidebarCollapsed}
            toggleCollapse={toggleCollapse}
          />
          
          <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <PremiumNavbar toggleSidebar={toggleSidebar} isCollapsed={sidebarCollapsed} />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<PremiumDashboard />} />
                <Route path="/incomes" element={<IncomeManager />} />
                <Route path="/expenses" element={<ExpenseManager />} />
                <Route path="/savings" element={<SavingsGoals />} />
                <Route path="/calendar" element={<FinancialCalendar />} />
                <Route path="/analytics" element={<AnalyticsPanel />} />
                <Route path="/reports" element={<ReportsCenter />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;
