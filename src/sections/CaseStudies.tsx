import * as React from 'react';
import { Card } from '@/ui/Card';
import { TrendingUp, Target, Users } from 'lucide-react';

const cases = [
  {
    id: 'd2c-skincare',
    title: 'D2C skincare — launch to 3× leads',
    context: 'New brand, zero site traffic.',
    plan: '3‑week brand+site sprint, SEO basics, landing page testing.',
    outcome: '3× leads in 60 days, CAC −22%.',
    testimonial: '"We shipped without chaos. Crystal‑clear scope, weekly updates." — Founder',
    icon: TrendingUp
  },
  {
    id: 'saas-platform',
    title: 'SaaS platform — 40% conversion lift',
    context: 'Complex product, confusing user journey.',
    plan: 'Landing page redesign, CRO optimization, A/B testing.',
    outcome: '40% conversion improvement, 2× trial signups.',
    testimonial: '"Clear process, measurable results. Exactly what we needed." — CEO',
    icon: Target
  },
  {
    id: 'fintech-startup',
    title: 'Fintech startup — regulatory compliance',
    context: 'New regulations, outdated website.',
    plan: 'Compliance-focused redesign, security audit, legal page updates.',
    outcome: '100% compliance, 15% trust score increase.',
    testimonial: '"They understood our compliance needs perfectly." — CTO',
    icon: Users
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="cs-h" className="py-14">
      <div className="container mx-auto px-4">
        <h2 id="cs-h" className="text-2xl sm:text-3xl font-bold mb-8 text-center">Founder results</h2>
        
        <div className="grid gap-8 max-w-4xl mx-auto">
          {cases.map((caseStudy) => {
            const Icon = caseStudy.icon;
            return (
              <Card key={caseStudy.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Icon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {caseStudy.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p><strong>Problem:</strong> {caseStudy.context}</p>
                      <p><strong>Plan:</strong> {caseStudy.plan}</p>
                      <p><strong>Outcome:</strong> {caseStudy.outcome}</p>
                    </div>
                    <blockquote className="testimonial mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg italic text-gray-700 dark:text-gray-200">
                      {caseStudy.testimonial}
                    </blockquote>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
