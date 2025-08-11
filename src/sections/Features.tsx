import * as React from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';

const packages = [
  {
    id: 'starter',
    title: 'Starter',
    outcome: 'Your polished launch site, live in 3 weeks.',
    includes: [
      'Brand starter kit (logo, palette, type)',
      '5‑page website (Home, About, Services, Case, Contact)',
      'Basic SEO + analytics setup'
    ],
    timeline: '3 weeks',
    price: '₹25,000',
    cta: 'Choose Starter',
    dataGt: 'cta_choose_starter'
  },
  {
    id: 'sprint',
    title: 'Sprint',
    outcome: 'Launch in 30 days with growth tools.',
    includes: [
      'Everything in Starter',
      'Shopify store setup',
      'Content kit (15 reels + 5 carousels)',
      'Basic CRO optimization'
    ],
    timeline: '30 days',
    price: '₹65,000',
    cta: 'Choose Sprint',
    dataGt: 'cta_choose_sprint'
  },
  {
    id: 'scale',
    title: 'Scale',
    outcome: 'Grow & optimize with data-driven insights.',
    includes: [
      'Everything in Sprint',
      'SEO optimization',
      'Analytics dashboard setup',
      'Performance monitoring'
    ],
    timeline: '45 days',
    price: '₹95,000',
    cta: 'Choose Scale',
    dataGt: 'cta_choose_scale'
  }
];

export default function Features(){
  return (
    <section id="packages" aria-labelledby="pack-h" className="py-14">
      <div className="container mx-auto px-4">
        <h2 id="pack-h" className="text-2xl sm:text-3xl font-bold mb-6 text-center">Packages & pricing</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="p-6 relative" data-tier={pkg.id}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.outcome}</p>
              <ul className="includes space-y-2 mb-6">
                {pkg.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="timeline text-sm text-gray-500 dark:text-gray-400 mb-2">Timeline: {pkg.timeline}</p>
              <p className="price text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {pkg.price} <span className="tax text-sm font-normal text-gray-500">+ 18% GST</span>
              </p>
              <Button asChild className="w-full">
                <a href="#lead" data-gt={pkg.dataGt}>{pkg.cta}</a>
              </Button>
              <details className="scope mt-4 text-sm">
                <summary className="cursor-pointer text-primary hover:text-primary/80">See full scope</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Download detailed scope PDF for complete specifications.</p>
              </details>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
