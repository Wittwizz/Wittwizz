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
  
  // 3. Copy SEO files
  console.log('🔍 Setting up SEO files...');
  if (fs.existsSync('public/robots.txt')) {
    fs.copyFileSync('public/robots.txt', 'dist/robots.txt');
    console.log('✅ robots.txt copied successfully');
  }
  if (fs.existsSync('public/sitemap.xml')) {
    fs.copyFileSync('public/sitemap.xml', 'dist/sitemap.xml');
    console.log('✅ sitemap.xml copied successfully');
  }
  if (fs.existsSync('public/google5c08b7a4e81dc354.html')) {
    fs.copyFileSync('public/google5c08b7a4e81dc354.html', 'dist/google5c08b7a4e81dc354.html');
    console.log('✅ Google Search Console verification file copied successfully');
  }
  
  // 4. Verify the files were created
  console.log('✅ Verifying post-build files...');
  if (fs.existsSync('dist/404.html')) {
    console.log('✅ 404.html created successfully');
  }
  if (fs.existsSync(path.join(pricingDir, 'services.json'))) {
    console.log('✅ Pricing data copied successfully');
  }
  
  console.log('🎉 Post-build script completed successfully!');
} catch (error) {
  console.error('❌ Post-build script failed:', error);
  process.exit(1);
}
