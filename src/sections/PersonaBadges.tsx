import * as React from "react";
import { Target, Rocket, Sparkles } from "lucide-react";

export default function PersonaBadges() {
  const items = [
    {
      icon: Target,
      label: "Budget‑Smart",
      color: "accent-primary",
      description: "Cost-effective solutions"
    },
    {
      icon: Rocket,
      label: "Launch Fast",
      color: "accent-secondary",
      description: "30-day sprints guaranteed"
    },
    {
      icon: Sparkles,
      label: "Design‑Clean",
      color: "accent-tertiary",
      description: "Modern aesthetics"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map(({ icon: Icon, label, color, description }, index) => (
        <div
          key={label}
          className={`group relative bg-bg-tertiary border rounded-2xl px-6 py-4 text-center transition-all duration-500 ease-futuristic hover:scale-105 hover:-translate-y-2 animate-fade-in-up ${
            color === 'accent-primary' ? 'border-accent-primary' : 
            color === 'accent-secondary' ? 'border-accent-secondary' : 
            'border-accent-tertiary'
          }`}
          style={{ animationDelay: `${index * 200}ms` }}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl ${
            color === 'accent-primary' ? 'bg-accent-primary' : 
            color === 'accent-secondary' ? 'bg-accent-secondary' : 
            'bg-accent-tertiary'
          }`} />
          
          {/* Icon */}
          <div className="relative z-10 mb-3 flex justify-center">
            <div className={`w-12 h-12 bg-bg-secondary border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
              color === 'accent-primary' ? 'border-accent-primary' : 
              color === 'accent-secondary' ? 'border-accent-secondary' : 
              'border-accent-tertiary'
            }`}>
              <Icon className={`w-6 h-6 ${
                color === 'accent-primary' ? 'text-accent-primary' : 
                color === 'accent-secondary' ? 'text-accent-secondary' : 
                'text-accent-tertiary'
              }`} aria-hidden />
            </div>
          </div>
          
          {/* Label */}
          <div className={`relative z-10 font-semibold text-lg mb-1 ${
            color === 'accent-primary' ? 'text-accent-primary' : 
            color === 'accent-secondary' ? 'text-accent-secondary' : 
            'text-accent-tertiary'
          }`}>
            {label}
          </div>
          
          {/* Description */}
          <div className="relative z-10 text-text-muted text-sm">
            {description}
          </div>
          
          {/* Hover border effect */}
          <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
            color === 'accent-primary' ? 'border-accent-primary' : 
            color === 'accent-secondary' ? 'border-accent-secondary' : 
            'border-accent-tertiary'
          }`} />
        </div>
      ))}
    </div>
  );
}
