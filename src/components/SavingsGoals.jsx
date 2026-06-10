import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiTarget, FiPlus, FiTrash2, FiEdit2, FiArrowUpRight, FiDollarSign } from 'react-icons/fi';
import Swal from 'sweetalert2';

const SavingsGoals = () => {
  const { goals, addGoal, editGoal, updateGoalProgress, deleteGoal } = useFinance();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('Estudios');
  const [dateGoal, setDateGoal] = useState('');

  // Deposit progress state
  const [depositGoalId, setDepositGoalId] = useState(null);
  const [depositAmount, setDepositAmount] = useState('');

  const categories = ['Tecnología', 'Viaje', 'Fondo de emergencia', 'Estudios', 'Hogar', 'Otros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || parseFloat(targetAmount) <= 0 || !dateGoal) {
      Swal.fire('Error', 'Completa todos los campos con valores válidos.', 'error');
      return;
    }

    const payload = {
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      dateGoal
    };

    if (isEditing) {
      editGoal(currentId, payload);
      setIsEditing(false);
      setCurrentId(null);
    } else {
      addGoal(payload);
    }

    setName('');
    setTargetAmount('');
    setCategory('Estudios');
    setDateGoal('');
  };

  const handleEditClick = (g) => {
    setIsEditing(true);
    setCurrentId(g.id);
    setName(g.name);
    setTargetAmount(g.targetAmount);
    setCategory(g.category);
    setDateGoal(g.dateGoal);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará esta meta y su progreso acumulado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGoal(id);
      }
    });
  };

  const handleProgressUpdate = (id, action) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      Swal.fire('Error', 'Ingresa un monto de aporte válido.', 'error');
      return;
    }
    const val = parseFloat(depositAmount) * (action === 'add' ? 1 : -1);
    updateGoalProgress(id, val);
    setDepositGoalId(null);
    setDepositAmount('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-primary fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Objetivos de Futuro</span>
          <h2 className="mb-0 fw-extrabold">Metas de Ahorro</h2>
        </div>
      </div>

      <div className="row g-4">
        {/* Form panel */}
        <div className="col-12 col-lg-4">
          <div className="glass-panel p-4 sticky-top" style={{ top: '24px', zIndex: 10 }}>
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiTarget className="text-primary" />
              {isEditing ? 'Editar Meta' : 'Crear Nueva Meta'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Nombre del objetivo</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Ej. Comprar Macbook Pro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Monto Objetivo ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control form-control-custom"
                  placeholder="0.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Categoría</label>
                <select
                  className="form-select form-control-custom"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold">Fecha Estimada de Cumplimiento</label>
                <input
                  type="date"
                  className="form-control form-control-custom"
                  value={dateGoal}
                  onChange={(e) => setDateGoal(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-brand w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                <FiPlus />
                {isEditing ? 'Guardar Cambios' : 'Crear Objetivo'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-2 rounded-3 border-1 border-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setName('');
                    setTargetAmount('');
                    setCategory('Estudios');
                    setDateGoal('');
                  }}
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Goals cards list */}
        <div className="col-12 col-lg-8">
          <div className="row g-3">
            {goals.length === 0 ? (
              <div className="col-12">
                <div className="glass-panel p-5 text-center text-secondary">
                  No tienes metas de ahorro configuradas. ¡Crea una para empezar a planificar!
                </div>
              </div>
            ) : (
              goals.map((goal) => {
                const pct = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
                return (
                  <div key={goal.id} className="col-12 col-md-6">
                    <div className="glass-card p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="badge bg-primary-subtle text-primary mb-2 px-3 py-1 rounded-pill" style={{ fontSize: '0.75rem' }}>
                            {goal.category}
                          </span>
                          <h5 className="mb-0 fw-bold">{goal.name}</h5>
                        </div>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-outline-secondary btn-sm border-0 p-1"
                            onClick={() => handleEditClick(goal)}
                            title="Editar"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm border-0 p-1"
                            onClick={() => handleDeleteClick(goal.id)}
                            title="Eliminar"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-end mb-2 mt-4">
                        <div>
                          <span className="text-secondary small d-block">Progreso</span>
                          <span className="h4 mb-0 fw-bold text-primary">${goal.currentAmount.toFixed(0)}</span>
                          <span className="text-secondary small"> / ${goal.targetAmount.toFixed(0)}</span>
                        </div>
                        <span className="h3 mb-0 fw-bold text-primary">{pct.toFixed(0)}%</span>
                      </div>

                      <div className="progress mb-3" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>

                      <div className="d-flex justify-content-between text-secondary mb-3" style={{ fontSize: '0.8rem' }}>
                        <span>Meta para: {goal.dateGoal}</span>
                      </div>

                      {/* Deposit panel */}
                      {depositGoalId === goal.id ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control form-control-custom"
                              placeholder="Monto"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                            />
                            <button
                              className="btn btn-success"
                              onClick={() => handleProgressUpdate(goal.id, 'add')}
                            >
                              Aportar
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleProgressUpdate(goal.id, 'subtract')}
                            >
                              Retirar
                            </button>
                            <button
                              className="btn btn-outline-secondary border-secondary text-primary"
                              onClick={() => setDepositGoalId(null)}
                            >
                              X
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <button
                          className="btn btn-outline-primary btn-sm w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 border-primary"
                          onClick={() => setDepositGoalId(goal.id)}
                        >
                          <FiDollarSign />
                          Aportar a Meta
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SavingsGoals;
