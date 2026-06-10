import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiCalendar, FiPlus, FiTrash2, FiCheck, FiInfo } from 'react-icons/fi';
import Swal from 'sweetalert2';

const FinancialCalendar = () => {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useFinance();

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('gasto');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !amount || parseFloat(amount) <= 0) {
      Swal.fire('Error', 'Por favor llena todos los campos.', 'error');
      return;
    }
    addReminder({
      title,
      date,
      amount: parseFloat(amount),
      type
    });
    setTitle('');
    setAmount('');
  };

  // Generate calendar days for June 2026 (present month in user metadata)
  // June 2026 starts on Monday (1). June has 30 days.
  const getDaysInMonth = () => {
    const days = [];
    // 1 to 30
    for (let i = 1; i <= 30; i++) {
      const dayStr = `2026-06-${i.toString().padStart(2, '0')}`;
      const dayReminders = reminders.filter(r => r.date === dayStr);
      days.push({
        dayNum: i,
        dateStr: dayStr,
        reminders: dayReminders
      });
    }
    return days;
  };

  const calendarDays = getDaysInMonth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-success fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Flujos Programados</span>
          <h2 className="mb-0 fw-extrabold">Calendario Financiero</h2>
        </div>
      </div>

      <div className="row g-4">
        {/* Sidebar Schedule forms */}
        <div className="col-12 col-lg-4">
          <div className="glass-panel p-4 mb-4">
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiCalendar className="text-success" />
              Programar Recordatorio
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Título / Servicio</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Ej. Suscripción Netflix"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Monto ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control form-control-custom"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Fecha de Vencimiento</label>
                <input
                  type="date"
                  className="form-control form-control-custom"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold">Tipo de Flujo</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reminderType"
                      id="typeGasto"
                      checked={type === 'gasto'}
                      onChange={() => setType('gasto')}
                    />
                    <label className="form-check-label text-danger fw-semibold" htmlFor="typeGasto">
                      Gasto / Salida
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="reminderType"
                      id="typeIngreso"
                      checked={type === 'ingreso'}
                      onChange={() => setType('ingreso')}
                    />
                    <label className="form-check-label text-success fw-semibold" htmlFor="typeIngreso">
                      Ingreso / Entrada
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-brand w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                <FiPlus />
                Programar Pago
              </button>
            </form>
          </div>

          {/* Quick reminders list */}
          <div className="glass-panel p-4">
            <h6 className="mb-3">Pendientes Próximos</h6>
            <div className="d-flex flex-column gap-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {reminders.filter(r => !r.completed).length === 0 ? (
                <div className="text-secondary small py-3 text-center">No hay pagos pendientes.</div>
              ) : (
                reminders.filter(r => !r.completed).map(r => (
                  <div key={r.id} className="p-2 border rounded-3 d-flex justify-content-between align-items-center" style={{ borderColor: 'var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                    <div>
                      <span className="fw-semibold small d-block">{r.title}</span>
                      <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{r.date} • ${r.amount}</span>
                    </div>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-success border-0 p-1"
                        onClick={() => toggleReminder(r.id)}
                        title="Marcar como pagado"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger border-0 p-1"
                        onClick={() => deleteReminder(r.id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Calendar Grid View (June 2026) */}
        <div className="col-12 col-lg-8">
          <div className="glass-panel p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 fw-bold">Junio 2026</h5>
              <div className="d-flex align-items-center gap-2 text-secondary small">
                <FiInfo />
                <span>Simulación de Calendario Mensual</span>
              </div>
            </div>

            {/* Days of Week Headers */}
            <div className="calendar-grid mb-2 text-center text-secondary small fw-bold">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>
            </div>

            {/* Calendar Days */}
            <div className="calendar-grid">
              {/* Empty offsets for June 2026 (June 1st is Monday, so 0 offset days) */}
              {calendarDays.map((day) => {
                const isToday = day.dayNum === 10; // 2026-06-10 simulated today
                return (
                  <div key={day.dayNum} className={`calendar-day ${isToday ? 'today' : ''}`} style={{ minHeight: '90px' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={`fw-bold small ${isToday ? 'text-success' : ''}`} style={{ fontSize: '0.8rem' }}>{day.dayNum}</span>
                    </div>
                    <div className="d-flex flex-column gap-1 overflow-hidden" style={{ maxHeight: '55px' }}>
                      {day.reminders.map(r => (
                        <div
                          key={r.id}
                          className={`px-1 py-0.5 rounded text-white text-truncate`}
                          style={{
                            fontSize: '0.65rem',
                            backgroundColor: r.completed
                              ? 'rgba(108, 117, 125, 0.6)'
                              : r.type === 'ingreso'
                              ? 'rgba(16, 185, 129, 0.8)'
                              : 'rgba(239, 68, 68, 0.8)',
                            textDecoration: r.completed ? 'line-through' : 'none'
                          }}
                          title={`${r.title}: $${r.amount}`}
                        >
                          {r.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinancialCalendar;
