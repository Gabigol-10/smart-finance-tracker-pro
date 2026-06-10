import React from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPercent, FiArrowUpRight, FiArrowDownRight, FiAward } from 'react-icons/fi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const FinanceDashboard = () => {
  const { incomes, expenses, goals, alerts } = useFinance();

  // Calculations
  const totalIncomes = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncomes - totalExpenses;
  const savingsPercent = totalIncomes > 0 ? ((balance / totalIncomes) * 100) : 0;
  
  const totalSavingsGoalAmount = goals.reduce((sum, item) => sum + item.currentAmount, 0);

  // Recent transactions (sorted by date desc, max 5)
  const allTransactions = [
    ...incomes.map(i => ({ ...i, type: 'income' })),
    ...expenses.map(e => ({ ...e, type: 'expense' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const recentTransactions = allTransactions.slice(0, 5);

  // Group chart data for the last 6 days or transactions (we can generate monthly or transaction data)
  // Let's create visual trend data
  const chartData = [
    { name: 'Ene', ingresos: totalIncomes * 0.8, gastos: totalExpenses * 0.9 },
    { name: 'Feb', ingresos: totalIncomes * 0.9, gastos: totalExpenses * 0.8 },
    { name: 'Mar', ingresos: totalIncomes * 0.75, gastos: totalExpenses * 0.85 },
    { name: 'Abr', ingresos: totalIncomes * 1.1, gastos: totalExpenses * 0.95 },
    { name: 'May', ingresos: totalIncomes * 0.95, gastos: totalExpenses * 1.0 },
    { name: 'Jun', ingresos: totalIncomes, gastos: totalExpenses }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <span className="text-success fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Resumen Ejecutivo</span>
          <h2 className="mb-0 fw-extrabold">Panel de Control</h2>
        </div>
        <div className="bg-success-subtle text-success border border-success border-opacity-25 rounded-pill px-3 py-1 fw-semibold d-flex align-items-center gap-2" style={{ fontSize: '0.9rem' }}>
          <span className="position-relative d-inline-flex" style={{ width: '8px', height: '8px' }}>
            <span className="animate-ping position-absolute inline-flex h-100 w-100 rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          Sincronizado con LocalStorage
        </div>
      </div>

      {/* Alerts Banners */}
      {alerts.length > 0 && (
        <div className="row mb-3">
          <div className="col-12">
            {alerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className={`alert alert-${alert.type === 'danger' ? 'danger' : alert.type} glass-panel border-0 text-dark-mode-text d-flex align-items-center gap-3 mb-2 py-3 shadow-sm`} style={{ color: 'var(--text-primary)' }}>
                <div>
                  {alert.type === 'danger' && <FiTrendingDown className="text-danger" size={24} />}
                  {alert.type === 'success' && <FiAward className="text-success" size={24} />}
                  {alert.type === 'warning' && <FiPercent className="text-warning" size={24} />}
                  {alert.type === 'info' && <FiDollarSign className="text-info" size={24} />}
                </div>
                <div>
                  <h6 className="alert-heading mb-0 fw-bold">{alert.title}</h6>
                  <small className="text-secondary">{alert.message}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cards KPI Grid */}
      <div className="row g-4 mb-4">
        {/* KPI: Balance */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span className="card-title-sub">Balance Total</span>
                <h3 className="mb-0 mt-2 fw-bold text-gradient">${balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="p-3 rounded-3 bg-opacity-10 bg-success text-success" style={{ backgroundColor: 'var(--badge-bg-income)' }}>
                <FiDollarSign size={22} />
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className={balance >= 0 ? "text-success d-flex align-items-center fw-semibold" : "text-danger d-flex align-items-center fw-semibold"}>
                {balance >= 0 ? <FiArrowUpRight /> : <FiArrowDownRight />}
                {balance >= 0 ? 'Saludable' : 'Negativo'}
              </span>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>de flujo acumulado</span>
            </div>
          </div>
        </div>

        {/* KPI: Incomes */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span className="card-title-sub">Ingresos Totales</span>
                <h3 className="mb-0 mt-2 fw-bold text-success">${totalIncomes.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="p-3 rounded-3 bg-opacity-10 bg-success text-success" style={{ backgroundColor: 'var(--badge-bg-income)' }}>
                <FiTrendingUp size={22} />
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="text-success d-flex align-items-center fw-semibold">
                <FiArrowUpRight /> +100%
              </span>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>del mes actual</span>
            </div>
          </div>
        </div>

        {/* KPI: Expenses */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span className="card-title-sub">Gastos Totales</span>
                <h3 className="mb-0 mt-2 fw-bold text-danger">${totalExpenses.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="p-3 rounded-3 bg-opacity-10 bg-danger text-danger" style={{ backgroundColor: 'var(--badge-bg-expense)' }}>
                <FiTrendingDown size={22} />
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="text-danger d-flex align-items-center fw-semibold">
                <FiArrowDownRight /> {totalIncomes > 0 ? ((totalExpenses / totalIncomes) * 100).toFixed(0) : 0}%
              </span>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>de tus ingresos</span>
            </div>
          </div>
        </div>

        {/* KPI: Savings */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="glass-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span className="card-title-sub">Ahorros y Metas</span>
                <h3 className="mb-0 mt-2 fw-bold text-primary">${totalSavingsGoalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="p-3 rounded-3 bg-opacity-10 bg-primary text-primary" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                <FiPercent size={22} />
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="text-primary d-flex align-items-center fw-semibold">
                <FiArrowUpRight /> {savingsPercent.toFixed(1)}%
              </span>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>tasa de ahorro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Recent Transactions */}
      <div className="row g-4 mb-4">
        {/* Trend Area Chart */}
        <div className="col-12 col-xl-8">
          <div className="glass-panel p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Evolución e Historial Financiero</h5>
              <div className="d-flex gap-2">
                <span className="badge bg-success-subtle text-success border border-success border-opacity-10 px-2 py-1">Ingresos</span>
                <span className="badge bg-danger-subtle text-danger border border-danger border-opacity-10 px-2 py-1">Gastos</span>
              </div>
            </div>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="recharts-custom-tooltip">
                          <p className="fw-bold mb-1">{payload[0].payload.name}</p>
                          <p className="text-success mb-0">Ingresos: ${payload[0].value.toFixed(2)}</p>
                          <p className="text-danger mb-0">Gastos: ${payload[1].value.toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Area type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="col-12 col-xl-4">
          <div className="glass-panel p-4 h-100">
            <h5 className="mb-4">Movimientos Recientes</h5>
            {recentTransactions.length === 0 ? (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center py-5">
                <FiDollarSign size={40} className="text-secondary opacity-50 mb-2" />
                <span className="text-secondary small">Sin transacciones registradas</span>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="d-flex justify-content-between align-items-center border-bottom pb-2" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className={`p-2 rounded-3 ${tx.type === 'income' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tx.type === 'income' ? <FiArrowUpRight size={20} /> : <FiArrowDownRight size={20} />}
                      </div>
                      <div>
                        <span className="fw-semibold d-block text-truncate" style={{ maxWidth: '140px', fontSize: '0.9rem' }}>{tx.description}</span>
                        <span className="text-secondary small d-block">{tx.category} • {tx.date}</span>
                      </div>
                    </div>
                    <span className={`fw-bold ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceDashboard;
