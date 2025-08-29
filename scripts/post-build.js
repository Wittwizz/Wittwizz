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
  
  // 5. Setup GitHub Pages deployment with safe HTML handling
  console.log('🔄 Setting up GitHub Pages deployment...');
  
  // Read the clean dist HTML (not the corrupted root HTML)
  let htmlContent = fs.readFileSync('dist/index.html', 'utf8');
  console.log('✅ Reading clean dist HTML for GitHub Pages');
  
  // 6. Add critical resource preloads with comprehensive duplicate prevention
  console.log('⚡ Adding performance optimizations with health checks...');
  
  // Advanced duplicate detection - check for specific patterns
  const cssLinkPattern = /<link[^>]+rel="stylesheet"[^>]*>/g;
  const cssPreloadPattern = /<link[^>]+rel="preload"[^>]+as="style"[^>]*>/g;
  const jsPreloadPattern = /<link[^>]+rel="preload"[^>]+as="script"[^>]*>/g;
  
  const existingCSSLinks = htmlContent.match(cssLinkPattern) || [];
  const existingCSSPreloads = htmlContent.match(cssPreloadPattern) || [];
  const existingJSPreloads = htmlContent.match(jsPreloadPattern) || [];
  
  console.log(`🔍 Health Check - Found ${existingCSSLinks.length} CSS links, ${existingCSSPreloads.length} CSS preloads, ${existingJSPreloads.length} JS preloads`);
  
  // Find built asset filenames
  const cssMatch = htmlContent.match(/rel="stylesheet"[^>]+href="([^"]*\.css)"/);
  const jsMatches = htmlContent.match(/src="([^"]*\.js)"/g);
  
  let modificationsNeeded = false;
  
  // Only add CSS preload if none exist and we have exactly one CSS file
  // CRITICAL: Don't add preloads if CSS stylesheet already exists or if we have duplicates
  if (cssMatch && existingCSSPreloads.length === 0 && existingCSSLinks.length === 1) {
    const cssFile = cssMatch[1];
    const preloadCSS = `    <link rel="preload" href="${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${cssFile}"></noscript>\n`;
    htmlContent = htmlContent.replace('</head>', `${preloadCSS}</head>`);
    modificationsNeeded = true;
    console.log(`✅ Added CSS preload for ${cssFile}`);
  } else if (existingCSSLinks.length > 1) {
    console.log(`⚠️ Skipping CSS preload - ${existingCSSLinks.length} CSS links already exist (preventing duplicates)`);
  } else if (existingCSSPreloads.length > 0) {
    console.log(`⚠️ Skipping CSS preload - ${existingCSSPreloads.length} CSS preloads already exist`);
  }
  
  // Only add JS preloads if none exist and we have JS files
  if (jsMatches && existingJSPreloads.length === 0) {
    let preloadJS = '';
    jsMatches.forEach(match => {
      const jsFile = match.match(/src="([^"]*)"/)[1];
      preloadJS += `    <link rel="preload" href="${jsFile}" as="script">\n`;
    });
    htmlContent = htmlContent.replace('</head>', `${preloadJS}</head>`);
    modificationsNeeded = true;
    console.log(`✅ Added JS preloads for ${jsMatches.length} files`);
  }
  
  // Write the final HTML to root for GitHub Pages
  fs.writeFileSync('index.html', htmlContent);
  
  if (modificationsNeeded) {
    console.log('✅ Performance preloads added with health validation');
  } else {
    console.log('✅ Clean HTML copied to root - no preload modifications needed');
  }
  
  // Final health check
  const finalContent = fs.readFileSync('index.html', 'utf8');
  const finalCSSLinks = finalContent.match(cssLinkPattern) || [];
  const finalCSSPreloads = finalContent.match(cssPreloadPattern) || [];
  
  if (finalCSSLinks.length > 1 || finalCSSPreloads.length > 1) {
    console.warn('⚠️ WARNING: Potential duplicate CSS detected!');
    console.log(`Final state: ${finalCSSLinks.length} CSS links, ${finalCSSPreloads.length} CSS preloads`);
  } else {
    console.log('🎯 HTML Health Check PASSED - No duplicates detected');
  }
  
  console.log('🎉 Post-build script completed successfully!');
} catch (error) {
  console.error('❌ Post-build script failed:', error);
  process.exit(1);
}
