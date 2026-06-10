import Swal from 'sweetalert2';

// Toast Configuration
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: 'var(--card-bg)',
  color: 'var(--text-primary)',
  customClass: {
    popup: 'premium-toast',
    title: 'toast-title',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const showToast = {
  success: (message, title = '✓ Éxito') => {
    Toast.fire({
      icon: 'success',
      title: title,
      text: message,
      iconColor: '#10B981',
    });
  },

  error: (message, title = '✗ Error') => {
    Toast.fire({
      icon: 'error',
      title: title,
      text: message,
      iconColor: '#EF4444',
    });
  },

  warning: (message, title = '⚠ Advertencia') => {
    Toast.fire({
      icon: 'warning',
      title: title,
      text: message,
      iconColor: '#F59E0B',
    });
  },

  info: (message, title = 'ℹ Información') => {
    Toast.fire({
      icon: 'info',
      title: title,
      text: message,
      iconColor: '#3B82F6',
    });
  },
};

// Modal Configuration
export const showModal = {
  confirm: async (title, text, confirmText = 'Confirmar', cancelText = 'Cancelar') => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      background: 'var(--card-bg)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'premium-modal',
      },
    });
  },

  delete: async (title = '¿Eliminar?', text = 'Esta acción no se puede deshacer') => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      background: 'var(--card-bg)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'premium-modal',
      },
    });
  },

  success: (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#10B981',
      background: 'var(--card-bg)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'premium-modal',
      },
    });
  },

  error: (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#EF4444',
      background: 'var(--card-bg)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'premium-modal',
      },
    });
  },
};
