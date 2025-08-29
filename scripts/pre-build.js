#!/usr/bin/env node

/**
 * Pre-Build Script - Ensures Clean HTML Template
 * Prevents Vite/Rollup build failures from corrupted HTML
 */

import fs from 'fs';

console.log('🧹 Running pre-build cleanup...');

try {
  // 1. Always restore clean HTML template before build
  if (fs.existsSync('index.template.html')) {
    console.log('📋 Restoring clean HTML template...');
    fs.copyFileSync('index.template.html', 'index.html');
    console.log('✅ Clean index.html restored from template');
  } else {
    console.error('❌ index.template.html not found!');
    process.exit(1);
  }

  // 2. Verify the HTML is clean (no production assets)
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  
  const hasProductionAssets = htmlContent.includes('crossorigin src="/Wittwizz/assets/') || 
                             htmlContent.includes('modulepreload') ||
                             htmlContent.includes('rel="stylesheet" crossorigin href="/Wittwizz/assets/');
  
  if (hasProductionAssets) {
    console.error('❌ HTML still contains production assets after cleanup!');
    process.exit(1);
  }

  const hasDevScript = htmlContent.includes('src="/src/main.tsx"');
  if (!hasDevScript) {
    console.error('❌ HTML missing development script reference!');
    process.exit(1);
  }

  console.log('✅ HTML template validation passed');
  console.log('🎯 Ready for clean Vite build');

} catch (error) {
  console.error('❌ Pre-build script failed:', error);
  process.exit(1);
}
