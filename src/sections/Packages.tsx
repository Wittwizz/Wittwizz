import * as React from 'react';
import { Check, Zap, Rocket, TrendingUp, Star, ArrowRight, Target, Shield } from 'lucide-react';
import { StaggeredContainer, GradientBorderCard, AnimatedBackground } from '@/ui';

const packages = [
  {
    name: "Starter",
    tagline: "Launch in 3 weeks",
    price: "₹25,000",
    description: "Perfect for startups ready to make their mark with a professional online presence.",
    features: [
      "Brand starter kit (logo, palette, type)",
      "5-page website (Home, About, Services, Case, Contact)",
      "Basic SEO + analytics setup",
      "Mobile responsive design",
      "Contact form integration",
      "Basic performance optimization"
    ],
    timeline: "3 weeks",
    popular: false,
    color: "accent-primary",
    icon: Target
  },
  {
    name: "Sprint",
    tagline: "Launch in 30 days",
    price: "₹65,000",
    description: "Complete digital foundation with growth tools to accelerate your startup's success.",
    features: [
      "Everything in Starter",
      "Shopify store setup",
      "Content kit (15 reels + 5 carousels)",
      "Basic CRO optimization",
      "Social media strategy",
      "Email marketing setup",
      "Performance monitoring"
    ],
    timeline: "30 days",
    popular: true,
    color: "accent-secondary",
    icon: Rocket
  },
  {
    name: "Scale",
    tagline: "Grow & optimize",
    price: "₹95,000",
    description: "Full-scale digital transformation with ongoing optimization and growth support.",
    features: [
      "Everything in Sprint",
      "Advanced SEO optimization",
      "Analytics dashboard setup",
      "A/B testing framework",
      "Conversion optimization",
      "Growth consulting",
      "Ongoing support & maintenance"
    ],
    timeline: "45 days",
    popular: false,
    color: "accent-tertiary",
    icon: TrendingUp
  }
];

export default function Packages() {
  return (
    <AnimatedBackground className="py-20 bg-bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.3}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-bg-tertiary border border-accent-tertiary rounded-full mb-6">
              <Star className="w-4 h-4 text-accent-tertiary" />
              <span className="text-accent-tertiary text-sm font-medium">Pricing & Packages</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">
              <span className="text-text-primary">Choose Your</span>
              <br />
              <span className="text-accent-tertiary">Growth</span>
              <br />
              <span className="text-text-primary">Path</span>
            </h2>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Transparent pricing, clear deliverables, and guaranteed timelines. 
              Every package is designed to give your startup the competitive edge it needs.
            </p>
          </div>
        </StaggeredContainer>

        {/* Packages Grid */}
        <StaggeredContainer staggerDelay={0.2} initialDelay={0.5}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              const colorClasses = {
                'accent-primary': 'border-accent-primary text-accent-primary',
                'accent-secondary': 'border-accent-secondary text-accent-secondary',
                'accent-tertiary': 'border-accent-tertiary text-accent-tertiary'
              };
              
              return (
                <GradientBorderCard
                  key={index}
                  className={`group cursor-pointer h-full ${
                    pkg.popular ? 'ring-2 ring-accent-secondary ring-opacity-50' : ''
                  }`}
                  borderGradient={
                    pkg.popular 
                      ? "from-accent-secondary via-accent-primary to-accent-secondary"
                      : `from-${pkg.color} via-${pkg.color} to-${pkg.color}`
                  }
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-secondary to-accent-primary text-bg-primary px-6 py-2 rounded-full text-sm font-semibold z-20">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-bg-secondary border-2 ${colorClasses[pkg.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Package Info */}
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{pkg.name}</h3>
                  <p className="text-accent-primary font-semibold mb-1">{pkg.tagline}</p>
                  <p className="text-text-secondary text-sm mb-6">{pkg.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-black text-text-primary">{pkg.price}</span>
                    <span className="text-text-secondary text-sm ml-2">+ 18% GST</span>
                  </div>
                  
                  {/* Timeline */}
                  <div className="flex items-center gap-2 mb-6 text-sm text-text-secondary">
                    <Zap className="w-4 h-4 text-accent-primary" />
                    Timeline: {pkg.timeline}
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-accent-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-accent-secondary to-accent-primary text-bg-primary hover:scale-105'
                      : 'bg-bg-secondary text-accent-primary border-2 border-accent-primary hover:bg-accent-primary hover:text-bg-primary'
                  }`}>
                    Choose {pkg.name}
                  </button>
                </GradientBorderCard>
              );
            })}
          </div>
        </StaggeredContainer>

        {/* Bottom CTA */}
        <StaggeredContainer staggerDelay={0.1} initialDelay={1}>
          <div className="text-center">
            <p className="text-text-secondary mb-6">
              Need a custom solution? Let's discuss your specific requirements.
            </p>
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Shield className="w-5 h-5" />
              Get Custom Quote
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </StaggeredContainer>
      </div>
    </AnimatedBackground>
  );
}
