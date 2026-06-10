import React from 'react';

export const Badge = ({ children, variant = 'success', icon, className = '' }) => {
  const variants = {
    success: 'badge-success',
    danger: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info',
  };

  return (
    <span className={`badge-premium ${variants[variant]} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};
