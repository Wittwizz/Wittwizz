import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🔧 Running post-build script...');

try {
  // 1. Create SPA fallback (404.html)
  console.log('📄 Setting up 404.html for SPA routing...');
  if (fs.existsSync('public/404.html')) {
    fs.copyFileSync('public/404.html', 'dist/404.html');
    console.log('✅ Custom 404.html copied successfully');
  } else {
    fs.copyFileSync('dist/index.html', 'dist/404.html');
    console.log('✅ Fallback 404.html created from index.html');
  }
  
  // 2. Create pricing data directory and copy file
  console.log('📁 Setting up pricing data...');
  const pricingDir = 'dist/content/pricing';
  fs.mkdirSync(pricingDir, { recursive: true });
  fs.copyFileSync('content/pricing/services.json', path.join(pricingDir, 'services.json'));
  
  // 3. Verify SEO files (Vite automatically copies public files)
  console.log('🔍 Verifying SEO files...');
  if (fs.existsSync('dist/robots.txt')) {
    console.log('✅ robots.txt found in dist');
  }
  if (fs.existsSync('dist/sitemap.xml')) {
    console.log('✅ sitemap.xml found in dist');
  }
  if (fs.existsSync('dist/google5c08b7a4e81dc354.html')) {
    console.log('✅ Google Search Console verification file found in dist');
  } else {
    console.log('⚠️ Google verification file not found, copying manually...');
    if (fs.existsSync('public/google5c08b7a4e81dc354.html')) {
      fs.copyFileSync('public/google5c08b7a4e81dc354.html', 'dist/google5c08b7a4e81dc354.html');
      console.log('✅ Google verification file copied manually');
    }
  }
  
  // 4. Verify the files were created
  console.log('✅ Verifying post-build files...');
  if (fs.existsSync('dist/404.html')) {
    console.log('✅ 404.html created successfully');
  }
  if (fs.existsSync(path.join(pricingDir, 'services.json'))) {
    console.log('✅ Pricing data copied successfully');
  }
  
  // 5. Replace root index.html with built version for GitHub Pages
  console.log('🔄 Setting up GitHub Pages deployment...');
  fs.copyFileSync('dist/index.html', 'index.html');
  console.log('✅ Root index.html replaced with production build');
  
  // 6. Add critical resource preloads to the built HTML (avoiding duplicates)
  console.log('⚡ Adding performance optimizations...');
  let htmlContent = fs.readFileSync('index.html', 'utf8');
  
  // Check if preloads already exist to avoid duplicates
  const hasPreloadCSS = htmlContent.includes('rel="preload"') && htmlContent.includes('as="style"');
  const hasPreloadJS = htmlContent.includes('rel="preload"') && htmlContent.includes('as="script"');
  
  if (!hasPreloadCSS || !hasPreloadJS) {
    // Find built asset filenames
    const cssMatch = htmlContent.match(/href="([^"]*\.css)"/);
    const jsMatches = htmlContent.match(/src="([^"]*\.js)"/g);
    
    // Only add CSS preload if it doesn't exist
    if (cssMatch && !hasPreloadCSS) {
      const cssFile = cssMatch[1];
      const preloadCSS = `    <link rel="preload" href="${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${cssFile}"></noscript>\n`;
      htmlContent = htmlContent.replace('</head>', `${preloadCSS}</head>`);
    }
    
    // Only add JS preloads if they don't exist
    if (jsMatches && !hasPreloadJS) {
      let preloadJS = '';
      jsMatches.forEach(match => {
        const jsFile = match.match(/src="([^"]*)"/)[1];
        preloadJS += `    <link rel="preload" href="${jsFile}" as="script">\n`;
      });
      htmlContent = htmlContent.replace('</head>', `${preloadJS}</head>`);
    }
    
    fs.writeFileSync('index.html', htmlContent);
    console.log('✅ Performance preloads added (no duplicates)');
  } else {
    console.log('✅ Performance preloads already exist, skipping to avoid duplicates');
  }
  
  console.log('🎉 Post-build script completed successfully!');
} catch (error) {
  console.error('❌ Post-build script failed:', error);
  process.exit(1);
}
