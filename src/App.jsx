import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import FinanceDashboard from './components/FinanceDashboard';
import IncomeManager from './components/IncomeManager';
import ExpenseManager from './components/ExpenseManager';
import SavingsGoals from './components/SavingsGoals';
import FinancialCalendar from './components/FinancialCalendar';
import AnalyticsPanel from './components/AnalyticsPanel';
import ReportsCenter from './components/ReportsCenter';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <FinanceProvider>
      <Router>
        <div className="app-container">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="main-content">
            <Navbar toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="/" element={<FinanceDashboard />} />
              <Route path="/incomes" element={<IncomeManager />} />
              <Route path="/expenses" element={<ExpenseManager />} />
              <Route path="/savings" element={<SavingsGoals />} />
              <Route path="/calendar" element={<FinancialCalendar />} />
              <Route path="/analytics" element={<AnalyticsPanel />} />
              <Route path="/reports" element={<ReportsCenter />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FinanceProvider>
  );
}

export default App;
