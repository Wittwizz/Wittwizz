import React, { useEffect, useMemo, useState } from 'react';

type SectionTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  overlay: string;
};

type SectionPosition = {
  name: string;
  top: number;
};

const SECTION_THEMES: Record<string, SectionTheme> = {
  hero: {
    primary: 'var(--bg-primary)',
    secondary: 'rgba(0, 212, 255, 0.12)',
    tertiary: 'rgba(6, 182, 212, 0.08)',
    overlay: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)'
  },
  features: {
    primary: 'var(--bg-secondary)',
    secondary: 'rgba(124, 58, 237, 0.12)',
    tertiary: 'rgba(236, 72, 153, 0.08)',
    overlay: 'radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)'
  },
  services: {
    primary: 'var(--bg-tertiary)',
    secondary: 'rgba(16, 185, 129, 0.12)',
    tertiary: 'rgba(249, 115, 22, 0.08)',
    overlay: 'radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.15) 0%, transparent 60%)'
  },
  packages: {
    primary: 'var(--bg-primary)',
    secondary: 'rgba(245, 158, 11, 0.12)',
    tertiary: 'rgba(234, 179, 8, 0.08)',
    overlay: 'radial-gradient(circle at 70% 70%, rgba(234, 179, 8, 0.15) 0%, transparent 60%)'
  },
  'lead-form': {
    primary: 'var(--bg-secondary)',
    secondary: 'rgba(59, 130, 246, 0.12)',
    tertiary: 'rgba(37, 99, 235, 0.08)',
    overlay: 'radial-gradient(circle at 50% 25%, rgba(59, 130, 246, 0.16) 0%, transparent 65%)'
  },
  'final-cta': {
    primary: 'var(--bg-secondary)',
    secondary: 'rgba(236, 72, 153, 0.12)',
    tertiary: 'rgba(6, 182, 212, 0.08)',
    overlay: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)'
  }
};

const DEFAULT_THEME = SECTION_THEMES.hero;

interface SmoothBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SmoothBackground: React.FC<SmoothBackgroundProps> = ({ children, className = '' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionPositions, setSectionPositions] = useState<SectionPosition[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateSections = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      const positions = elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const name = element.dataset.section || 'hero';

          return { name, top };
        })
        .sort((a, b) => a.top - b.top);

      setSectionPositions(positions);
    };

    updateSections();
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSections);
    window.addEventListener('load', updateSections);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSections);
      window.removeEventListener('load', updateSections);
    };
  }, []);

  const activeSectionName = useMemo(() => {
    if (typeof window === 'undefined' || sectionPositions.length === 0) {
      return 'hero';
    }

    const viewportMid = scrollY + window.innerHeight / 2;

    for (let index = sectionPositions.length - 1; index >= 0; index -= 1) {
      const section = sectionPositions[index];
      if (viewportMid >= section.top) {
        return section.name;
      }
    }

    return sectionPositions[0]?.name ?? 'hero';
  }, [scrollY, sectionPositions]);

  const currentTheme = SECTION_THEMES[activeSectionName] ?? DEFAULT_THEME;

  const backgroundStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg,
        ${currentTheme.primary} 0%,
        ${currentTheme.primary} 35%,
        ${currentTheme.secondary} 55%,
        ${currentTheme.tertiary} 75%,
        ${currentTheme.primary} 100%
      )`,
      backgroundSize: '200% 200%',
      animation: 'gradientShift 15s ease infinite'
    }),
    [currentTheme]
  );

  const overlayStyle = useMemo(
    () => ({
      background: currentTheme.overlay
    }),
    [currentTheme]
  );

  return (
    <div className={`smooth-background-container relative min-h-screen ${className}`}>
      {/* Dynamic Background with Section-Specific Themes */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-5000 ease-out"
        style={backgroundStyle}
      />
      
      {/* Dynamic Overlay that Changes with Sections */}
      <div
        className="fixed inset-0 -z-5 opacity-20 transition-all duration-5000 ease-out"
        style={overlayStyle}
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
