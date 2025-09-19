import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/tokens.css'
import './styles/index.css'
import { initSEOPreloader } from './utils/seoPreloader'
import { initPerformanceMonitoring, preloadCriticalResources } from './utils/performanceMonitor'

// Initialize performance optimizations
initPerformanceMonitoring();
preloadCriticalResources();

// Initialize SEO optimizations
initSEOPreloader();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
