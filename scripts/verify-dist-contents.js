#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying dist folder contents...\n');

function checkDistContents() {
  const distPath = './dist';
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ dist folder does not exist!');
    return;
  }
  
  console.log('✅ dist folder exists');
  
  // List all files in dist
  function listFiles(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        console.log(`${prefix}📁 ${item}/`);
        listFiles(fullPath, prefix + '  ');
      } else {
        const size = (stat.size / 1024).toFixed(2);
        console.log(`${prefix}📄 ${item} (${size} KB)`);
      }
    });
  }
  
  console.log('\n📋 Contents of dist folder:');
  listFiles(distPath);
  
  // Check if assets folder exists and has content
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    console.log('\n✅ assets folder exists');
    const assetFiles = fs.readdirSync(assetsPath);
    console.log(`📦 Found ${assetFiles.length} asset files:`);
    assetFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const size = (fs.statSync(filePath).size / 1024).toFixed(2);
      console.log(`  📄 ${file} (${size} KB)`);
    });
  } else {
    console.log('\n❌ assets folder does not exist!');
  }
  
  // Check index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('\n✅ dist/index.html exists');
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('index-ByO7DOVH.js')) {
      console.log('✅ dist/index.html contains production assets');
    } else {
      console.log('❌ dist/index.html does not contain production assets');
    }
  } else {
    console.log('\n❌ dist/index.html does not exist!');
  }
}

checkDistContents();
