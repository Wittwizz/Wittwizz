#!/usr/bin/env node

import https from 'https';

console.log('🔍 Checking asset references in live HTML...\n');

function checkAssetReferences() {
  return new Promise((resolve) => {
    const req = https.request('https://wittwizz.github.io/Wittwizz/', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);
        console.log(`📏 Content Length: ${data.length} characters\n`);
        
        // Extract asset references
        const scriptMatches = data.match(/src="([^"]*\.js)"/g);
        const linkMatches = data.match(/href="([^"]*\.(css|js))"/g);
        
        console.log('📄 Script references:');
        if (scriptMatches) {
          scriptMatches.forEach(match => console.log(`  ${match}`));
        } else {
          console.log('  No script references found');
        }
        
        console.log('\n🔗 Link references:');
        if (linkMatches) {
          linkMatches.forEach(match => console.log(`  ${match}`));
        } else {
          console.log('  No link references found');
        }
        
        // Check for specific asset files
        const assetsToCheck = [
          'index-ByO7DOVH.js',
          'style-CitlIc88.css',
          'vendor-nf7bT_Uh.js',
          'icons-DtFhqyrz.js'
        ];
        
        console.log('\n🔍 Checking specific assets:');
        assetsToCheck.forEach(asset => {
          if (data.includes(asset)) {
            console.log(`  ✅ ${asset} - Referenced in HTML`);
          } else {
            console.log(`  ❌ ${asset} - NOT found in HTML`);
          }
        });
        
        resolve({ status: res.statusCode, content: data });
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Error: ${err.message}`);
      resolve({ error: err.message });
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Timeout');
      req.destroy();
      resolve({ error: 'timeout' });
    });
    
    req.end();
  });
}

checkAssetReferences().catch(console.error);
