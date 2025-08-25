import * as React from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { TypewriterEffect } from '@/ui';

export default function Hero() {
  return (
    <div className="min-h-screen text-text-primary flex items-center justify-center relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">


        {/* Main Headline with Typewriter Effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
          <span className="text-text-primary">Launch</span>
          <br />
          <div className="inline-block">
            <TypewriterEffect
              words={[
                "Futuristic",
                "Innovative", 
                "Digital",
                "Amazing",
                "Revolutionary",
                "Breakthrough",
                "Game-Changing",
                "Cutting-Edge",
                "Next-Gen",
                "Transformative",
                "Disruptive",
                "Visionary",
                "Pioneering",
                "Groundbreaking",
                "Exceptional"
              ]}
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
          <div className="bg-bg-tertiary/80 backdrop-blur-md border border-accent-primary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-bg-secondary border border-accent-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-accent-primary" />
            </div>
            <div className="text-accent-primary font-semibold text-lg mb-1">Budget‑Smart</div>
            <div className="text-text-muted text-sm">Cost-effective solutions</div>
          </div>
          
          <div className="bg-bg-tertiary/80 backdrop-blur-md border border-accent-secondary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-bg-secondary border border-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-accent-secondary" />
            </div>
            <div className="text-accent-secondary font-semibold text-lg mb-1">Launch Fast</div>
            <div className="text-text-muted text-sm">30-day sprints guaranteed</div>
          </div>
          
          <div className="bg-bg-tertiary/80 backdrop-blur-md border border-accent-tertiary rounded-2xl px-6 py-4 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300">
            <div className="w-12 h-12 bg-bg-secondary border border-accent-tertiary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-accent-tertiary" />
            </div>
            <div className="text-accent-tertiary font-semibold text-lg mb-1">Design‑Clean</div>
            <div className="text-text-muted text-sm">Modern aesthetics</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button 
            onClick={() => {
              const packagesSection = document.querySelector('[data-section="packages"]');
              if (packagesSection) {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 flex items-center gap-3 group cursor-pointer"
          >
            <Target className="w-5 h-5" />
            See packages & pricing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={() => {
              const subject = encodeURIComponent("🚀 Need Your Growth Plan - Wittwiz Digital");
              const body = encodeURIComponent(`Hi Wittwiz Team! 👋

I'm looking for a comprehensive growth plan for my startup. Here's my vision:

🎯 **My Startup Vision:**
[Tell us about your amazing idea and what you want to achieve]

💡 **What I'm Looking For:**
- Growth strategy and roadmap
- Market positioning and competitive analysis
- Customer acquisition strategy
- Revenue optimization
- Scaling plan for the next 6-12 months

💰 **Current Stage:** [Early stage, MVP, Post-MVP, etc.]
⏰ **Timeline:** [When you want to start implementing]
📱 **Best Contact:** [Your preferred contact method]

I'm excited to work with Wittwiz to create a growth plan that will take my startup to the next level!

Best regards,
[Your Name]
[Your Contact Number]`);

              const mailtoLink = `mailto:wittwizdigitals@gmail.com?subject=${subject}&body=${body}`;
              window.open(mailtoLink, '_blank');
            }}
            className="bg-bg-tertiary/80 backdrop-blur-md text-accent-primary border-2 border-accent-primary font-semibold px-8 py-4 rounded-lg hover:bg-accent-primary hover:text-bg-primary transition-all duration-300 flex items-center gap-3 group cursor-pointer"
          >
            <Zap className="w-5 h-5" />
            Get your growth plan
          </button>
        </div>

        {/* Trust Indicators - Redesigned for Better Integration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="relative">
              {/* Modern Card Design */}
              <div className="bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 backdrop-blur-md border border-accent-primary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-primary/60 transition-all duration-500">
                <div className="text-4xl font-black text-accent-primary mb-2">40+</div>
                <div className="text-text-secondary text-sm font-medium">Indian founders served</div>
              </div>
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative">
              {/* Modern Card Design */}
              <div className="bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/5 backdrop-blur-md border border-accent-secondary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-secondary/60 transition-all duration-500">
                <div className="text-4xl font-black text-accent-secondary mb-2">30</div>
                <div className="text-text-secondary text-sm font-medium">Days guaranteed launch</div>
              </div>
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative">
              {/* Modern Card Design */}
              <div className="bg-gradient-to-br from-accent-tertiary/20 to-accent-tertiary/5 backdrop-blur-md border border-accent-tertiary/30 rounded-xl p-6 transform group-hover:scale-105 group-hover:border-accent-tertiary/60 transition-all duration-500">
                <div className="text-4xl font-black text-accent-tertiary mb-2">4.9</div>
                <div className="text-text-secondary text-sm font-medium">Founder satisfaction</div>
              </div>
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-tertiary/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
