import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiAward, FiTrendingUp } from 'react-icons/fi';
import { Card, Badge, ProgressBar } from '../components/ui';

const ProfilePage = () => {
  const achievements = [
    { id: 1, title: 'Ahorrador Constante', description: 'Ahorra por 30 días consecutivos', progress: 80, icon: '🎯' },
    { id: 2, title: 'Meta Cumplida', description: 'Completa tu primera meta de ahorro', progress: 100, icon: '🏆' },
    { id: 3, title: 'Control Total', description: 'Registra todas tus transacciones por 60 días', progress: 45, icon: '📊' },
  ];

  const stats = [
    { label: 'Transacciones Totales', value: '1,234', icon: <FiTrendingUp />, color: 'primary' },
    { label: 'Metas Completadas', value: '8', icon: <FiAward />, color: 'success' },
    { label: 'Días Activo', value: '156', icon: <FiCalendar />, color: 'warning' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Mi Perfil
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Información personal y logros
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6 text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-5xl font-bold mb-4">
            JD
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            John Doe
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Usuario Premium
          </p>
          <Badge variant="success">Cuenta Activa</Badge>
          
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
              <FiMail />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
              <FiPhone />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
              <FiMapPin />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
              <FiCalendar />
              <span>Miembro desde Ene 2024</span>
            </div>
          </div>
        </Card>

        {/* Stats & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-2xl mb-3 kpi-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              🏆 Logros
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.progress === 100 && (
                      <Badge variant="success">Completado</Badge>
                    )}
                  </div>
                  <ProgressBar 
                    value={achievement.progress} 
                    color={achievement.progress === 100 ? 'success' : 'primary'}
                    showLabel={false}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              📅 Actividad Reciente
            </h3>
            <div className="space-y-4">
              {[
                { date: 'Hoy', action: 'Agregaste un nuevo ingreso de $1,500' },
                { date: 'Ayer', action: 'Completaste la meta "Vacaciones de Verano"' },
                { date: 'Hace 2 días', action: 'Registraste 5 gastos nuevos' },
                { date: 'Hace 3 días', action: 'Actualizaste tu perfil' },
              ].map((activity, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-base)' }}>
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div>
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {activity.action}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
