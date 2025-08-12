import * as React from 'react';
import { Slot } from './Slot';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: Variant;
    size?: Size;
  }
>(({ asChild, className, variant = 'primary', size = 'md', ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handleMouseDown = () => {
    setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleMouseLeave = () => {
    setIsPressed(false);
  };
  
  const Comp: any = asChild ? Slot : 'button';
  
  const base = 'inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary transition-all duration-300 ease-futuristic will-change-transform relative overflow-hidden group';
  
  const sizes = { 
    sm: 'h-9 px-4 text-sm rounded-lg', 
    md: 'h-11 px-6 text-base rounded-lg', 
    lg: 'h-14 px-8 text-lg rounded-xl',
    xl: 'h-16 px-10 text-xl rounded-xl'
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary border-0 shadow-glow hover:shadow-glow-lg hover:-translate-y-1',
    secondary: 'bg-bg-tertiary text-accent-primary border-2 border-accent-primary hover:bg-accent-primary hover:text-bg-primary shadow-md hover:shadow-xl',
    ghost: 'bg-transparent text-accent-primary hover:bg-bg-tertiary border-2 border-transparent hover:border-accent-primary',
    outline: 'bg-transparent text-text-primary border-2 border-border-primary hover:border-accent-primary hover:text-accent-primary'
  };
  
  const pressedClasses = isPressed ? 'scale-95' : '';
  const hoverClasses = !isPressed ? 'hover:scale-105' : '';

  return (
    <Comp
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${pressedClasses} ${hoverClasses} ${className || ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Shimmer effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      )}
      
      {/* Glow effect for secondary button */}
      {variant === 'secondary' && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {props.children}
      </span>
    </Comp>
  );
});

Button.displayName = 'Button';
