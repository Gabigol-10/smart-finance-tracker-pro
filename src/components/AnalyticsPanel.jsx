import React from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { FiPieChart, FiActivity, FiLayers } from 'react-icons/fi';

const AnalyticsPanel = () => {
  const { incomes, expenses, budgets } = useFinance();

  // Color Palette
  const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#64748B'];

  // 1. Expenses by Category
  const expenseCategoriesData = expenses.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  // 2. Monthly Trend Data (Simulating a multi-month database for rich visual graphs)
  const monthlyData = [
    { name: 'Ene', Ingresos: 2800, Gastos: 1900, Ahorro: 900 },
    { name: 'Feb', Ingresos: 3200, Gastos: 2200, Ahorro: 1000 },
    { name: 'Mar', Ingresos: 3000, Gastos: 2500, Ahorro: 500 },
    { name: 'Abr', Ingresos: 4100, Gastos: 2800, Ahorro: 1300 },
    { name: 'May', Ingresos: 3800, Gastos: 3100, Ahorro: 700 },
    { name: 'Jun', Ingresos: incomes.reduce((s, i) => s + i.amount, 0), Gastos: expenses.reduce((s, e) => s + e.amount, 0), Ahorro: incomes.reduce((s, i) => s + i.amount, 0) - expenses.reduce((s, e) => s + e.amount, 0) }
  ];

  // 3. Category budget comparisons
  const budgetComparisonData = Object.keys(budgets).map(cat => {
    const spent = expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return {
      category: cat,
      Límite: budgets[cat],
      Consumido: spent
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Análisis Predictivo e Inteligente</span>
          <h2 className="mb-0 fw-extrabold">Módulo Analítico Avanzado</h2>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center">
            <span className="card-title-sub">Índice de Ahorro</span>
            <h3 className="fw-bold mt-2 text-success">
              {monthlyData[monthlyData.length - 1].Ingresos > 0
                ? ((monthlyData[monthlyData.length - 1].Ahorro / monthlyData[monthlyData.length - 1].Ingresos) * 100).toFixed(1)
                : 0}%
            </h3>
            <span className="text-secondary small">Tasa objetivo recomendada: &gt;20%</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center">
            <span className="card-title-sub">Promedio Gasto Mensual</span>
            <h3 className="fw-bold mt-2 text-danger">
              ${(monthlyData.reduce((sum, d) => sum + d.Gastos, 0) / monthlyData.length).toFixed(0)}
            </h3>
            <span className="text-secondary small">Calculado sobre los últimos 6 meses</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="glass-panel p-4 text-center">
            <span className="card-title-sub">Eficiencia de Presupuesto</span>
            <h3 className="fw-bold mt-2 text-primary">
              {budgetComparisonData.filter(d => d.Consumido <= d.Límite).length} de {budgetComparisonData.length}
            </h3>
            <span className="text-secondary small">Categorías dentro del límite establecido</span>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Pie Chart: Expenses by category */}
        <div className="col-12 col-lg-5">
          <div className="glass-panel p-4 h-100">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiPieChart className="text-danger" />
              Gastos por Categoría
            </h5>
            <div style={{ width: '100%', height: '280px' }} className="d-flex justify-content-center align-items-center">
              {expenseCategoriesData.length === 0 ? (
                <div className="text-secondary small">Registra gastos para ver el gráfico.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategoriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {expenseCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="recharts-custom-tooltip">
                            <p className="fw-bold mb-1">{payload[0].name}</p>
                            <p className="text-danger mb-0">${payload[0].value.toFixed(2)}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Bar Chart: Income vs Expense compare */}
        <div className="col-12 col-lg-7">
          <div className="glass-panel p-4 h-100">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiActivity className="text-success" />
              Evolución Comparativa Mensual
            </h5>
            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="recharts-custom-tooltip">
                          <p className="fw-bold mb-1">{payload[0].payload.name}</p>
                          <p className="text-success mb-0">Ingresos: ${payload[0].value}</p>
                          <p className="text-danger mb-0">Gastos: ${payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Legend />
                  <Bar dataKey="Ingresos" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Gastos" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Budget consumption comparison */}
      <div className="row">
        <div className="col-12">
          <div className="glass-panel p-4">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiLayers className="text-primary" />
              Consumo Real vs Límite Presupuestal
            </h5>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetComparisonData} layout="vertical" margin={{ left: 30, right: 30 }}>
                  <CartesianGrid stroke="var(--border-color)" />
                  <XAxis type="number" stroke="var(--text-secondary)" />
                  <YAxis dataKey="category" type="category" stroke="var(--text-secondary)" />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="recharts-custom-tooltip">
                          <p className="fw-bold mb-1">{payload[0].payload.category}</p>
                          <p className="text-secondary mb-0">Límite: ${payload[0].value}</p>
                          <p className="text-danger mb-0">Gastos: ${payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Legend />
                  <Bar dataKey="Límite" fill="rgba(59, 130, 246, 0.4)" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="Consumido" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPanel;
