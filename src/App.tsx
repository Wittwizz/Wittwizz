import * as React from 'react';
import AppRouter from './components/AppRouter';
import SmoothBackground from './ui/SmoothBackground';
import Navigation from './ui/Navigation';

export default function App() {
  console.log('🚀 App component rendering - Smooth Background System');

  return (
    <SmoothBackground className="min-h-screen relative overflow-hidden">
      {/* Smooth Background System */}
      <Navigation />
      <main className="pt-20">
        <AppRouter />
      </main>
    </SmoothBackground>
  );
}
