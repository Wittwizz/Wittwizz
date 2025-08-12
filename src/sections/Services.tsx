import * as React from 'react';
import { Palette, Globe, TrendingUp, Users, Zap, Shield, Target, Rocket } from 'lucide-react';
import { StaggeredContainer, GradientBorderCard, AnimatedBackground } from '@/ui';

const services = [
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete brand foundation with logo, color palette, typography, and brand guidelines.",
    features: ["Logo design", "Color palette", "Typography system", "Brand guidelines", "Visual identity"],
    color: "accent-primary",
    delay: "0s"
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies and best practices.",
    features: ["Responsive design", "Performance optimized", "SEO ready", "Analytics integration", "CMS setup"],
    color: "accent-secondary",
    delay: "0.1s"
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Data-driven growth strategies to scale your startup and acquire customers.",
    features: ["CRO optimization", "Content strategy", "Social media", "Email marketing", "Performance tracking"],
    color: "accent-tertiary",
    delay: "0.2s"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We analyze your market, competitors, and goals to create a winning strategy.",
    icon: Target,
    color: "accent-primary"
  },
  {
    step: "02",
    title: "Design & Development",
    description: "Our team builds your brand and website with precision and speed.",
    icon: Rocket,
    color: "accent-secondary"
  },
  {
    step: "03",
    title: "Launch & Optimize",
    description: "We launch your project and continuously optimize for better results.",
    icon: TrendingUp,
    color: "accent-tertiary"
  }
];

export default function Services() {
  return (
    <AnimatedBackground className="py-20 bg-bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.3}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-tertiary border border-accent-secondary rounded-full mb-6">
              <Zap className="w-4 h-4 text-accent-secondary" />
              <span className="text-accent-secondary text-sm font-medium">Our Services</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">
              <span className="text-text-primary">Complete</span>
              <br />
              <span className="text-accent-secondary">Digital</span>
              <br />
              <span className="text-text-primary">Solutions</span>
            </h2>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              From brand identity to web development to growth marketing - we provide everything 
              your startup needs to succeed in the digital world.
            </p>
          </div>
        </StaggeredContainer>

        {/* Services Grid */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.5}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const colorClasses = {
                'accent-primary': 'border-accent-primary text-accent-primary',
                'accent-secondary': 'border-accent-secondary text-accent-secondary',
                'accent-tertiary': 'border-accent-tertiary text-accent-tertiary'
              };
              
              return (
                <GradientBorderCard
                  key={index}
                  className="group cursor-pointer h-full"
                  borderGradient={`from-${service.color} via-${service.color} to-${service.color}`}
                >
                  {/* Icon Container */}
                  <div className={`w-20 h-20 bg-bg-secondary border-2 ${colorClasses[service.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                        <div className={`w-2 h-2 bg-${service.color} rounded-full`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GradientBorderCard>
              );
            })}
          </div>
        </StaggeredContainer>

        {/* Process Section */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.8}>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-text-primary mb-12">
              Our <span className="text-accent-primary">3-Step</span> Process
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                const colorClasses = {
                  'accent-primary': 'border-accent-primary text-accent-primary',
                  'accent-secondary': 'border-accent-secondary text-accent-secondary',
                  'accent-tertiary': 'border-accent-tertiary text-accent-tertiary'
                };
                
                return (
                  <div key={index} className="relative">
                    {/* Step Number */}
                    <div className={`w-16 h-16 bg-bg-tertiary border-2 ${colorClasses[step.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold`}>
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-bg-secondary border-2 ${colorClasses[step.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-xl font-bold text-text-primary mb-3">
                      {step.title}
                    </h4>
                    
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Connecting Line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary transform translate-x-1/2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </StaggeredContainer>

        {/* CTA Section */}
        <StaggeredContainer staggerDelay={0.1} initialDelay={1.2}>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Shield className="w-5 h-5" />
              Start Your Project
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </StaggeredContainer>
      </div>
    </AnimatedBackground>
  );
}
