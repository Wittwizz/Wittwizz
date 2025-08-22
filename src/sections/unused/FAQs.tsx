import * as React from 'react';
import { Card } from '@/ui/Card';

const faqs = [
  {
    question: 'What do I get in the Starter package?',
    answer: 'Brand starter kit, a 5‑page website, analytics setup, and a dedicated PM. Full scope in the downloadable PDF.'
  },
  {
    question: 'How fast can we launch?',
    answer: 'Most Starter sites go live in 3 weeks, with weekly demos and clear milestones.'
  },
  {
    question: 'How are prices calculated?',
    answer: 'We apply any discounts first, then add 18% GST. The calculator shows this breakdown.'
  },
  {
    question: 'What if we need changes during the project?',
    answer: 'Fixed scope means fixed price. Any changes are pre-approved and quoted separately to avoid surprises.'
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes, we offer 30 days of post-launch support and can discuss ongoing maintenance packages.'
  },
  {
    question: 'Can I see examples of your previous work?',
    answer: 'Absolutely! Check our case studies above, and we can share more examples during our onboarding call.'
  }
];

export default function FAQs() {
  return (
    <section id="faqs" aria-labelledby="faq-h" className="py-14">
      <div className="container mx-auto px-4">
        <h2 id="faq-h" className="text-2xl sm:text-3xl font-bold mb-8 text-center">FAQs (plain English)</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-0">
                <details className="group">
                  <summary className="cursor-pointer p-6 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    {faq.question}
                    <span className="ml-2 text-primary group-open:hidden">+</span>
                    <span className="ml-2 text-primary hidden group-open:inline">−</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
