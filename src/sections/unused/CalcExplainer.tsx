import * as React from 'react';

export default function CalcExplainer() {
  return (
    <section id="calc-explainer" aria-labelledby="calc-h" className="py-14 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="calc-h" className="text-2xl sm:text-3xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Pick a preset for speed, or switch to Advanced to customize. Your link saves your choices—share it with your co‑founder.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Prices shown exclude GST. Discounts apply before GST.
          </p>
        </div>
      </div>
    </section>
  );
}
