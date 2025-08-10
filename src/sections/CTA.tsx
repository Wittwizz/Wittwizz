import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/ui/Button';

export default function CTA(){
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl p-8 sm:p-10 border border-blue-100 dark:border-white/10 bg-[radial-gradient(60%_100%_at_0%_0%,#2563EB22,transparent)]">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to launch in 30 days?</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-200">Book a quick call—get a scoped plan, milestones, and fixed price.</p>
          <div className="mt-6">
            <Button>
              Plan my 30‑day Launch Sprint
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
