import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-9xl mb-6"
        >
          🔍
        </motion.div>
        
        <motion.h1
          className="text-8xl font-bold mb-4"
          style={{ 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.h2
          className="text-3xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Página No Encontrada
        </motion.h2>
        
        <motion.p
          className="text-lg mb-8"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </motion.p>
        
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver al Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Ir Atrás
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
