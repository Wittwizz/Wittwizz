import * as React from 'react';
import { Slot } from './Slot';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: Variant;
    size?: Size;
  }
>(({ asChild, className, variant = 'primary', size = 'md', ...props }, ref) => {
  const Comp: any = asChild ? Slot : 'button';
  const base = 'inline-flex items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-transform duration-150 active:scale-[0.98]';
  const sizes = { 
    sm: 'h-8 px-3 text-sm', 
    md: 'h-10 px-4 text-base', 
    lg: 'h-12 px-5 text-base' 
  };
  const variants = {
    primary: 'bg-primary text-white hover:opacity-95 ring-primary shadow-card',
    ghost: 'bg-transparent text-ink hover:bg-gray-100 ring-primary'
  };

  return (
    <Comp
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className || ''}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';
