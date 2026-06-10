import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true, gradient = false, ...props }) => {
  const Component = motion.div;
  
  return (
    <Component
      className={`glass-card ${hover ? '' : 'glass-card-static'} ${gradient ? 'card-gradient' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      {...props}
    >
      {children}
    </Component>
  );
};

export const KPICard = ({ icon, label, value, change, changeType, iconBg = 'primary', loading = false }) => {
  if (loading) {
    return (
      <Card hover={false}>
        <div className="skeleton skeleton-card"></div>
      </Card>
    );
  }

  return (
    <Card className="kpi-card">
      <div className={`kpi-icon ${iconBg}`}>
        {icon}
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {change && (
        <div className={`kpi-change ${changeType}`}>
          {changeType === 'positive' ? '↑' : '↓'} {change}
        </div>
      )}
    </Card>
  );
};

export const CardHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex justify-between items-center mb-lg">
      <div>
        <h3 className="text-xl font-semibold text-primary mb-sm">{title}</h3>
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
