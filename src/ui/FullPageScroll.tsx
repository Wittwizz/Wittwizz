import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FullPageScrollProps {
  children: React.ReactNode[];
  className?: string;
  onPageChange?: (pageIndex: number) => void;
}

const FullPageScroll: React.FC<FullPageScrollProps> = ({ children, className = '', onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pages = React.Children.toArray(children);

  // Notify parent of page changes
  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  // Handle scroll events
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentPage < pages.length - 1) {
        // Scroll down - next page
        setCurrentPage(prev => prev + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        // Scroll up - previous page
        setCurrentPage(prev => prev - 1);
      }
      
      // Debounce scrolling
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentPage, pages.length, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' && currentPage < pages.length - 1) {
        e.preventDefault();
        setIsScrolling(true);
        setCurrentPage(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 500);
      } else if (e.key === 'ArrowUp' && currentPage > 0) {
        e.preventDefault();
        setIsScrolling(true);
        setCurrentPage(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length, isScrolling]);

  // Auto-scroll to current page
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: currentPage * window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);

  return (
    <div 
      ref={containerRef}
      className={`full-page-scroll-container overflow-hidden ${className}`}
      style={{ height: '100vh' }}
    >
      {/* Page Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentPage 
                ? 'bg-accent-primary scale-125' 
                : 'bg-accent-primary/30 hover:bg-accent-primary/60'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 0}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentPage === 0 
              ? 'text-accent-primary/30 cursor-not-allowed' 
              : 'text-accent-primary hover:bg-accent-primary/10 hover:scale-110'
          }`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => currentPage < pages.length - 1 && setCurrentPage(prev => prev + 1)}
          disabled={currentPage === pages.length - 1}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentPage === pages.length - 1 
              ? 'text-accent-primary/30 cursor-not-allowed' 
              : 'text-accent-primary hover:bg-accent-primary/10 hover:scale-110'
          }`}
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Pages Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="min-h-screen"
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FullPageScroll;
