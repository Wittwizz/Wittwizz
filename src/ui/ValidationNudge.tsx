import * as React from 'react';
import { MOTION_DURATIONS, MOTION_EASINGS, prefersReducedMotion } from '@/lib/motion';

interface ValidationNudgeProps {
  children: React.ReactNode;
  className?: string;
  isValid?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

export const ValidationNudge: React.FC<ValidationNudgeProps> = ({
  children,
  className = '',
  isValid = true,
  showError = false,
  errorMessage = '',
}) => {
  const [isShaking, setIsShaking] = React.useState(false);
  const [hasShaken, setHasShaken] = React.useState(false);
  
  React.useEffect(() => {
    // Only shake on invalid state and when error is shown
    if (showError && !isValid && !hasShaken && !prefersReducedMotion()) {
      setIsShaking(true);
      setHasShaken(true);
      
      // Reset shaking state after animation
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, MOTION_DURATIONS.fast);
      
      return () => clearTimeout(timer);
    }
  }, [showError, isValid, hasShaken]);
  
  // Reset shake state when validation changes
  React.useEffect(() => {
    if (isValid) {
      setHasShaken(false);
    }
  }, [isValid]);
  
  const baseClasses = 'transition-all duration-150 ease-out';
  const shakeClasses = isShaking ? 'animate-shake' : '';
  const errorClasses = showError && !isValid ? 'border-red-500 ring-red-500' : '';
  
  return (
    <div className={`${baseClasses} ${shakeClasses} ${className}`}>
      {children}
      {showError && !isValid && errorMessage && (
        <div 
          className="mt-2 text-sm text-red-600 animate-fade-in"
          style={{
            animationDuration: `${MOTION_DURATIONS.fast}ms`,
            animationTimingFunction: MOTION_EASINGS.easeOut,
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

// CSS animation for shake effect
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
`;

// Add shake animation to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shakeKeyframes;
  if (!document.head.querySelector('style[data-shake-animation]')) {
    style.setAttribute('data-shake-animation', 'true');
    document.head.appendChild(style);
  }
}

// Form field wrapper component
export const ValidationField: React.FC<{
  children: React.ReactNode;
  isValid?: boolean;
  showError?: boolean;
  errorMessage?: string;
  className?: string;
}> = ({ children, isValid, showError, errorMessage, className = '' }) => (
  <ValidationNudge
    isValid={isValid}
    showError={showError}
    errorMessage={errorMessage}
    className={className}
  >
    {children}
  </ValidationNudge>
);



