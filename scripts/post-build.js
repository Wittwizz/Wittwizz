import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🔧 Running post-build script...');

try {
  // 1. Create SPA fallback (404.html)
  console.log('📄 Creating 404.html for SPA routing...');
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  
  // 2. Create pricing data directory and copy file
  console.log('📁 Setting up pricing data...');
  const pricingDir = 'dist/content/pricing';
  fs.mkdirSync(pricingDir, { recursive: true });
  fs.copyFileSync('content/pricing/services.json', path.join(pricingDir, 'services.json'));
  
  // 3. Verify the files were created
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
