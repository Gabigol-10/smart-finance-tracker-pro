import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const FinanceContext = createContext();

const initialIncomes = [
  { id: 'inc-1', description: 'Salario Tech Corp', amount: 3500, category: 'Sueldo', date: '2026-06-01' },
  { id: 'inc-2', description: 'Proyecto React Freelance', amount: 1200, category: 'Freelance', date: '2026-06-05' },
  { id: 'inc-3', description: 'Tienda Online E-commerce', amount: 450, category: 'Negocio', date: '2026-06-08' },
  { id: 'inc-4', description: 'Bono Trimestral', amount: 800, category: 'Bonos', date: '2026-06-10' }
];

const initialExpenses = [
  { id: 'exp-1', description: 'Alquiler Departamento', amount: 1200, category: 'Hogar', date: '2026-06-01' },
  { id: 'exp-2', description: 'Supermercado Mensual', amount: 350, category: 'Alimentación', date: '2026-06-03' },
  { id: 'exp-3', description: 'Gasolina e Internet', amount: 120, category: 'Transporte', date: '2026-06-04' },
  { id: 'exp-4', description: 'Seguro Médico de Salud', amount: 180, category: 'Salud', date: '2026-06-05' },
  { id: 'exp-5', description: 'Suscripción Cursos Online', amount: 90, category: 'Educación', date: '2026-06-07' },
  { id: 'exp-6', description: 'Salida con amigos / Cine', amount: 150, category: 'Entretenimiento', date: '2026-06-08' },
  { id: 'exp-7', description: 'Mantenimiento Vehículo', amount: 200, category: 'Transporte', date: '2026-06-09' }
];

const initialGoals = [
  { id: 'goal-1', name: 'Comprar Macbook Pro M4', targetAmount: 2500, currentAmount: 1800, category: 'Estudios', dateGoal: '2026-12-15' },
  { id: 'goal-2', name: 'Viaje a Japón 2027', targetAmount: 4000, currentAmount: 1200, category: 'Viaje', dateGoal: '2027-05-20' },
  { id: 'goal-3', name: 'Fondo de Emergencia', targetAmount: 5000, currentAmount: 3500, category: 'Fondo de emergencia', dateGoal: '2026-10-30' },
  { id: 'goal-4', name: 'Master en Inteligencia Artificial', targetAmount: 6000, currentAmount: 1500, category: 'Estudios', dateGoal: '2027-02-10' }
];

const initialReminders = [
  { id: 'rem-1', title: 'Pago de Alquiler', date: '2026-06-01', amount: 1200, type: 'gasto', completed: true },
  { id: 'rem-2', title: 'Recibir Salario Tech Corp', date: '2026-06-01', amount: 3500, type: 'ingreso', completed: true },
  { id: 'rem-3', title: 'Pago de Internet y Cable', date: '2026-06-15', amount: 65, type: 'gasto', completed: false },
  { id: 'rem-4', title: 'Suscripción Netflix & Spotify', date: '2026-06-18', amount: 25, type: 'gasto', completed: false },
  { id: 'rem-5', title: 'Pago Tarjeta de Crédito', date: '2026-06-25', amount: 450, type: 'gasto', completed: false }
];

const initialBudgets = {
  Alimentación: 500,
  Transporte: 300,
  Salud: 400,
  Educación: 300,
  Entretenimiento: 250,
  Hogar: 1500,
  Otros: 200
};

