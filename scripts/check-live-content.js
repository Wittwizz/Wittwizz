#!/usr/bin/env node

import https from 'https';

console.log('🔍 Checking live site content...\n');

function checkLiveContent() {
  return new Promise((resolve) => {
    const req = https.request('https://wittwizz.github.io/Wittwizz/', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode} ${res.statusMessage}`);
        console.log(`📏 Content Length: ${data.length} characters`);
        console.log(`📄 Content Type: ${res.headers['content-type']}`);
        console.log('\n📋 First 1000 characters:');
        console.log('─'.repeat(50));
        console.log(data.substring(0, 1000));
        console.log('─'.repeat(50));
        
        // Check for common issues
        if (data.includes('<div id="root"></div>') && !data.includes('script')) {
          console.log('\n❌ ISSUE FOUND: HTML has root div but no JavaScript!');
        } else if (data.includes('script')) {
          console.log('\n✅ JavaScript found in HTML');
        }
        
        if (data.length < 1000) {
          console.log('\n⚠️  WARNING: Content seems too short');
        }
        
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

checkLiveContent().catch(console.error);
