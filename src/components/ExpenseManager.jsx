import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiTrendingDown, FiSearch, FiSliders, FiAlertTriangle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ExpenseManager = () => {
  const { expenses, budgets, updateBudget, addExpense, editExpense, deleteExpense } = useFinance();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentación');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Budget management state
  const [showBudgetSettings, setShowBudgetSettings] = useState(false);
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState('Alimentación');
  const [budgetLimitInput, setBudgetLimitInput] = useState('');

  const categories = ['Alimentación', 'Transporte', 'Salud', 'Educación', 'Entretenimiento', 'Hogar', 'Otros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) {
      Swal.fire({
        title: 'Error de entrada',
        text: 'Por favor completa todos los campos con valores válidos.',
        icon: 'error',
        confirmButtonColor: '#10B981'
      });
      return;
    }

    const payload = {
      description,
      amount: parseFloat(amount),
      category,
      date
    };

    if (isEditing) {
      editExpense(currentId, payload);
      setIsEditing(false);
      setCurrentId(null);
    } else {
      addExpense(payload);
    }

    // Reset Form
    setDescription('');
    setAmount('');
    setCategory('Alimentación');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleEditClick = (exp) => {
    setIsEditing(true);
    setCurrentId(exp.id);
    setDescription(exp.description);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este registro de gasto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExpense(id);
      }
    });
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (!budgetLimitInput || parseFloat(budgetLimitInput) < 0) {
      Swal.fire('Error', 'Ingresa un monto de presupuesto válido.', 'error');
      return;
    }
    updateBudget(selectedBudgetCategory, parseFloat(budgetLimitInput));
    setBudgetLimitInput('');
    setShowBudgetSettings(false);
  };

  // Helper to calculate total spent in category for current month
  const getCategorySpent = (cat) => {
    const today = new Date('2026-06-10'); // Simulated present date
    return expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return exp.category === cat && expDate.getMonth() === today.getMonth() && expDate.getFullYear() === today.getFullYear();
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <span className="text-danger fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Gestión de Egresos</span>
          <h2 className="mb-0 fw-extrabold">Gastos y Presupuestos</h2>
        </div>
        <button
          className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-3 border-secondary"
          onClick={() => setShowBudgetSettings(!showBudgetSettings)}
        >
          <FiSliders />
          Ajustar Límites Mensuales
        </button>
      </div>

      {showBudgetSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-panel p-4 mb-4"
        >
          <h5 className="mb-3">Configurar Presupuesto por Categoría</h5>
          <form onSubmit={handleBudgetSubmit} className="row g-3 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label text-secondary small fw-bold">Categoría</label>
              <select
                className="form-select form-control-custom"
                value={selectedBudgetCategory}
                onChange={(e) => {
                  setSelectedBudgetCategory(e.target.value);
                  setBudgetLimitInput(budgets[e.target.value] || '');
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label text-secondary small fw-bold">Límite Mensual ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-control form-control-custom"
                placeholder={budgets[selectedBudgetCategory]}
                value={budgetLimitInput}
                onChange={(e) => setBudgetLimitInput(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <button type="submit" className="btn btn-brand w-100 py-2">
                Actualizar Límite
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Mini Budgets indicators */}
      <div className="row g-3 mb-4">
        {categories.slice(0, 4).map(cat => {
          const limit = budgets[cat] || 1000;
          const spent = getCategorySpent(cat);
          const pct = Math.min(100, (spent / limit) * 100);
          return (
            <div key={cat} className="col-12 col-sm-6 col-md-3">
              <div className="glass-card p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold small">{cat}</span>
                  {spent > limit && <span className="badge bg-danger text-white"><FiAlertTriangle /></span>}
                </div>
                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div
                    className={`progress-bar ${spent > limit ? 'bg-danger' : spent > limit * 0.85 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between text-secondary" style={{ fontSize: '0.75rem' }}>
                  <span>Gastado: ${spent.toFixed(0)}</span>
                  <span>Límite: ${limit.toFixed(0)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row g-4">
        {/* Form panel */}
        <div className="col-12 col-lg-4">
          <div className="glass-panel p-4 sticky-top" style={{ top: '24px', zIndex: 10 }}>
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiTrendingDown className="text-danger" />
              {isEditing ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Descripción</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Ej. Compra de Víveres"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                <label className="form-label text-secondary small fw-bold">Fecha</label>
                <input
                  type="date"
                  className="form-control form-control-custom"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-brand w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                <FiPlus />
                {isEditing ? 'Guardar Cambios' : 'Registrar Gasto'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-2 rounded-3 border-1 border-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setDescription('');
                    setAmount('');
                    setCategory('Alimentación');
                    setDate(new Date().toISOString().split('T')[0]);
                  }}
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* List panel */}
        <div className="col-12 col-lg-8">
          <div className="glass-panel p-4">
            {/* Filters */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <div className="position-relative">
                  <FiSearch className="position-absolute text-secondary" style={{ left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    className="form-control form-control-custom ps-5"
                    placeholder="Buscar por descripción..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <select
                  className="form-select form-control-custom"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expenses table */}
            <div className="table-responsive">
              <table className="table table-custom align-middle">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th className="text-end">Monto</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-secondary">
                        No se encontraron registros de gastos.
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id}>
                        <td>{exp.date}</td>
                        <td className="fw-semibold">{exp.description}</td>
                        <td>
                          <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-2">
                            {exp.category}
                          </span>
                        </td>
                        <td className="text-end fw-bold text-danger">${exp.amount.toFixed(2)}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm border-0 rounded-3 p-2 d-flex align-items-center justify-content-center"
                              onClick={() => handleEditClick(exp)}
                              title="Editar"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm border-0 rounded-3 p-2 d-flex align-items-center justify-content-center"
                              onClick={() => handleDeleteClick(exp.id)}
                              title="Eliminar"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseManager;
