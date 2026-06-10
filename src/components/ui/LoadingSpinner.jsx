import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-xl">
      <motion.div
        className={`${sizes[size]} border-4 border-gray-200 border-t-blue-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className="text-secondary mt-md">{text}</p>}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="glass-card-static p-lg">
      <div className="skeleton skeleton-title mb-md"></div>
      <div className="skeleton skeleton-text mb-sm"></div>
      <div className="skeleton skeleton-text mb-sm"></div>
      <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
    </div>
  );
};
