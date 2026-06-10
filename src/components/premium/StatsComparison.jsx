import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';
import { Card } from '../ui';

const StatsComparison = ({ currentMonth, previousMonth, label = 'vs Mes Anterior' }) => {
  const difference = currentMonth - previousMonth;
  const percentageChange = previousMonth !== 0 
    ? ((difference / previousMonth) * 100).toFixed(1)
    : 0;

  const isPositive = difference > 0;
  const isNeutral = difference === 0;

  const getIcon = () => {
    if (isNeutral) return <FiMinus />;
    return isPositive ? <FiArrowUp /> : <FiArrowDown />;
  };

  const getColor = () => {
    if (isNeutral) return 'text-gray-500 bg-gray-500/10';
    return isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10';
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${getColor()}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {getIcon()}
      <span>{Math.abs(percentageChange)}%</span>
      <span className="text-xs opacity-75">{label}</span>
    </motion.div>
  );
};

export const MonthlyComparison = ({ incomes, expenses }) => {
  // This is a simplified version. In production, you'd calculate from actual date ranges
  const currentIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
  const currentExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  // Simulated previous month data (replace with actual historical data)
  const previousIncome = currentIncome * 0.92;
  const previousExpense = currentExpense * 1.05;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Comparativa Mensual
      </h3>

      <div className="space-y-6">
        {/* Income Comparison */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Ingresos
            </span>
            <StatsComparison 
              currentMonth={currentIncome}
              previousMonth={previousIncome}
            />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-green-500">
              ${currentIncome.toLocaleString()}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              vs ${previousIncome.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="divider"></div>

        {/* Expense Comparison */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Gastos
            </span>
            <StatsComparison 
              currentMonth={currentExpense}
              previousMonth={previousExpense}
            />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-red-500">
              ${currentExpense.toLocaleString()}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              vs ${previousExpense.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="divider"></div>

        {/* Net Change */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Balance Neto
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              ${(currentIncome - currentExpense).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Indicator */}
      <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: 'var(--text-secondary)' }}>Tendencia del mes</span>
          <span className="font-semibold" style={{ 
            color: (currentIncome - currentExpense) > (previousIncome - previousExpense) 
              ? 'var(--color-success)' 
              : 'var(--color-danger)' 
          }}>
            {(currentIncome - currentExpense) > (previousIncome - previousExpense) 
              ? '📈 Mejorando' 
              : '📉 En descenso'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default StatsComparison;
