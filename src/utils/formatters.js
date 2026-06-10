// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format currency with locale and symbol
 */
export const formatCurrency = (amount, locale = 'es-MX', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number with thousands separator
 */
export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Format date to readable format
 */
export const formatDate = (date, format = 'long') => {
  const dateObj = new Date(date);
  
  const formats = {
    short: { month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  };

  return new Intl.DateTimeFormat('es-MX', formats[format]).format(dateObj);
};

/**
 * Format relative time (hace X días)
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now - past;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) return 'Ahora';
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
  if (diffInHours < 24) return `Hace ${diffInHours} horas`;
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  return `Hace ${Math.floor(diffInDays / 365)} años`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};

/**
 * Generate random color
 */
export const generateColor = () => {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', 
    '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Format compact number (1.2K, 1.5M)
 */
export const formatCompactNumber = (number) => {
  if (number < 1000) return number.toString();
  if (number < 1000000) return (number / 1000).toFixed(1) + 'K';
  if (number < 1000000000) return (number / 1000000).toFixed(1) + 'M';
  return (number / 1000000000).toFixed(1) + 'B';
};
