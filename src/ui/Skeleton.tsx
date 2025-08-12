import * as React from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, prefersReducedMotion } from '@/lib/motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  spacing?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1,
  spacing = 4,
}) => {
  // If reduced motion is preferred, show static skeleton
  if (prefersReducedMotion()) {
    return (
      <div className={`skeleton-static ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded"
            style={{
              width: width || '100%',
              height: height || (variant === 'text' ? '1rem' : '100%'),
              marginBottom: index < lines - 1 ? `${spacing}px` : 0,
            }}
          />
        ))}
      </div>
    );
  }
  
  const baseClasses = 'skeleton-pulse bg-gray-200 dark:bg-gray-700';
  
  // Variant-specific classes
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };
  
  if (lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              width: width || '100%',
              height: height || '1rem',
              marginBottom: index < lines - 1 ? `${spacing}px` : 0,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

// Predefined skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <Skeleton variant="text" lines={lines} className={className} />
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className 
}) => (
  <Skeleton 
    variant="circular" 
    width={size} 
    height={size} 
    className={className} 
  />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`space-y-3 ${className}`}>
    <Skeleton variant="rounded" height={200} />
    <SkeletonText lines={2} />
    <Skeleton variant="rounded" height={40} width="60%" />
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-2">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            height={20}
            width={colIndex === 0 ? '30%' : '100%'}
          />
        ))}
      </div>
    ))}
  </div>
);

// CSS animation for pulse effect
const pulseKeyframes = `
  @keyframes skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .skeleton-pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
  
  .skeleton-static {
    /* No animation for reduced motion */
  }
`;

// Add pulse animation to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = pulseKeyframes;
  if (!document.head.querySelector('style[data-skeleton-animation]')) {
    style.setAttribute('data-skeleton-animation', 'true');
    document.head.appendChild(style);
  }
}



