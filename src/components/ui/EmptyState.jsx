import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState = ({ icon, title, description, action }) => {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="empty-state-icon">{icon || '📭'}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div className="mt-lg">{action}</div>}
    </motion.div>
  );
};
