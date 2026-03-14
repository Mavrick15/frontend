import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  Star, 
  Eye,
  Copy,
  ExternalLink,
  Download,
  Play,
  Pause
} from 'lucide-react';

// Reusable animation variants
export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Interactive Button Component
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-blue-500/25',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      whileHover={!disabled ? { scale: 1.02, y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {prefix}
        {value.toLocaleString()}{suffix}
      </motion.span>
    </motion.div>
  );
};

// Pulse Animation Component
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  className = '',
  intensity = 'medium'
}) => {
  const intensityMap = {
    low: { scale: [1, 1.02, 1] },
    medium: { scale: [1, 1.05, 1] },
    high: { scale: [1, 1.1, 1] }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
      transition={{
        duration: intensity === 'low' ? 2 : intensity === 'medium' ? 1.5 : 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating Action Button
interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'blue' | 'green' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  badge?: number;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'blue',
  size = 'md',
  badge,
  className = ''
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`fixed ${positionClasses[position]} ${colorClasses[color]} ${sizeClasses[size]} rounded-full text-white shadow-lg hover:shadow-xl flex items-center justify-center z-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {icon}
      {badge && (
        <motion.span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );
};

// Social Share Buttons
interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  className = ''
}) => {
  const shareButtons = [
    {
      icon: <Share2 className="w-4 h-4" />,
      label: 'Partager',
      action: () => navigator.share?.({ url, title })
    },
    {
      icon: <Copy className="w-4 h-4" />,
      label: 'Copier',
      action: () => navigator.clipboard.writeText(url)
    },
    {
      icon: <ExternalLink className="w-4 h-4" />,
      label: 'Ouvrir',
      action: () => window.open(url, '_blank')
    }
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {shareButtons.map((button, index) => (
        <motion.button
          key={index}
          onClick={button.action}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={button.label}
        >
          {button.icon}
        </motion.button>
      ))}
    </div>
  );
};

// Rating Component
interface RatingProps {
  value: number;
  max?: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  readonly = false,
  onChange,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: max }, (_, index) => (
        <motion.button
          key={index}
          disabled={readonly}
          onClick={() => !readonly && onChange?.(index + 1)}
          className={`${sizeClasses[size]} transition-colors ${
            index < value ? 'text-yellow-400' : 'text-gray-300'
          } ${readonly ? 'cursor-default' : 'hover:text-yellow-400'}`}
          whileHover={!readonly ? { scale: 1.2 } : {}}
          whileTap={!readonly ? { scale: 0.8 } : {}}
        >
          <Star className="w-full h-full fill-current" />
        </motion.button>
      ))}
    </div>
  );
};

// Progress Ring Component
interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{Math.round((value / max) * 100)}%</span>
      </div>
    </div>
  );
};

// Hover Card Component
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Text Animation Component
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.1, duration: 0.5 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
