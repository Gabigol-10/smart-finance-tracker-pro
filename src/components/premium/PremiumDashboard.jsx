import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, FiTrendingDown, FiDollarSign, FiTarget, 
  FiArrowUp, FiArrowDown, FiActivity 
} from 'react-icons/fi';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { KPICard, Card, CardHeader } from '../ui';
import { useFinance } from '../../context/FinanceContext';
import FinancialInsights from './FinancialInsights';
import { MonthlyComparison } from './StatsComparison';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PremiumDashboard = () => {
  const { incomes, expenses, savingsGoals } = useFinance();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Calculations
  const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  // Chart Data - Line Chart
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos',
        data: [4500, 5200, 4800, 5600, 6100, totalIncome || 5800],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
      {
        label: 'Gastos',
        data: [3200, 3500, 3100, 3800, 4200, totalExpense || 3900],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'var(--text-primary)',
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
    },
  };

  // Doughnut Chart Data
  const expenseCategories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount || 0);
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'var(--text-primary)',
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
      },
    },
    cutout: '70%',
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6"
    >
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Dashboard Financiero
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Resumen ejecutivo de tus finanzas
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={<FiDollarSign />}
          label="Balance Total"
          value={`$${balance.toLocaleString()}`}
          change="+12.5%"
          changeType="positive"
          iconBg="primary"
          loading={loading}
        />
        <KPICard
          icon={<FiTrendingUp />}
          label="Ingresos"
          value={`$${totalIncome.toLocaleString()}`}
          change="+8.2%"
          changeType="positive"
          iconBg="success"
          loading={loading}
        />
        <KPICard
          icon={<FiTrendingDown />}
          label="Gastos"
          value={`$${totalExpense.toLocaleString()}`}
          change="-3.1%"
          changeType="negative"
          iconBg="danger"
          loading={loading}
        />
        <KPICard
          icon={<FiTarget />}
          label="Tasa de Ahorro"
          value={`${savingsRate}%`}
          change="+5.3%"
          changeType="positive"
          iconBg="warning"
          loading={loading}
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6">
          <CardHeader
            title="Flujo de Efectivo"
            subtitle="Comparativa mensual de ingresos vs gastos"
          />
          <div style={{ height: '350px' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </Card>

        {/* Expense Distribution */}
        <Card className="p-6">
          <CardHeader
            title="Distribución de Gastos"
            subtitle="Por categoría"
          />
          <div style={{ height: '300px' }}>
            {Object.keys(expenseCategories).length > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Sin datos de gastos
              </div>
            )}
          </div>
        </Card>

        {/* Monthly Comparison */}
        <MonthlyComparison incomes={incomes} expenses={expenses} />
      </motion.div>

      {/* Recent Transactions & Insights */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 p-6">
          <CardHeader title="Transacciones Recientes" subtitle="Últimas 5 operaciones" />
          <div className="space-y-3">
            {[...incomes, ...expenses]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((transaction, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors"
                  style={{ border: '1px solid var(--border-base)' }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === 'income' || transaction.source 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {transaction.type === 'income' || transaction.source ? <FiArrowUp /> : <FiArrowDown />}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {transaction.description || transaction.category}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    transaction.type === 'income' || transaction.source 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {transaction.type === 'income' || transaction.source ? '+' : '-'}
                    ${parseFloat(transaction.amount).toLocaleString()}
                  </span>
                </motion.div>
              ))}
          </div>
        </Card>

        {/* Financial Insights */}
        <FinancialInsights 
          incomes={incomes}
          expenses={expenses}
          savingsGoals={savingsGoals}
        />
      </motion.div>

      {/* Savings Goals Progress */}
      <motion.div variants={item}>
        <Card className="p-6">
          <CardHeader title="Metas de Ahorro" subtitle="Progreso actual" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsGoals.slice(0, 4).map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div key={index} className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {goal.name}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </div>
                  <div className="progress-premium">
                    <motion.div
                      className="progress-bar-premium bg-gradient-to-r from-green-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PremiumDashboard;
