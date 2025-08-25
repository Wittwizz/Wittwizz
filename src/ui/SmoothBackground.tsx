import React, { useEffect, useState } from 'react';

interface SmoothBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SmoothBackground: React.FC<SmoothBackgroundProps> = ({ children, className = '' }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which section is currently in view and get its color theme
  const getBackgroundStyle = () => {
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    const windowHeight = window.innerHeight;
    
    // Define section boundaries and their unique color themes - BALANCED SUBTLE
    const sections = [
      {
        name: 'hero',
        start: 0,
        end: 0.2,
        primary: 'var(--bg-primary)',
        secondary: 'rgba(0, 212, 255, 0.12)',      // Balanced electric blue
        tertiary: 'rgba(6, 182, 212, 0.08)'         // Balanced cyan
      },
      {
        name: 'features',
        start: 0.2,
        end: 0.4,
        primary: 'var(--bg-secondary)',
        secondary: 'rgba(124, 58, 237, 0.12)',      // Balanced purple
        tertiary: 'rgba(236, 72, 153, 0.08)'        // Balanced pink
      },
      {
        name: 'services',
        start: 0.4,
        end: 0.6,
        primary: 'var(--bg-tertiary)',
        secondary: 'rgba(16, 185, 129, 0.12)',      // Balanced green
        tertiary: 'rgba(249, 115, 22, 0.08)'        // Balanced orange
      },
      {
        name: 'packages',
        start: 0.6,
        end: 0.8,
        primary: 'var(--bg-primary)',
        secondary: 'rgba(245, 158, 11, 0.12)',      // Balanced amber
        tertiary: 'rgba(234, 179, 8, 0.08)'         // Balanced yellow
      },
      {
        name: 'final-cta',
        start: 0.8,
        end: 1,
        primary: 'var(--bg-secondary)',
        secondary: 'rgba(236, 72, 153, 0.12)',      // Balanced pink
        tertiary: 'rgba(6, 182, 212, 0.08)'         // Balanced cyan
      }
    ];

    // Find the current section
    let currentSection = sections[0];
    for (const section of sections) {
      if (scrollPercent >= section.start && scrollPercent < section.end) {
        currentSection = section;
        break;
      }
    }

    // Create a very subtle gradient based on the current section's theme
    return {
      background: `linear-gradient(135deg, 
        ${currentSection.primary} 0%, 
        ${currentSection.primary} 40%, 
        ${currentSection.secondary} 50%, 
        ${currentSection.primary} 60%, 
        ${currentSection.primary} 100%
      )`,
      backgroundSize: '200% 200%',
      animation: 'gradientShift 15s ease infinite'  // Much slower animation
    };
  };

  // Calculate overlay color based on current section - BALANCED SUBTLE
  const getOverlayStyle = () => {
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    
    if (scrollPercent < 0.2) {
      return { background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)' };
    } else if (scrollPercent < 0.4) {
      return { background: 'radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)' };
    } else if (scrollPercent < 0.6) {
      return { background: 'radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.15) 0%, transparent 60%)' };
    } else if (scrollPercent < 0.8) {
      return { background: 'radial-gradient(circle at 70% 70%, rgba(234, 179, 8, 0.15) 0%, transparent 60%)' };
    } else {
      return { background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)' };
    }
  };

  return (
    <div className={`smooth-background-container relative min-h-screen ${className}`}>
      {/* Dynamic Background with Section-Specific Themes */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-5000 ease-out"
        style={getBackgroundStyle()}
      />
      
      {/* Dynamic Overlay that Changes with Sections */}
      <div 
        className="fixed inset-0 -z-5 opacity-20 transition-all duration-5000 ease-out"
        style={getOverlayStyle()}
      />
      
      {/* Subtle Pattern Overlay for Depth */}
      <div 
        className="fixed inset-0 -z-5 opacity-8 transition-opacity duration-5000"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Custom CSS for gradient animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SmoothBackground;
