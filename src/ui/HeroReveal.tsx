import * as React from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, prefersReducedMotion } from '@/lib/motion';

interface HeroRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({
  children,
  className = '',
  staggerDelay = 100,
  duration = MOTION_DURATIONS.slower,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  
  React.useEffect(() => {
    // Only trigger once per page load
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasAnimated(true);
    }, 100); // Small delay for better visual impact
    
    return () => clearTimeout(timer);
  }, [hasAnimated]);
  
  // If reduced motion is preferred, show immediately without animation
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }
  
  const baseClasses = 'transition-all duration-600 ease-out';
  const animationClasses = isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-4';
  
  return (
    <div 
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: MOTION_EASINGS.easeOut,
      }}
    >
      {children}
    </div>
  );
};

// Staggered child component for sequential animations
export const HeroRevealChild: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }
  
  const baseClasses = 'transition-all duration-600 ease-out';
  const animationClasses = isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-4';
  
  return (
    <div 
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={{
        transitionDuration: `${MOTION_DURATIONS.slower}ms`,
        transitionTimingFunction: MOTION_EASINGS.easeOut,
      }}
    >
      {children}
    </div>
  );
};



