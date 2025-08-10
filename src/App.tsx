import * as React from 'react';
import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Calculator from '@/sections/Calculator';
import CTA from '@/sections/CTA';
import { initializeAnalytics } from '@/lib/analytics';

export default function App(){
  console.log('🚀 App component rendering');
  console.log('📦 Calculator component imported:', Calculator);
  
  // Initialize analytics on app mount
  useEffect(() => {
    initializeAnalytics();
  }, []);
  
  return (
    <main>
      <Hero />
      <Features />
      <Calculator />
      <CTA />
    </main>
  );
}
