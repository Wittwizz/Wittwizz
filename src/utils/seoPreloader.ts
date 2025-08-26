// SEO Preloader for GitHub Pages SPA
export const initSEOPreloader = () => {
  // Preload critical resources
  const preloadResources = [
    '/Wittwizz/assets/hero_og.jpg',
    '/Wittwizz/assets/hero_gradient.jpg'
  ];

  preloadResources.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Add schema.org breadcrumb data
  const addBreadcrumbSchema = () => {
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      try {
        const currentSchema = JSON.parse(existingSchema.textContent || '{}');
        
        // Add breadcrumb to existing schema
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://wittwizz.github.io/Wittwizz/"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Services",
              "item": "https://wittwizz.github.io/Wittwizz/#services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Packages",
              "item": "https://wittwizz.github.io/Wittwizz/#packages"
            }
          ]
        };

        // Create new script tag for breadcrumb
        const breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(breadcrumbScript);
      } catch (e) {
        console.warn('Could not parse existing schema:', e);
      }
    }
  };

  // Initialize breadcrumb after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addBreadcrumbSchema);
  } else {
    addBreadcrumbSchema();
  }

  // Add page load performance tracking
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          // Log performance data for SEO optimization
          console.log('Page Load Performance:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart
          });
        }
      }, 0);
    });
  }
};

// Export function to update page URLs for analytics
export const updatePageForSEO = (section: string) => {
  const newUrl = `${window.location.origin}/Wittwizz/#${section}`;
  
  // Update URL without page reload (for analytics)
  if (history.pushState) {
    history.pushState(null, '', newUrl);
  }
  
  // Trigger Google Analytics page view if available
  if (typeof gtag === 'function') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: `/#${section}`,
      page_title: `${section.charAt(0).toUpperCase() + section.slice(1)} - Wittwiz Digital`
    });
  }
};
