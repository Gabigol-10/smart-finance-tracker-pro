// ============================================
// FRAMER MOTION ANIMATION PRESETS
// ============================================

// Fade In Animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Slide Up Animation
export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Slide Down Animation
export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Slide Left Animation
export const slideLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Slide Right Animation
export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Scale Animation
export const scale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};

// Stagger Children Animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Card Hover Animation
export const cardHover = {
  hover: {
    y: -4,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  }
};

// Button Hover Animation
export const buttonHover = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95
  }
};

// Page Transition
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

// Bounce Animation
export const bounce = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// Rotate Animation
export const rotate = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5 }
  }
};

// Pulse Animation (Infinite)
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Float Animation (Infinite)
export const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Shake Animation
export const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 }
};

// Progress Bar Animation
export const progressBar = (value) => ({
  hidden: { width: 0 },
  visible: {
    width: `${value}%`,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
});

// Modal Backdrop
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Modal Content
export const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

// Notification Toast
export const toastNotification = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 500,
      damping: 40
    }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { duration: 0.2 }
  }
};

// List Item Stagger
export const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.3
    }
  })
};

// Chart Animation
export const chartAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
