import * as React from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, getMotionScale, prefersReducedMotion } from '@/lib/motion';

interface ToggleMicroProps {
  children: React.ReactNode;
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleMicro: React.FC<ToggleMicroProps> = ({
  children,
  isActive = false,
  onChange,
  className = '',
  disabled = false,
  size = 'md',
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!isActive);
  };
  
  const handleMouseDown = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(false);
  };
  
  const handleMouseLeave = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(false);
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-6 w-11 text-xs',
    md: 'h-8 w-14 text-sm',
    lg: 'h-10 w-16 text-base',
  };
  
  // Calculate scale values based on motion preference
  const activeScale = getMotionScale(1.05);
  const pressedScale = getMotionScale(0.95);
  
  const baseClasses = 'relative inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 ease-out select-none';
  const stateClasses = isActive 
    ? 'bg-primary text-white shadow-lg' 
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const pressedClasses = isPressed ? 'scale-95' : '';
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${disabledClasses} ${pressedClasses} ${className}`}
      onClick={handleToggle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDuration: `${MOTION_DURATIONS.fast}ms`,
        transitionTimingFunction: MOTION_EASINGS.smooth,
        transform: isPressed ? `scale(${pressedScale})` : undefined,
      }}
    >
      <span className="sr-only">
        {isActive ? 'Active' : 'Inactive'}
      </span>
      {children}
    </button>
  );
};

// Switch variant with toggle indicator
export const ToggleSwitch: React.FC<{
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}> = ({ isActive, onChange, className, disabled, size = 'md', label }) => {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!isActive);
  };
  
  const handleMouseDown = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(false);
  };
  
  const handleMouseLeave = () => {
    if (disabled || prefersReducedMotion()) return;
    setIsPressed(false);
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  };
  
  const indicatorSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  const baseClasses = 'relative inline-flex items-center rounded-full cursor-pointer transition-all duration-200 ease-out select-none';
  const stateClasses = isActive 
    ? 'bg-primary' 
    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const pressedClasses = isPressed ? 'scale-95' : '';
  
  const indicatorClasses = `absolute transition-all duration-200 ease-out rounded-full bg-white shadow-md ${indicatorSize[size]}`;
  const indicatorPosition = isActive ? 'translate-x-full' : 'translate-x-0.5';
  
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-disabled={disabled}
        className={`${baseClasses} ${sizeClasses[size]} ${stateClasses} ${disabledClasses} ${pressedClasses} ${className}`}
        onClick={handleToggle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          transitionDuration: `${MOTION_DURATIONS.normal}ms`,
          transitionTimingFunction: MOTION_EASINGS.smooth,
        }}
      >
        <div 
          className={`${indicatorClasses} ${indicatorPosition}`}
          style={{
            transitionDuration: `${MOTION_DURATIONS.normal}ms`,
            transitionTimingFunction: MOTION_EASINGS.smooth,
          }}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
};




