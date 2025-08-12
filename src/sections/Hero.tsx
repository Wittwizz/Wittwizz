import * as React from 'react';
import { ArrowRight, Sparkles, Zap, Target, ChevronDown } from 'lucide-react';
import { AnimatedBackground, TypewriterEffect, StaggeredContainer } from '@/ui';

export default function Hero() {
  return (
    <AnimatedBackground className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden flex items-center justify-center">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.5}>
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-bg-tertiary border border-accent-primary rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-accent-primary animate-pulse" />
            <span className="text-accent-primary font-medium">Launch Sprint · 30 Days</span>
            <Zap className="w-5 h-5 text-accent-secondary" />
          </div>

          {/* Main Headline with Typewriter Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
            <span className="text-text-primary">Launch</span>
            <br />
            <div className="inline-block">
              <TypewriterEffect 
                words={["Futuristic", "Innovative", "Digital", "Amazing"]}
                className="text-accent-primary"
              />
            </div>
            <br />
            <span className="text-text-primary">Growth</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            AI-powered brand, web, and growth sprints for India's startups. 
            <br className="hidden md:block" />
            <span className="text-accent-primary font-semibold">Build more. Spend less. Grow faster.</span>
          </p>

          {/* Persona Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-bg-tertiary border border-accent-primary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-bg-secondary border border-accent-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-accent-primary" />
              </div>
              <div className="text-accent-primary font-semibold text-lg mb-1">Budget‑Smart</div>
              <div className="text-text-muted text-sm">Cost-effective solutions</div>
            </div>
            
            <div className="bg-bg-tertiary border border-accent-secondary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-bg-secondary border border-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-accent-secondary" />
              </div>
              <div className="text-accent-secondary font-semibold text-lg mb-1">Launch Fast</div>
              <div className="text-text-muted text-sm">30-day sprints guaranteed</div>
            </div>
            
            <div className="bg-bg-tertiary border border-accent-tertiary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-bg-secondary border border-accent-tertiary rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-accent-tertiary" />
              </div>
              <div className="text-accent-tertiary font-semibold text-lg mb-1">Design‑Clean</div>
              <div className="text-text-muted text-sm">Modern aesthetics</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 flex items-center gap-3 group">
              <Target className="w-5 h-5" />
              See packages & pricing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="bg-bg-tertiary text-accent-primary border-2 border-accent-primary font-semibold px-8 py-4 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 flex items-center gap-3 group">
              <Zap className="w-5 h-5" />
              Get your growth plan
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-bg-tertiary border border-accent-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-accent-primary">40+</span>
              </div>
              <p className="text-text-secondary text-sm">Indian founders served</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-bg-tertiary border border-accent-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-accent-secondary">3w</span>
              </div>
              <p className="text-text-secondary text-sm">Starter launch, guaranteed</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-bg-tertiary border border-accent-tertiary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-accent-tertiary">4.9</span>
              </div>
              <p className="text-text-secondary text-sm">Founder satisfaction</p>
            </div>
          </div>
        </StaggeredContainer>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-bg-primary to-transparent" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </AnimatedBackground>
  );
}
