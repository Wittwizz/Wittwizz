/**
 * Centralized motion tokens for consistent animations across the Wittwizz website
 * All animations use only opacity/transform properties for performance
 */

// Duration tokens (in milliseconds)
export const MOTION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 450,
  slower: 600,
} as const;

// Easing functions using CSS cubic-bezier
export const MOTION_EASINGS = {
  // Standard easing curves
  ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  // Custom easing for specific use cases
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Animation properties that are safe for performance
export const MOTION_PROPERTIES = {
  safe: ['opacity', 'transform'],
  unsafe: ['height', 'width', 'padding', 'margin', 'top', 'left'],
} as const;

// Intersection Observer thresholds for scroll-triggered animations
export const MOTION_THRESHOLDS = {
  early: 0.1,
  standard: 0.15,
  late: 0.25,
  veryLate: 0.5,
} as const;

// Reduced motion support
export const MOTION_REDUCED = {
  duration: 0.1, // 100ms for reduced motion
  scale: 0.99, // Minimal scale change
  translate: 0, // No translation
} as const;

// Common animation configurations
export const MOTION_CONFIGS = {
  fadeIn: {
    duration: MOTION_DURATIONS.normal,
    easing: MOTION_EASINGS.easeOut,
    properties: ['opacity'],
  },
  slideUp: {
    duration: MOTION_DURATIONS.normal,
    easing: MOTION_EASINGS.easeOut,
    properties: ['opacity', 'transform'],
  },
  scale: {
    duration: MOTION_DURATIONS.fast,
    easing: MOTION_EASINGS.smooth,
    properties: ['transform'],
  },
  hero: {
    duration: MOTION_DURATIONS.slower,
    easing: MOTION_EASINGS.easeOut,
    properties: ['opacity', 'transform'],
  },
} as const;

// CSS custom properties for use in CSS-in-JS or CSS modules
export const MOTION_CSS_VARS = {
  '--motion-duration-fast': `${MOTION_DURATIONS.fast}ms`,
  '--motion-duration-normal': `${MOTION_DURATIONS.normal}ms`,
  '--motion-duration-slow': `${MOTION_DURATIONS.slow}ms`,
  '--motion-duration-slower': `${MOTION_DURATIONS.slower}ms`,
  '--motion-easing-ease': MOTION_EASINGS.ease,
  '--motion-easing-ease-in': MOTION_EASINGS.easeIn,
  '--motion-easing-ease-out': MOTION_EASINGS.easeOut,
  '--motion-easing-ease-in-out': MOTION_EASINGS.easeInOut,
  '--motion-easing-bounce': MOTION_EASINGS.bounce,
  '--motion-easing-smooth': MOTION_EASINGS.smooth,
  '--motion-easing-spring': MOTION_EASINGS.spring,
} as const;

// Utility function to check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility function to get appropriate duration based on motion preference
export const getMotionDuration = (duration: number): number => {
  return prefersReducedMotion() ? MOTION_REDUCED.duration * 1000 : duration;
};

// Utility function to get appropriate scale value based on motion preference
export const getMotionScale = (scale: number): number => {
  return prefersReducedMotion() ? MOTION_REDUCED.scale : scale;
};




