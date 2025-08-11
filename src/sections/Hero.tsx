import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/ui/Button';
import PersonaBadges from '@/sections/PersonaBadges';

export default function Hero(){
  return (
    <section id="hero" aria-labelledby="hero-h" className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-14 pb-18 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 radial-glow">
          <div>
            <span className="ribbon mb-4 inline-block text-[color:var(--brand-primary-alt)]">Launch Sprint · 30 Days</span>
            <h1 id="hero-h" className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Launch fast. <span className="gradient-text">Grow smarter.</span>
            </h1>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-200">Founder‑friendly brand & web sprints with clear pricing, fixed timelines, and a dedicated project manager.</p>
            <div className="mt-5"><PersonaBadges /></div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#packages" data-gt="cta_see_packages">
                  See packages & pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#lead" data-gt="cta_growth_plan">Get your growth plan</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-blue-50 to-white p-2 dark:from-slate-900 dark:to-slate-800">
              <div className="h-full w-full rounded-xl border border-gray-100 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur grid place-items-center card">
                <div className="text-center p-6">
                  <p className="text-sm uppercase tracking-wide text-gray-500">Preview</p>
                  <h3 className="mt-2 font-semibold text-[color:var(--brand-primary-alt)]">Wittwizz LP v1</h3>
                  <p className="text-gray-700 dark:text-gray-200">Fast · Accessible · Clean</p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-8 h-20 bg-gradient-to-t from-white to-transparent dark:from-slate-950"/>
          </div>
        </div>
      </div>
      
      {/* Trust Strip */}
      <section id="trust" aria-label="Trust proof" className="border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-8">
          <ul className="trust-list flex flex-wrap justify-center items-center gap-8 text-center text-sm text-gray-600 dark:text-gray-300">
            <li><strong className="text-gray-900 dark:text-white">40+</strong> Indian founders served</li>
            <li><strong className="text-gray-900 dark:text-white">3‑week</strong> starter launch, guaranteed</li>
            <li><strong className="text-gray-900 dark:text-white">4.9/5</strong> founder satisfaction</li>
          </ul>
        </div>
      </section>
    </section>
  );
}
