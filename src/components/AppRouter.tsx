import React, { useState, useEffect } from 'react';
import FloatingNavigation from '../ui/FloatingNavigation';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Services from '../sections/Services';
import Packages from '../sections/Packages';
import FinalCTA from '../ui/FinalCTA';

const AppRouter: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

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
        { id: 4, element: document.querySelector('[data-section="final-cta"]') }
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
    const sections = [
      'hero',
      'features', 
      'services',
      'packages',
      'final-cta'
    ];
    
    const targetSection = document.querySelector(`[data-section="${sections[sectionIndex]}"]`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
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
        <div data-section="final-cta">
          <FinalCTA />
        </div>
      </div>
    </>
  );
};

export default AppRouter;
