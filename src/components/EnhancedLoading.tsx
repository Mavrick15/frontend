import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
  showProgress?: boolean;
  className?: string;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  showProgress = false,
  className = ''
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showProgress]);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const renderSpinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      variants={itemVariants}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} bg-blue-600 rounded-full`}
          variants={itemVariants}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={`${sizeClasses[size]} bg-blue-600 rounded-full`}
      variants={itemVariants}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 1, 0.3]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  );

  const renderSkeleton = () => (
    <div className="space-y-2 w-full">
      <motion.div
        className="h-4 bg-gray-200 rounded"
        variants={itemVariants}
        animate={{
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      />
      <motion.div
        className="h-4 bg-gray-200 rounded w-3/4"
        variants={itemVariants}
        animate={{
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.2
        }}
      />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderContent()}
      {text && (
        <motion.p
          className="text-sm text-gray-600 text-center"
          variants={itemVariants}
        >
          {text}
        </motion.p>
      )}
      {showProgress && (
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Chargement...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedLoading;
