import React, { useState } from 'react';
import { useFinance } from '../hooks/useFinance';
import { motion } from 'framer-motion';
import { FiDownload, FiSearch, FiFileText, FiFilter } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const ReportsCenter = () => {
  const { incomes, expenses } = useFinance();

  // Filters State
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Categories list combined
  const allCategories = [
    'Sueldo', 'Freelance', 'Negocio', 'Bonos', // Incomes
    'Alimentación', 'Transporte', 'Salud', 'Educación', 'Entretenimiento', 'Hogar', 'Otros' // Expenses
  ];

  // Combine items
  const allTransactions = [
    ...incomes.map(i => ({ ...i, type: 'ingreso' })),
    ...expenses.map(e => ({ ...e, type: 'gasto' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Apply filters
  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === '' || tx.type === typeFilter;
    const matchesCategory = categoryFilter === '' || tx.category === categoryFilter;
    const matchesMinAmt = minAmount === '' || tx.amount >= parseFloat(minAmount);
    const matchesMaxAmt = maxAmount === '' || tx.amount <= parseFloat(maxAmount);

    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(tx.date) >= new Date(startDate);
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(tx.date) <= new Date(endDate);
    }

    return matchesSearch && matchesType && matchesCategory && matchesMinAmt && matchesMaxAmt && matchesDate;
  });

  // EXPORT EXCEL
  const exportToExcel = () => {
    if (filteredTransactions.length === 0) {
      Swal.fire('Atención', 'No hay datos para exportar con los filtros actuales.', 'warning');
      return;
    }

    const dataToExport = filteredTransactions.map(tx => ({
      Fecha: tx.date,
      Descripción: tx.description,
      Tipo: tx.type === 'ingreso' ? 'Ingreso' : 'Gasto',
      Categoría: tx.category,
      Monto: tx.amount
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Finanzas');
    
    // Write file
    XLSX.writeFile(workbook, 'Reporte_Financiero.xlsx');
    Swal.fire('Éxito', 'Reporte Excel descargado con éxito.', 'success');
  };

  // EXPORT PDF
  const exportToPDF = () => {
    if (filteredTransactions.length === 0) {
      Swal.fire('Atención', 'No hay datos para exportar con los filtros actuales.', 'warning');
      return;
    }

    const doc = new jsPDF();
    doc.text('Smart Finance Tracker Pro - Reporte Financiero', 14, 15);
    
    // Add date of report
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generado el: ${today}`, 14, 22);

    const tableHeaders = [['Fecha', 'Descripción', 'Tipo', 'Categoría', 'Monto']];
    const tableData = filteredTransactions.map(tx => [
      tx.date,
      tx.description,
      tx.type === 'ingreso' ? 'Ingreso' : 'Gasto',
      tx.category,
      `$${tx.amount.toFixed(2)}`
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 28,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] } // Smart Finance Green
    });

    doc.save('Reporte_Financiero.pdf');
    Swal.fire('Éxito', 'Reporte PDF descargado con éxito.', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <span className="text-success fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Filtros y Auditoría</span>
          <h2 className="mb-0 fw-extrabold">Centro de Reportes</h2>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-success d-flex align-items-center gap-2 rounded-3" onClick={exportToExcel}>
            <FiDownload />
            Exportar Excel
          </button>
          <button className="btn btn-brand d-flex align-items-center gap-2 rounded-3" onClick={exportToPDF}>
            <FiFileText />
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Advanced Filter panel */}
        <div className="col-12 col-xl-3">
          <div className="glass-panel p-4 sticky-top" style={{ top: '24px', zIndex: 10 }}>
            <h5 className="mb-4 d-flex align-items-center gap-2">
              <FiFilter className="text-success" />
              Buscador Avanzado
            </h5>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Buscar por Nombre</label>
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="Ej. Salario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Tipo de Flujo</label>
              <select className="form-select form-control-custom" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">Todos</option>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Categoría</label>
              <select className="form-select form-control-custom" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">Todas</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="form-label text-secondary small fw-bold">Min ($)</label>
                <input
                  type="number"
                  className="form-control form-control-custom"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label text-secondary small fw-bold">Max ($)</label>
                <input
                  type="number"
                  className="form-control form-control-custom"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Fecha Inicio</label>
              <input
                type="date"
                className="form-control form-control-custom"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small fw-bold">Fecha Fin</label>
              <input
                type="date"
                className="form-control form-control-custom"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline-secondary w-100 rounded-3 border-secondary"
              onClick={() => {
                setSearch('');
                setTypeFilter('');
                setCategoryFilter('');
                setMinAmount('');
                setMaxAmount('');
                setStartDate('');
                setEndDate('');
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        </div>

        {/* Results List table */}
        <div className="col-12 col-xl-9">
          <div className="glass-panel p-4">
            <div className="table-responsive">
              <table className="table table-custom align-middle">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th className="text-end">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-secondary">
                        No hay movimientos que coincidan con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td className="fw-semibold">{tx.description}</td>
                        <td>
                          <span className={`badge rounded-pill ${tx.type === 'ingreso' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-3 py-2`}>
                            {tx.type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                          </span>
                        </td>
                        <td>{tx.category}</td>
                        <td className={`text-end fw-bold ${tx.type === 'ingreso' ? 'text-success' : 'text-danger'}`}>
                          ${tx.amount.toFixed(2)}
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

export default ReportsCenter;
