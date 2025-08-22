import * as React from 'react';
import { Card } from '@/ui/Card';
import { Clock, Shield, Users } from 'lucide-react';

export default function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="g-h" className="py-14 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 id="g-h" className="text-2xl sm:text-3xl font-bold mb-8 text-center">Our guarantees</h2>
        
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Guarantees */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What we promise</h3>
            <ul className="guarantees space-y-4">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 dark:text-white">On‑time delivery:</strong> 
                  <span className="text-gray-600 dark:text-gray-300"> If we miss a milestone by our fault, we credit your sprint fee.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 dark:text-white">No surprises:</strong> 
                  <span className="text-gray-600 dark:text-gray-300"> Fixed scope, fixed price. Any extras are pre‑approved.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 dark:text-white">Founder care:</strong> 
                  <span className="text-gray-600 dark:text-gray-300"> Dedicated PM, weekly check‑ins, WhatsApp support.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Timeline Visual */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Typical 3‑week sprint timeline</h3>
            <div className="timeline-visual" aria-label="Typical 3‑week sprint timeline">
              <ol className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Week 1</strong> — Kickoff, brand essentials
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Week 2</strong> — Pages & content
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Week 3</strong> — QA, launch, handover
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
