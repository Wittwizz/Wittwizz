import * as React from 'react';
import { Zap, Target, Rocket, Shield, TrendingUp, Users, Globe, Code, ArrowRight } from 'lucide-react';
import { StaggeredContainer, GradientBorderCard } from '@/ui';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "30-day sprints guaranteed. From concept to launch in record time.",
    color: "accent-primary",
    delay: "0s"
  },
  {
    icon: Target,
    title: "Precision Focused",
    description: "AI-powered insights ensure every element drives growth and conversion.",
    color: "accent-secondary",
    delay: "0.1s"
  },
  {
    icon: Rocket,
    title: "Launch Ready",
    description: "Complete brand, web, and growth stack ready for immediate deployment.",
    color: "accent-tertiary",
    delay: "0.2s"
  },
  {
    icon: Shield,
    title: "Founder Friendly",
    description: "Transparent pricing, clear deliverables, and ongoing support.",
    color: "accent-primary",
    delay: "0.3s"
  },
  {
    icon: TrendingUp,
    title: "Growth Optimized",
    description: "Built-in CRO, analytics, and growth frameworks from day one.",
    color: "accent-secondary",
    delay: "0.4s"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Access to our network of founders, investors, and growth experts.",
    color: "accent-tertiary",
    delay: "0.5s"
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "World-class design and development practices for Indian startups.",
    color: "accent-primary",
    delay: "0.6s"
  },
  {
    icon: Code,
    title: "Future Proof",
    description: "Built with the latest technologies and scalable architecture.",
    color: "accent-secondary",
    delay: "0.7s"
  }
];

export default function Features() {
  return (
    <section className="py-20 relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.3}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-tertiary/80 backdrop-blur-md border border-accent-primary rounded-full mb-6">
              <Zap className="w-4 h-4 text-accent-primary" />
              <span className="text-accent-primary text-sm font-medium">Why Choose Wittwiz</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">
              <span className="text-text-primary">Built for</span>
              <br />
              <span className="text-accent-primary">Tomorrow's</span>
              <br />
              <span className="text-text-primary">Founders</span>
            </h2>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Every feature, every pixel, every line of code is designed to give Indian startups 
              the competitive edge they need in today's fast-paced digital landscape.
            </p>
          </div>
        </StaggeredContainer>

        {/* Features Grid */}
        <StaggeredContainer staggerDelay={0.1} initialDelay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClasses = {
                'accent-primary': 'border-accent-primary text-accent-primary',
                'accent-secondary': 'border-accent-secondary text-accent-secondary',
                'accent-tertiary': 'border-accent-tertiary text-accent-tertiary'
              };
              
              return (
                <GradientBorderCard
                  key={index}
                  className="group cursor-pointer"
                  borderGradient={`from-${feature.color} to-${feature.color}`}
                >
                  {/* Icon Container */}
                  <div className={`w-16 h-16 bg-bg-secondary border-2 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GradientBorderCard>
              );
            })}
          </div>
        </StaggeredContainer>

        {/* Bottom CTA */}
        <StaggeredContainer staggerDelay={0.1} initialDelay={1}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Rocket className="w-5 h-5" />
              Explore Our Process
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </StaggeredContainer>
      </div>
    </section>
  );
}
