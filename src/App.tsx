import * as React from 'react';
import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Guarantee from '@/sections/Guarantee';
import CaseStudies from '@/sections/CaseStudies';
import Support from '@/sections/Support';
import WhyStartups from '@/sections/WhyStartups';
import CalcExplainer from '@/sections/CalcExplainer';
import Calculator from '@/sections/Calculator';
import FAQs from '@/sections/FAQs';
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
      <Guarantee />
      <CaseStudies />
      <Support />
      <WhyStartups />
      <CalcExplainer />
      <Calculator />
      <FAQs />
      <CTA />
    </main>
  );
}
