import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ value, max = 100, color = 'success', showLabel = true, label }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    primary: 'bg-blue-500',
  };

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between mb-sm">
          <span className="text-sm text-secondary">{label}</span>
          <span className="text-sm font-semibold text-primary">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="progress-premium">
        <motion.div
          className={`progress-bar-premium ${colors[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
