import * as React from 'react';
import clsx from 'clsx';
import { MOTION_DURATIONS, MOTION_EASINGS, getMotionScale, prefersReducedMotion } from '@/lib/motion';

type Props = React.HTMLAttributes<HTMLDivElement> & { as?: keyof JSX.IntrinsicElements };

export const Card: React.FC<Props> = ({ as: Comp = 'div', className, children, ...rest }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleMouseEnter = () => {
    if (!prefersReducedMotion()) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!prefersReducedMotion()) {
      setIsHovered(false);
    }
  };
  
  // Calculate scale values based on motion preference
  const hoverScale = getMotionScale(1.02);
  const hoverTranslate = prefersReducedMotion() ? 0 : -2; // -0.5rem
  
  const baseClasses = 'rounded-2xl border border-gray-100 bg-white/80 backdrop-blur shadow-card transition-all duration-200 ease-out will-change-transform dark:bg-white/10 dark:border-white/10';
  const hoverClasses = isHovered ? 'shadow-xl' : 'hover:shadow-lg';
  const transformClasses = isHovered ? 'scale-105 -translate-y-1' : 'hover:-translate-y-0.5';

  return (
    <Comp 
      className={clsx(baseClasses, hoverClasses, transformClasses, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDuration: `${MOTION_DURATIONS.normal}ms`,
        transitionTimingFunction: MOTION_EASINGS.smooth,
        transform: isHovered ? `scale(${hoverScale}) translateY(${hoverTranslate}px)` : undefined,
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
};
