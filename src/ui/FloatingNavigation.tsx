import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Settings, Package, ClipboardList, PhoneCall } from 'lucide-react';

interface FloatingNavigationProps {
  currentPage?: number;
  onNavigate?: (sectionIndex: number) => void;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ currentPage = 0, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: 0, label: 'Home', icon: Home },
    { path: 1, label: 'Features', icon: Zap },
    { path: 2, label: 'Services', icon: Settings },
    { path: 3, label: 'Packages', icon: Package },
    { path: 4, label: 'Lead Form', icon: ClipboardList },
    { path: 5, label: 'Contact', icon: PhoneCall },
  ];

  const scrollToPage = (pageIndex: number) => {
    if (onNavigate) {
      onNavigate(pageIndex);
    }
  };

  return (
    <>
      {/* Desktop Floating Navigation - Balanced visibility with theme */}
      <div className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gray-900/90 backdrop-blur-md border border-blue-400/30 rounded-2xl px-6 py-3 shadow-2xl"
          style={{ 
            boxShadow: '0 20px 25px -5px rgba(0, 212, 255, 0.15), 0 10px 10px -5px rgba(0, 212, 255, 0.1), 0 0 0 1px rgba(0, 212, 255, 0.2)' 
          }}
        >
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => scrollToPage(item.path)}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'text-blue-400 bg-blue-500/20 font-semibold' 
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-blue-500/20 rounded-xl border border-blue-400/40"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-gray-900/90 backdrop-blur-md border border-blue-400/30 rounded-xl shadow-lg"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`} />
            <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 mt-1 ${
              isOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-300 mt-1 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40"
          >
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.path;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        scrollToPage(item.path);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'text-blue-400 bg-blue-500/20 font-semibold' 
                          : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xl font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavigation;
