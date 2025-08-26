import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/tokens.css'
import './styles/index.css'
import { initSEOPreloader } from './utils/seoPreloader'

// Initialize SEO optimizations
initSEOPreloader();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
