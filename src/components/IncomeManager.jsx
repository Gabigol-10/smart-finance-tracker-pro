import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiTrendingUp, FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const IncomeManager = () => {
  const { incomes, addIncome, editIncome, deleteIncome } = useFinance();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Sueldo');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = ['Sueldo', 'Freelance', 'Negocio', 'Bonos', 'Otros'];

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
      editIncome(currentId, payload);
      setIsEditing(false);
      setCurrentId(null);
    } else {
      addIncome(payload);
    }

    // Reset Form
    setDescription('');
    setAmount('');
    setCategory('Sueldo');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleEditClick = (inc) => {
    setIsEditing(true);
    setCurrentId(inc.id);
    setDescription(inc.description);
    setAmount(inc.amount);
    setCategory(inc.category);
    setDate(inc.date);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este registro de ingreso.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIncome(id);
      }
    });
  };

  const filteredIncomes = incomes.filter(inc => {
    const matchesSearch = inc.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || inc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-success fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Gestión de Capital</span>
          <h2 className="mb-0 fw-extrabold">Ingresos e Inyecciones</h2>
        </div>
      </div>

      <div className="row g-4">
        {/* Form panel */}
        <div className="col-12 col-lg-4">
          <div className="glass-panel p-4 sticky-top" style={{ top: '24px', zIndex: 10 }}>
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiTrendingUp className="text-success" />
              {isEditing ? 'Editar Ingreso' : 'Registrar Nuevo Ingreso'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold">Descripción</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Ej. Consultoría Desarrollo"
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
                {isEditing ? 'Guardar Cambios' : 'Registrar Ingreso'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-2 rounded-3 border-1 border-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setDescription('');
                    setAmount('');
                    setCategory('Sueldo');
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

            {/* Incomes table */}
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
                  {filteredIncomes.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-secondary">
                        No se encontraron registros de ingresos.
                      </td>
                    </tr>
                  ) : (
                    filteredIncomes.map((inc) => (
                      <tr key={inc.id}>
                        <td>{inc.date}</td>
                        <td className="fw-semibold">{inc.description}</td>
                        <td>
                          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
                            {inc.category}
                          </span>
                        </td>
                        <td className="text-end fw-bold text-success">${inc.amount.toFixed(2)}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm border-0 rounded-3 p-2 d-flex align-items-center justify-content-center"
                              onClick={() => handleEditClick(inc)}
                              title="Editar"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm border-0 rounded-3 p-2 d-flex align-items-center justify-content-center"
                              onClick={() => handleDeleteClick(inc.id)}
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

export default IncomeManager;
