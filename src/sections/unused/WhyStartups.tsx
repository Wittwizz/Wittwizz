import * as React from 'react';
import { Card } from '@/ui/Card';
import { Building2, Zap, Target, Users } from 'lucide-react';

const sectors = [
  { name: 'D2C', icon: Building2, description: 'E-commerce & direct-to-consumer brands' },
  { name: 'SaaS', icon: Zap, description: 'Software & subscription platforms' },
  { name: 'Fintech', icon: Target, description: 'Financial technology & payments' },
  { name: 'Healthtech', icon: Users, description: 'Healthcare & wellness technology' }
];

export default function WhyStartups() {
  return (
    <section id="why-startups" aria-labelledby="why-h" className="py-14">
      <div className="container mx-auto px-4">
        <h2 id="why-h" className="text-2xl sm:text-3xl font-bold mb-8 text-center">Built for Indian startups</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We've launched 40+ founder‑led brands—playbooks tuned to Indian buyers.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <Card key={sector.name} className="p-6 text-center hover:shadow-lg transition-shadow">
                <Icon className="h-12 w-12 text-primary mx-auto mb-3" aria-hidden />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{sector.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{sector.description}</p>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Each sector has unique challenges. We've solved them before.
          </p>
        </div>
      </div>
    </section>
  );
}
