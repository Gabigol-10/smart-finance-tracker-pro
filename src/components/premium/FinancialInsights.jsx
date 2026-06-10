import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiAlertCircle, FiCheckCircle, FiLightbulb } from 'react-icons/fi';
import { Card } from '../ui';

const FinancialInsights = ({ incomes, expenses, savingsGoals }) => {
  // Calculate insights
  const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  // Category analysis
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount || 0);
    return acc;
  }, {});

  const topCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];

  // Generate insights
  const insights = [
    {
      id: 1,
      type: totalExpense > totalIncome ? 'warning' : 'success',
      icon: totalExpense > totalIncome ? <FiAlertCircle /> : <FiCheckCircle />,
      title: totalExpense > totalIncome ? 'Gastos Elevados' : 'Balance Positivo',
      description: totalExpense > totalIncome 
        ? `Tus gastos superan tus ingresos por $${(totalExpense - totalIncome).toLocaleString()}. Considera reducir gastos.`
        : `¡Excelente! Estás ahorrando $${balance.toLocaleString()} este mes.`,
    },
    {
      id: 2,
      type: savingsRate >= 20 ? 'success' : savingsRate >= 10 ? 'info' : 'warning',
      icon: <FiTrendingUp />,
      title: 'Tasa de Ahorro',
      description: savingsRate >= 20 
        ? `Tu tasa de ahorro del ${savingsRate}% está por encima del promedio recomendado. ¡Sigue así!`
        : `Tu tasa de ahorro es ${savingsRate}%. Intenta alcanzar al menos 20% para un futuro más seguro.`,
    },
    {
      id: 3,
      type: 'info',
      icon: <FiLightbulb />,
      title: topCategory ? `Categoría Principal: ${topCategory[0]}` : 'Sin gastos registrados',
      description: topCategory 
        ? `Has gastado $${topCategory[1].toLocaleString()} en ${topCategory[0]}. Representa el ${((topCategory[1] / totalExpense) * 100).toFixed(1)}% de tus gastos.`
        : 'Comienza a registrar tus gastos para obtener insights personalizados.',
    },
  ];

  // Goals progress insight
  if (savingsGoals.length > 0) {
    const avgProgress = savingsGoals.reduce((sum, goal) => {
      return sum + ((goal.currentAmount / goal.targetAmount) * 100);
    }, 0) / savingsGoals.length;

    insights.push({
      id: 4,
      type: avgProgress >= 75 ? 'success' : avgProgress >= 50 ? 'info' : 'warning',
      icon: <FiTrendingUp />,
      title: 'Progreso de Metas',
      description: `El progreso promedio de tus metas es ${avgProgress.toFixed(1)}%. ${
        avgProgress >= 75 
          ? '¡Estás muy cerca de alcanzarlas!' 
          : avgProgress >= 50 
            ? 'Vas por buen camino, mantén el ritmo.'
            : 'Considera aumentar tus ahorros mensuales.'
      }`,
    });
  }

  const getInsightColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'info': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'danger': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
          🤖
        </div>
        <div>
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Insights Financieros
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Análisis inteligente de tus finanzas
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-1">
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {insight.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
        <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
          💡 Los insights se actualizan automáticamente basados en tus transacciones
        </p>
      </div>
    </Card>
  );
};

export default FinancialInsights;
