// ============================================
// CHART.JS PREMIUM CONFIGURATION
// ============================================

/**
 * Get chart colors based on theme
 */
export const getChartColors = (isDark = true) => {
  if (isDark) {
    return {
      primary: '#3B82F6',
      success: '#10B981',
      danger: '#EF4444',
      warning: '#F59E0B',
      info: '#06B6D4',
      purple: '#8B5CF6',
      pink: '#EC4899',
      grid: 'rgba(255, 255, 255, 0.05)',
      text: '#F8FAFC',
      textSecondary: '#CBD5E1',
    };
  }
  return {
    primary: '#2563EB',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#06B6D4',
    purple: '#8B5CF6',
    pink: '#EC4899',
    grid: 'rgba(0, 0, 0, 0.05)',
    text: '#0F172A',
    textSecondary: '#64748B',
  };
};

/**
 * Default chart options
 */
export const defaultChartOptions = (isDark = true) => {
  const colors = getChartColors(isDark);
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: colors.text,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 500,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.grid,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          family: 'Inter, sans-serif',
          weight: 600,
        },
        bodyFont: {
          size: 12,
          family: 'Inter, sans-serif',
        },
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: colors.grid,
          drawBorder: false,
        },
        ticks: {
          color: colors.textSecondary,
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: colors.textSecondary,
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };
};

/**
 * Line chart configuration
 */
export const lineChartConfig = (isDark = true) => {
  return {
    ...defaultChartOptions(isDark),
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        hitRadius: 10,
      },
    },
  };
};

/**
 * Bar chart configuration
 */
export const barChartConfig = (isDark = true) => {
  return {
    ...defaultChartOptions(isDark),
    elements: {
      bar: {
        borderRadius: 8,
        borderSkipped: false,
      },
    },
  };
};

/**
 * Doughnut chart configuration
 */
export const doughnutChartConfig = (isDark = true) => {
  const colors = getChartColors(isDark);
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.text,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 500,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.grid,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    cutout: '70%',
  };
};

/**
 * Create gradient background
 */
export const createGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

/**
 * Color palette for charts
 */
export const chartColorPalette = [
  'rgba(239, 68, 68, 0.8)',   // Red
  'rgba(59, 130, 246, 0.8)',  // Blue
  'rgba(245, 158, 11, 0.8)',  // Orange
  'rgba(139, 92, 246, 0.8)',  // Purple
  'rgba(16, 185, 129, 0.8)',  // Green
  'rgba(236, 72, 153, 0.8)',  // Pink
  'rgba(6, 182, 212, 0.8)',   // Cyan
  'rgba(251, 146, 60, 0.8)',  // Orange light
];

/**
 * Generate dataset with theme colors
 */
export const generateDataset = (label, data, type = 'line', colorIndex = 0, isDark = true) => {
  const colors = getChartColors(isDark);
  const paletteColor = chartColorPalette[colorIndex % chartColorPalette.length];
  
  const baseConfig = {
    label,
    data,
  };

  if (type === 'line') {
    return {
      ...baseConfig,
      borderColor: paletteColor,
      backgroundColor: paletteColor.replace('0.8', '0.1'),
      fill: true,
      tension: 0.4,
      borderWidth: 3,
    };
  }

  if (type === 'bar') {
    return {
      ...baseConfig,
      backgroundColor: paletteColor,
      borderRadius: 8,
      borderSkipped: false,
    };
  }

  return baseConfig;
};
