import * as React from 'react';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Calculator from '@/sections/Calculator';
import CTA from '@/sections/CTA';

export default function App(){
  console.log('🚀 App component rendering');
  console.log('📦 Calculator component imported:', Calculator);
  
  return (
    <main>
      <Hero />
      <Features />
      <Calculator />
      <CTA />
    </main>
  );
}
