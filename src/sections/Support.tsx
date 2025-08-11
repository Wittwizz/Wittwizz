import * as React from 'react';
import { Card } from '@/ui/Card';
import { Phone, MessageCircle, Calendar, FileText } from 'lucide-react';

const supportSteps = [
  {
    icon: Phone,
    title: 'Onboarding call',
    description: 'Align scope, assets, timeline'
  },
  {
    icon: MessageCircle,
    title: 'Dedicated PM',
    description: 'One contact on WhatsApp'
  },
  {
    icon: Calendar,
    title: 'Weekly updates',
    description: 'Demo + next steps'
  },
  {
    icon: FileText,
    title: 'Simple handover',
    description: 'Docs, access, how‑to videos'
  }
];

export default function Support() {
  return (
    <section id="support" aria-labelledby="sup-h" className="py-14 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 id="sup-h" className="text-2xl sm:text-3xl font-bold mb-8 text-center">How we support you</h2>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {supportSteps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="p-6 text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
