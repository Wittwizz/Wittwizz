import * as React from 'react';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Services from '@/sections/Services';
import Packages from '@/sections/Packages';

export default function App() {
  console.log('🚀 App component rendering - Seamless Futuristic Experience');

  return (
    <main className="min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Seamless Hero Section */}
      <Hero />
      
      {/* Smooth transition to Features */}
      <div className="relative">
        {/* Gradient transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-primary to-bg-secondary z-10" />
        <Features />
      </div>
      
      {/* Smooth transition to Services */}
      <div className="relative">
        {/* Gradient transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-secondary to-bg-primary z-10" />
        <Services />
      </div>
      
      {/* Smooth transition to Packages */}
      <div className="relative">
        {/* Gradient transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-primary to-bg-secondary z-10" />
        <Packages />
      </div>

      {/* Final seamless section */}
      <div className="relative py-20 bg-bg-secondary">
        {/* Gradient transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-secondary to-bg-primary z-10" />
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-8">
              Ready to <span className="text-accent-primary">Launch</span> Your Startup?
            </h2>
            <p className="text-xl text-text-secondary mb-12 leading-relaxed">
              Join 40+ Indian founders who've already transformed their digital presence with Wittwizz. 
              Your futuristic growth journey starts here.
            </p>
            
            {/* Final CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 flex items-center gap-3 group">
                <span className="text-lg">🚀</span>
                Start Your Project
                <span className="text-lg">✨</span>
              </button>
              
              <button className="bg-bg-tertiary text-accent-primary border-2 border-accent-primary font-semibold px-8 py-4 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 flex items-center gap-3 group">
                <span className="text-lg">💬</span>
                Schedule a Call
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary mb-2">30 Days</div>
                <div className="text-text-secondary">Guaranteed Launch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-secondary mb-2">100%</div>
                <div className="text-text-secondary">Founder Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-tertiary mb-2">24/7</div>
                <div className="text-text-secondary">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
