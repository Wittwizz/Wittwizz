import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FloatingNavigation from '../ui/FloatingNavigation';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Services from '../sections/Services';
import Packages from '../sections/Packages';
import LeadForm from '../sections/LeadForm';
import FinalCTA from '../ui/FinalCTA';
import SEOHead from './SEOHead';
import { BRAND_NAME } from '@/content/brand';

const sectionIds = ['hero', 'features', 'services', 'packages', 'lead-form', 'final-cta'] as const;
const sectionRoutes = ['/', '/features', '/services', '/packages', '/lead-form', '/contact'] as const;

const routeToSectionIndex: Record<string, number> = {
  '/': 0,
  '/features': 1,
  '/services': 2,
  '/packages': 3,
  '/lead-form': 4,
  '/lead_form': 4,
  '/contact': 5
};

const hashToSectionIndex: Record<string, number> = {
  hero: 0,
  features: 1,
  services: 2,
  packages: 3,
  'lead_form': 4,
  'lead-form': 4,
  contact: 5,
  'final-cta': 5
};

const hashToRoute: Record<string, string> = {
  hero: '/',
  features: '/features',
  services: '/services',
  packages: '/packages',
  'lead_form': '/lead-form',
  'lead-form': '/lead-form',
  contact: '/contact',
  'final-cta': '/contact'
};

const LandingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = React.useState(() => routeToSectionIndex[location.pathname] ?? 0);
  const currentSectionRef = React.useRef(currentSection);

  const scrollToSection = React.useCallback((sectionIndex: number) => {
    const sectionId = sectionIds[sectionIndex];
    if (!sectionId) {
      return;
    }

    const targetSection = document.querySelector(`[data-section="${sectionId}"]`) as HTMLElement | null;
    if (targetSection) {
      const header = document.querySelector('[data-app-navigation]') as HTMLElement | null;
      const headerOffset = (header?.offsetHeight ?? 0) + 16;
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: Math.max(targetPosition, 0), behavior: 'smooth' });
    }
  }, []);

  const handleSectionNavigate = React.useCallback(
    (sectionIndex: number) => {
      scrollToSection(sectionIndex);
      const targetPath = sectionRoutes[sectionIndex];
      if (targetPath && location.pathname !== targetPath) {
        navigate(targetPath);
      }
    },
    [navigate, location.pathname, scrollToSection]
  );

  React.useEffect(() => {
    const handleSectionRequest: EventListener = (event) => {
      const customEvent = event as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        scrollToSection(customEvent.detail);
      }
    };

    window.addEventListener('app:navigate-section', handleSectionRequest);
    return () => window.removeEventListener('app:navigate-section', handleSectionRequest);
  }, [scrollToSection]);

  React.useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  React.useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (!redirectPath) {
      return;
    }

    sessionStorage.removeItem('redirectPath');

    const normalizedPath = redirectPath.replace('/Wittwizz', '') || '/';
    const [rawPath, rawHash] = normalizedPath.split('#');

    let cleanedPath = rawPath?.trim() || '/';
    if (!cleanedPath.startsWith('/')) {
      cleanedPath = `/${cleanedPath}`;
    }
    cleanedPath = cleanedPath.replace(/\/+$/, '') || '/';

    if (rawHash) {
      const hash = rawHash.toLowerCase();
      const routeFromHash = hashToRoute[hash];

      if (routeFromHash) {
        if (routeFromHash !== location.pathname) {
          navigate(routeFromHash, { replace: true });
        } else {
          const sectionIndex = hashToSectionIndex[hash];
          if (sectionIndex !== undefined) {
            scrollToSection(sectionIndex);
          }
        }
        return;
      }

      const sectionIndex = hashToSectionIndex[hash];
      if (sectionIndex !== undefined) {
        scrollToSection(sectionIndex);
        return;
      }
    }

    if (cleanedPath !== location.pathname) {
      navigate(cleanedPath, { replace: true });
    }
  }, [navigate, location.pathname, scrollToSection]);

  const desiredSectionIndex = React.useMemo(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '').toLowerCase();
      if (hashToSectionIndex[hash] !== undefined) {
        return hashToSectionIndex[hash];
      }
    }

    if (routeToSectionIndex[location.pathname] !== undefined) {
      return routeToSectionIndex[location.pathname];
    }

    return 0;
  }, [location.hash, location.pathname]);

  React.useEffect(() => {
    setCurrentSection((prev) => (prev === desiredSectionIndex ? prev : desiredSectionIndex));
  }, [desiredSectionIndex]);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      scrollToSection(desiredSectionIndex);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [desiredSectionIndex, scrollToSection]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      let activeSection = currentSectionRef.current;

      sectionIds.forEach((sectionId, index) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element instanceof HTMLElement) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollY + windowHeight / 2 >= sectionTop && scrollY + windowHeight / 2 <= sectionBottom) {
            activeSection = index;
          }
        }
      });

      if (activeSection !== currentSectionRef.current) {
        currentSectionRef.current = activeSection;
        setCurrentSection(activeSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionSEO = React.useMemo(() => {
    const sectionData = [
      {
        title: `${BRAND_NAME} - AI-Powered Brand & Growth Partner`,
        description: "AI-powered brand, web, and growth partner for India's startups. Founder-friendly, efficient delivery.",
        canonical: 'https://wittwizz.github.io/Wittwizz/'
      },
      {
        title: `Features - ${BRAND_NAME}`,
        description: 'Lightning fast delivery, precision focused approach, and launch-ready solutions for startups.',
        canonical: 'https://wittwizz.github.io/Wittwizz/#features'
      },
      {
        title: `Services - ${BRAND_NAME}`,
        description: 'Complete digital services: Brand development, web development, and growth marketing for startups.',
        canonical: 'https://wittwizz.github.io/Wittwizz/#services'
      },
      {
        title: `Packages & Pricing - ${BRAND_NAME}`,
        description: 'Affordable packages for startups: Essentials, Growth, and Scale packages with transparent pricing.',
        canonical: 'https://wittwizz.github.io/Wittwizz/#packages'
      },
      {
        title: `Plan Your Sprint - ${BRAND_NAME}`,
        description: `Tell us about your goals and budget to receive a tailored ${BRAND_NAME} launch sprint plan.`,
        canonical: 'https://wittwizz.github.io/Wittwizz/#lead_form'
      },
      {
        title: `Contact Us - ${BRAND_NAME}`,
        description: `Get started with ${BRAND_NAME}. Schedule a call or start your project today.`,
        canonical: 'https://wittwizz.github.io/Wittwizz/#contact'
      }
    ];

    return sectionData[currentSection] || sectionData[0];
  }, [currentSection]);

  return (
    <>
      <SEOHead {...sectionSEO} />

      <FloatingNavigation currentPage={currentSection} onNavigate={handleSectionNavigate} />

      <div>
        <div data-section="hero">
          <Hero />
        </div>
        <div data-section="features">
          <Features />
        </div>
        <div data-section="services">
          <Services />
        </div>
        <div data-section="packages">
          <Packages />
        </div>
        <div data-section="lead-form">
          <LeadForm />
        </div>
        <div data-section="final-cta">
          <FinalCTA />
        </div>
      </div>
    </>
  );
};

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/features" element={<LandingPage />} />
    <Route path="/services" element={<LandingPage />} />
    <Route path="/packages" element={<LandingPage />} />
    <Route path="/lead-form" element={<LandingPage />} />
    <Route path="/lead_form" element={<LandingPage />} />
    <Route path="/contact" element={<LandingPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRouter;