export const FinanceProvider = ({ children }) => {
  const [incomes, setIncomes] = useState(() => {
    const data = localStorage.getItem('sftp_incomes');
    return data ? JSON.parse(data) : initialIncomes;
  });

  const [expenses, setExpenses] = useState(() => {
    const data = localStorage.getItem('sftp_expenses');
    return data ? JSON.parse(data) : initialExpenses;
  });

  const [goals, setGoals] = useState(() => {
    const data = localStorage.getItem('sftp_goals');
    return data ? JSON.parse(data) : initialGoals;
  });

  const [reminders, setReminders] = useState(() => {
    const data = localStorage.getItem('sftp_reminders');
    return data ? JSON.parse(data) : initialReminders;
  });

  const [budgets, setBudgets] = useState(() => {
    const data = localStorage.getItem('sftp_budgets');
    return data ? JSON.parse(data) : initialBudgets;
  });

  const [theme, setTheme] = useState(() => {
    const data = localStorage.getItem('sftp_theme');
    return data ? data : 'dark';
  });

  const [alerts, setAlerts] = useState([]);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('sftp_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('sftp_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('sftp_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('sftp_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('sftp_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('sftp_theme', theme);
    const bodyClass = document.body.classList;
    if (theme === 'dark') {
      bodyClass.add('dark-mode');
      bodyClass.remove('light-mode');
    } else {
      bodyClass.add('light-mode');
      bodyClass.remove('dark-mode');
    }
  }, [theme]);

  // Check alerts dynamically
  useEffect(() => {
    const newAlerts = [];
    // 1. Budget Alerts
    const currentMonthExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      const today = new Date('2026-06-10'); // Simulated present date matching metadata
      return expDate.getMonth() === today.getMonth() && expDate.getFullYear() === today.getFullYear();
    });

    Object.keys(budgets).forEach(cat => {
      const limit = budgets[cat];
      const spent = currentMonthExpenses
        .filter(exp => exp.category === cat)
        .reduce((sum, exp) => sum + exp.amount, 0);

      if (spent > limit) {
        newAlerts.push({
          id: `alert-budget-${cat}`,
          type: 'danger',
          title: `¡Presupuesto Superado en ${cat}!`,
          message: `Has gastado $${spent.toFixed(2)} de un límite de $${limit.toFixed(2)}.`
        });
      } else if (spent > limit * 0.85) {
        newAlerts.push({
          id: `alert-budget-warning-${cat}`,
          type: 'warning',
          title: `Presupuesto casi alcanzado en ${cat}`,
          message: `Has gastado el ${((spent/limit)*100).toFixed(0)}% ($${spent.toFixed(2)} de $${limit.toFixed(2)}).`
        });
      }
    });

    // 2. Goals Alerts
    goals.forEach(goal => {
      if (goal.currentAmount >= goal.targetAmount) {
        newAlerts.push({
          id: `alert-goal-${goal.id}`,
          type: 'success',
          title: `🎉 ¡Meta Alcanzada!`,
          message: `¡Felicitaciones! Has completado tu meta para "${goal.name}".`
        });
      }
    });

    // 3. Saving Rate Alert
    const totalInc = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExp = expenses.reduce((sum, e) => sum + e.amount, 0);
    const savings = totalInc - totalExp;
    const rate = totalInc > 0 ? (savings / totalInc) * 100 : 0;
    if (rate < 10 && totalInc > 0) {
      newAlerts.push({
        id: 'alert-saving-rate',
        type: 'info',
        title: 'Tasa de ahorro baja',
        message: `Tu tasa de ahorro mensual actual es del ${rate.toFixed(1)}%. Intenta reducir gastos hormiga.`
      });
    }

    setAlerts(newAlerts);
  }, [incomes, expenses, goals, budgets]);

  // Actions
  const addIncome = (inc) => {
    setIncomes(prev => [...prev, { ...inc, id: `inc-${Date.now()}` }]);
    showToast('Ingreso registrado con éxito', 'success');
  };

  const editIncome = (id, updatedInc) => {
    setIncomes(prev => prev.map(i => i.id === id ? { ...i, ...updatedInc } : i));
    showToast('Ingreso actualizado con éxito', 'success');
  };

  const deleteIncome = (id) => {
    setIncomes(prev => prev.filter(i => i.id !== id));
    showToast('Ingreso eliminado', 'info');
  };

  const addExpense = (exp) => {
    setExpenses(prev => [...prev, { ...exp, id: `exp-${Date.now()}` }]);
    showToast('Gasto registrado con éxito', 'success');
  };

  const editExpense = (id, updatedExp) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updatedExp } : e));
    showToast('Gasto actualizado con éxito', 'success');
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast('Gasto eliminado', 'info');
  };

  const addGoal = (goal) => {
    setGoals(prev => [...prev, { ...goal, id: `goal-${Date.now()}`, currentAmount: 0 }]);
    showToast('Meta de ahorro creada con éxito', 'success');
  };

  const editGoal = (id, updatedGoal) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updatedGoal } : g));
    showToast('Meta actualizada con éxito', 'success');
  };

  const updateGoalProgress = (id, amountToAdd) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const newAmt = Math.max(0, Math.min(g.targetAmount, g.currentAmount + amountToAdd));
        return { ...g, currentAmount: newAmt };
      }
      return g;
    }));
    showToast('Progreso de la meta actualizado', 'success');
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    showToast('Meta eliminada', 'info');
  };

  const addReminder = (rem) => {
    setReminders(prev => [...prev, { ...rem, id: `rem-${Date.now()}`, completed: false }]);
    showToast('Recordatorio creado', 'success');
  };

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    showToast('Estado del recordatorio actualizado', 'success');
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    showToast('Recordatorio eliminado', 'info');
  };

  const updateBudget = (category, limit) => {
    setBudgets(prev => ({ ...prev, [category]: limit }));
    showToast(`Presupuesto de ${category} actualizado`, 'success');
  };

  const showToast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon,
      title
    });
  };

  return (
    <FinanceContext.Provider value={{
      incomes, expenses, goals, reminders, budgets, theme, alerts,
      setTheme, addIncome, editIncome, deleteIncome,
      addExpense, editExpense, deleteExpense,
      addGoal, editGoal, updateGoalProgress, deleteGoal,
      addReminder, toggleReminder, deleteReminder, updateBudget
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
