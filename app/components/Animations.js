'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

// Stagger animation for lists
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Card hover animations
export const cardHover = {
  hover: {
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// Button animations
export const buttonTap = {
  tap: { scale: 0.95 }
};

export const buttonHover = {
  hover: { 
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Slide animations
export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
};

export const slideInFromTop = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 }
};

export const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 }
};

// Fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 }
};

// Scale animations
export const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 }
};

export const scaleInCenter = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

// Rotate animations
export const rotateIn = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 180, opacity: 0 }
};

// Bounce animations
export const bounceIn = {
  initial: { scale: 0.3, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15
    }
  },
  exit: { scale: 0.3, opacity: 0 }
};

// Progress bar animation
export const progressBar = {
  initial: { width: 0 },
  animate: { width: '100%' }
};

// Typing animation
export const typingAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const typingChar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

// Floating animation
export const floating = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Shake animation for errors
export const shake = {
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  }
};

// Glow animation
export const glow = {
  animate: {
    boxShadow: [
      '0 0 0px rgba(59, 130, 246, 0)',
      '0 0 20px rgba(59, 130, 246, 0.5)',
      '0 0 0px rgba(59, 130, 246, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

// Animated wrapper components
export const AnimatedPage = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export const AnimatedCard = ({ children, className = '', ...props }) => (
  <motion.div
    className={className}
    variants={cardHover}
    whileHover="hover"
    {...props}
  >
    {children}
  </motion.div>
);

export const AnimatedButton = ({ children, className = '', ...props }) => (
  <motion.button
    className={className}
    variants={buttonHover}
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.button>
);

export const AnimatedList = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
);

export const AnimatedListItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={staggerItem}
  >
    {children}
  </motion.div>
);

// Loading skeleton with animation
export const SkeletonLoader = ({ className = '', ...props }) => (
  <motion.div
    className={`bg-gray-700 rounded animate-pulse ${className}`}
    variants={pulseAnimation}
    animate="animate"
    {...props}
  />
);

// Animated counter
export const AnimatedCounter = ({ value, duration = 2, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </motion.span>
  );
};

// Animated progress bar
export const AnimatedProgress = ({ progress, className = '', ...props }) => (
  <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`} {...props}>
    <motion.div
      className="bg-blue-500 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  </div>
);

// Animated text reveal
export const AnimatedText = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  return (
    <motion.div
      className={className}
      variants={typingAnimation}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={typingChar}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
