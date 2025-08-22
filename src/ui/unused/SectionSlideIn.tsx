import * as React from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_THRESHOLDS, prefersReducedMotion } from '@/lib/motion';

interface SectionSlideInProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const SectionSlideIn: React.FC<SectionSlideInProps> = ({
  children,
  className = '',
  threshold = MOTION_THRESHOLDS.standard, // 15% in viewport
  duration = MOTION_DURATIONS.normal,
  direction = 'up',
  distance = 24, // 6rem in pixels
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (prefersReducedMotion() || hasAnimated) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          // Once animated, disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Start animation slightly before fully in view
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, hasAnimated]);
  
  // If reduced motion is preferred, show immediately without animation
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }
  
  // Calculate initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };
  
  const baseClasses = 'transition-all ease-out will-change-transform';
  const animationClasses = isVisible 
    ? 'opacity-100 translate-x-0 translate-y-0' 
    : `opacity-0 ${getInitialTransform()}`;
  
  return (
    <div 
      ref={ref}
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

// Variant components for common directions
export const SlideUp: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <SectionSlideIn direction="up" className={className}>
    {children}
  </SectionSlideIn>
);

export const SlideDown: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <SectionSlideIn direction="down" className={className}>
    {children}
  </SectionSlideIn>
);

export const SlideLeft: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <SectionSlideIn direction="left" className={className}>
    {children}
  </SectionSlideIn>
);

export const SlideRight: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <SectionSlideIn direction="right" className={className}>
    {children}
  </SectionSlideIn>
);




