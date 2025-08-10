import * as React from 'react';
import { Gauge, Accessibility, ShieldCheck } from 'lucide-react';
import { Card } from '@/ui/Card';

const items = [
  {icon: Gauge, title:'Performance-first', desc:'LCP ≤ 2.5s, CLS < 0.1 by default.'},
  {icon: Accessibility, title:'Accessible by design', desc:'WCAG 2.1 AA with real keyboard paths.'},
  {icon: ShieldCheck, title:'Reliable delivery', desc:'Pinned deps, PR gates, clean handoffs.'}
];

export default function Features(){
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why teams pick Wittwizz</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({icon:Icon,title,desc})=> (
            <Card key={title} className="p-6">
              <Icon className="h-6 w-6 text-blue-600" aria-hidden />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
