import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/ui/Button';
import PersonaBadges from '@/sections/PersonaBadges';

export default function Hero(){
  return (
    <header className="relative overflow-hidden">
      <div className="container mx-auto px-4 pt-14 pb-18 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 radial-glow">
          <div>
            <span className="ribbon mb-4 inline-block text-[color:var(--brand-primary-alt)]">Launch Sprint · 30 Days</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Ship your <span className="gradient-text">next release</span> without drama
            </h1>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-200">Efficient, founder‑friendly builds with a premium finish—minus the overhead.</p>
            <div className="mt-5"><PersonaBadges /></div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button>
                Plan my 30‑day Launch Sprint
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost">See pricing</Button>
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
    </header>
  );
}
