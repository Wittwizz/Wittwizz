import * as React from 'react';
import AppRouter from './components/AppRouter';
import SmoothBackground from './ui/SmoothBackground';

export default function App() {
  console.log('🚀 App component rendering - Smooth Background System');

  return (
    <SmoothBackground className="min-h-screen relative overflow-hidden">
      {/* Smooth Background System */}
      <main className="pt-20">
        <AppRouter />
      </main>
    </SmoothBackground>
  );
}
