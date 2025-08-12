import React from 'react';
import { motion } from 'framer-motion';

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  borderGradient?: string;
  hoverEffect?: boolean;
}

export const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  className = "",
  borderGradient = "from-accent-primary via-accent-secondary to-accent-tertiary",
  hoverEffect = true,
}) => {
  return (
    <motion.div
      className={`relative p-[2px] rounded-2xl bg-gradient-to-r ${borderGradient} ${className}`}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-tertiary/20"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content container */}
      <div className="relative bg-bg-tertiary rounded-2xl p-6 h-full">
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
