#!/usr/bin/env node

import https from 'https';
import { execSync } from 'child_process';

console.log('🔍 Checking deployment status...\n');

// Check if we can reach the site
function checkSiteStatus() {
  return new Promise((resolve) => {
    const req = https.request('https://wittwizz.github.io/Wittwizz/', { method: 'HEAD' }, (res) => {
      console.log(`✅ Site Status: ${res.statusCode} ${res.statusMessage}`);
      resolve({ status: res.statusCode, headers: res.headers });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Site Error: ${err.message}`);
      resolve({ error: err.message });
    });
    
    req.setTimeout(10000, () => {
      console.log('⏰ Site Timeout: Request took too long');
      req.destroy();
      resolve({ error: 'timeout' });
    });
    
    req.end();
  });
}

// Check GitHub Actions status
function checkGitHubActions() {
  try {
    console.log('📊 Checking recent commits...');
    const log = execSync('git log --oneline -3', { encoding: 'utf8' });
    console.log(log);
    
    console.log('\n🔄 Checking if we need to push...');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log('⚠️  Uncommitted changes detected:');
      console.log(status);
    } else {
      console.log('✅ Working directory clean');
    }
    
    console.log('\n🌿 Current branch:');
    const branch = execSync('git branch --show-current', { encoding: 'utf8' });
    console.log(branch.trim());
    
  } catch (error) {
    console.log(`❌ Git check failed: ${error.message}`);
  }
}

// Main check
async function main() {
  console.log('🚀 Wittwiz Deployment Status Check\n');
  
  await checkSiteStatus();
  console.log('');
  checkGitHubActions();
  
  console.log('\n💡 If site is down:');
  console.log('1. Check GitHub Actions: https://github.com/wittwizz/Wittwizz/actions');
  console.log('2. Wait 2-3 minutes for deployment to complete');
  console.log('3. Clear browser cache and try again');
  console.log('4. Check if GitHub Pages is enabled in repository settings');
}

main().catch(console.error);
