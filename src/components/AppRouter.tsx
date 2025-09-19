import React, { useState, useEffect } from 'react';
import FloatingNavigation from '../ui/FloatingNavigation';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Services from '../sections/Services';
import Packages from '../sections/Packages';
import LeadForm from '../sections/LeadForm';
import FinalCTA from '../ui/FinalCTA';
import SEOHead from './SEOHead';

const AppRouter: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

  // Handle 404 redirects from GitHub Pages
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== '/Wittwizz/') {
      sessionStorage.removeItem('redirectPath');
      // Handle hash navigation for SPA sections
      if (redirectPath.includes('#')) {
        const hash = redirectPath.split('#')[1];
        const sectionMap: { [key: string]: number } = {
          features: 1,
          services: 2,
          packages: 3,
          lead_form: 4,
          'lead-form': 4,
          contact: 5
        };
        if (sectionMap[hash] !== undefined) {
          setTimeout(() => scrollToSection(sectionMap[hash]), 100);
        }
      }
    }
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is most visible
      const sections = [
        { id: 0, element: document.querySelector('[data-section="hero"]') },
        { id: 1, element: document.querySelector('[data-section="features"]') },
        { id: 2, element: document.querySelector('[data-section="services"]') },
        { id: 3, element: document.querySelector('[data-section="packages"]') },
        { id: 4, element: document.querySelector('[data-section="lead-form"]') },
        { id: 5, element: document.querySelector('[data-section="final-cta"]') }
      ];

      let activeSection = 0;
      
      sections.forEach((section, index) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          // Check if this section is in the center of the viewport
          if (scrollY + windowHeight / 2 >= sectionTop && scrollY + windowHeight / 2 <= sectionBottom) {
            activeSection = index;
          }
        }
      });
      
      setCurrentSection(activeSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = (sectionIndex: number) => {
    const sections = ['hero', 'features', 'services', 'packages', 'lead-form', 'final-cta'];
    
    const targetSection = document.querySelector(`[data-section="${sections[sectionIndex]}"]`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get section-specific SEO data
  const getSectionSEO = () => {
    const sectionData = [
      {
        title: "Wittwiz Digital - AI-Powered Brand & Growth Partner",
        description: "AI-powered brand, web, and growth partner for India's startups. Founder-friendly, efficient delivery.",
        canonical: "https://wittwizz.github.io/Wittwizz/"
      },
      {
        title: "Features - Wittwiz Digital",
        description: "Lightning fast delivery, precision focused approach, and launch-ready solutions for startups.",
        canonical: "https://wittwizz.github.io/Wittwizz/#features"
      },
      {
        title: "Services - Wittwiz Digital",
        description: "Complete digital services: Brand development, web development, and growth marketing for startups.",
        canonical: "https://wittwizz.github.io/Wittwizz/#services"
      },
      {
        title: "Packages & Pricing - Wittwiz Digital",
        description: "Affordable packages for startups: Essentials, Growth, and Scale packages with transparent pricing.",
        canonical: "https://wittwizz.github.io/Wittwizz/#packages"
      },
      {
        title: "Plan Your Sprint - Wittwiz Digital",
        description: "Tell us about your goals and budget to receive a tailored Wittwiz launch sprint plan.",
        canonical: "https://wittwizz.github.io/Wittwizz/#lead_form"
      },
      {
        title: "Contact Us - Wittwiz Digital",
        description: "Get started with Wittwiz Digital. Schedule a call or start your project today.",
        canonical: "https://wittwizz.github.io/Wittwizz/#contact"
      }
    ];
    return sectionData[currentSection] || sectionData[0];
  };

  return (
    <>
      {/* Dynamic SEO Head */}
      <SEOHead {...getSectionSEO()} />
      
      {/* Beautiful Floating Navigation - Synced with current section */}
      <FloatingNavigation currentPage={currentSection} onNavigate={scrollToSection} />
      
      {/* Complete Page with Smooth Background Blending */}
      <div className="pt-20">
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

export default AppRouter;
