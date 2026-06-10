import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiLock, FiGlobe, FiDollarSign } from 'react-icons/fi';
import { Card, Input, Button, Select } from '../components/ui';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <FiUser /> },
    { id: 'notifications', label: 'Notificaciones', icon: <FiBell /> },
    { id: 'security', label: 'Seguridad', icon: <FiLock /> },
    { id: 'preferences', label: 'Preferencias', icon: <FiGlobe /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Configuración
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Personaliza tu experiencia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <Card className="lg:col-span-1 p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20'
                    : 'hover:bg-white/5'
                }`}
                style={{ 
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)'
                }}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className="lg:col-span-3 p-6">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Información General
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Nombre" defaultValue="John" />
                  <Input label="Apellido" defaultValue="Doe" />
                </div>
                <Input label="Email" type="email" defaultValue="john.doe@example.com" />
                <Input label="Teléfono" type="tel" defaultValue="+1 (555) 123-4567" />
                <Input label="Dirección" defaultValue="123 Main St, San Francisco, CA" />
                <div className="flex gap-3 mt-6">
                  <Button variant="primary">Guardar Cambios</Button>
                  <Button variant="outline">Cancelar</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Preferencias de Notificaciones
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Notificaciones por Email', description: 'Recibe actualizaciones importantes' },
                  { label: 'Alertas de Gastos', description: 'Notificación cuando gastas más de lo planeado' },
                  { label: 'Recordatorios de Metas', description: 'Recibe recordatorios sobre tus metas' },
                  { label: 'Resumen Semanal', description: 'Resumen financiero cada semana' },
                  { label: 'Nuevas Funciones', description: 'Entérate de nuevas características' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-xl" 
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <div>
                      <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Seguridad
              </h2>
              <div className="space-y-4">
                <Input label="Contraseña Actual" type="password" />
                <Input label="Nueva Contraseña" type="password" />
                <Input label="Confirmar Contraseña" type="password" />
                <div className="flex gap-3 mt-6">
                  <Button variant="primary">Cambiar Contraseña</Button>
                </div>
                <div className="divider my-6"></div>
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-danger-light)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-danger)' }}>
                    Zona de Peligro
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Una vez que elimines tu cuenta, no hay vuelta atrás.
                  </p>
                  <Button variant="danger">Eliminar Cuenta</Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Preferencias
              </h2>
              <div className="space-y-4">
                <Select 
                  label="Idioma" 
                  options={[
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'Français' },
                  ]}
                />
                <Select 
                  label="Moneda" 
                  options={[
                    { value: 'usd', label: 'USD - Dólar' },
                    { value: 'eur', label: 'EUR - Euro' },
                    { value: 'gbp', label: 'GBP - Libra' },
                  ]}
                />
                <Select 
                  label="Formato de Fecha" 
                  options={[
                    { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY' },
                    { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY' },
                    { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
                  ]}
                />
                <Select 
                  label="Tema" 
                  options={[
                    { value: 'dark', label: 'Oscuro' },
                    { value: 'light', label: 'Claro' },
                    { value: 'auto', label: 'Automático' },
                  ]}
                />
                <div className="flex gap-3 mt-6">
                  <Button variant="primary">Guardar Preferencias</Button>
                  <Button variant="outline">Restaurar Defaults</Button>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
