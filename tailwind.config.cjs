/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        // Futuristic Dark Theme Colors
        primary: "#00D4FF",        // Electric blue
        secondary: "#7C3AED",      // Electric purple
        tertiary: "#10B981",       // Neon green
        warning: "#F59E0B",        // Amber glow
        
        // Background Colors
        'bg-primary': "#0A0A0F",   // Deep space black
        'bg-secondary': "#111118", // Dark slate
        'bg-tertiary': "#1A1A2E",  // Midnight blue
        'bg-accent': "#16213E",    // Deep ocean
        
        // Text Colors
        'text-primary': "#FFFFFF",   // Pure white
        'text-secondary': "#E2E8F0", // Light gray
        'text-muted': "#94A3B8",     // Muted gray
        'text-accent': "#00D4FF",    // Electric blue text
        
        // Border Colors
        'border-primary': "#1E293B", // Dark borders
        'border-accent': "#00D4FF",  // Glowing borders
        'border-glow': "rgba(0, 212, 255, 0.3)", // Subtle glow
        
        // Accent Colors (for direct use)
        'accent-primary': "#00D4FF",    // Electric blue
        'accent-secondary': "#7C3AED",  // Electric purple
        'accent-tertiary': "#10B981",   // Neon green
        'accent-warning': "#F59E0B",    // Amber glow
      },
      borderRadius: {
        'sm': '0.25rem',    // Sharp corners
        'md': '0.5rem',     // Medium sharp
        'lg': '1rem',       // Large sharp
        'xl': '1.5rem',     // Extra large
        '2xl': '2rem',      // Double extra large
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 212, 255, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 212, 255, 0.1), 0 2px 4px -1px rgba(0, 212, 255, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 212, 255, 0.1), 0 4px 6px -2px rgba(0, 212, 255, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 212, 255, 0.1), 0 10px 10px -5px rgba(0, 212, 255, 0.04)',
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.6)',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
      },
      transitionDuration: {
        'fast': '0.15s',
        'normal': '0.3s',
        'slow': '0.5s',
        'mesmerizing': '0.8s',
      },
      transitionTimingFunction: {
        'futuristic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      backgroundImage: {
        'geometric': 'radial-gradient(circle at 25% 25%, #00D4FF 0%, transparent 50%), radial-gradient(circle at 75% 75%, #7C3AED 0%, transparent 50%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'geometric': '200px 200px',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      }
    }
  },
  plugins: []
}
