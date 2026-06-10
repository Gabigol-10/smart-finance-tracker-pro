import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    success: 'btn-success',
    outline: 'btn-outline',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      className={`btn-premium ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          Cargando...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};
