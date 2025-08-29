#!/usr/bin/env node

/**
 * Comprehensive Website Health Monitor
 * Monitors deployment health and prevents black screen issues
 */

import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://wittwizz.github.io/Wittwizz/';
const HEALTH_LOG = './logs/health-monitor.log';

// Ensure logs directory exists
if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs', { recursive: true });
}

/**
 * Log with timestamp
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  console.log(logMessage);
  
  // Append to health log
  fs.appendFileSync(HEALTH_LOG, logMessage + '\n');
}

/**
 * Check if website is accessible and not showing black screen
 */
async function checkWebsiteHealth() {
  return new Promise((resolve) => {
    log('🏥 Starting website health check...');
    
    const req = https.get(SITE_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const health = analyzeHTML(data);
        resolve(health);
      });
    });
    
    req.on('error', (error) => {
      log(`❌ Website unreachable: ${error.message}`, 'ERROR');
      resolve({
        accessible: false,
        hasCSS: false,
        hasJS: false,
        hasDuplicates: false,
        healthy: false,
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      log('⏰ Health check timeout', 'WARN');
      req.destroy();
      resolve({
        accessible: false,
        hasCSS: false,
        hasJS: false,
        hasDuplicates: false,
        healthy: false,
        error: 'Timeout'
      });
    });
  });
}

/**
 * Analyze HTML content for health issues
 */
function analyzeHTML(htmlContent) {
  log('🔍 Analyzing HTML content...');
  
  // Check basic accessibility
  const accessible = htmlContent.includes('<div id="root">');
  
  // Check for CSS links
  const cssLinks = htmlContent.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
  const cssPreloads = htmlContent.match(/<link[^>]+rel="preload"[^>]+as="style"[^>]*>/g) || [];
  const hasCSS = cssLinks.length > 0;
  
  // Check for JS scripts
  const jsScripts = htmlContent.match(/<script[^>]+src="[^"]*\.js"[^>]*>/g) || [];
  const jsPreloads = htmlContent.match(/<link[^>]+rel="preload"[^>]+as="script"[^>]*>/g) || [];
  const hasJS = jsScripts.length > 0;
  
  // Check for duplicates (the main cause of black screen)
  const hasDuplicates = cssLinks.length > 1 || cssPreloads.length > 1;
  
  // Check for broken asset references
  const brokenAssets = [];
  [...cssLinks, ...jsScripts].forEach(link => {
    const hrefMatch = link.match(/href="([^"]*)"/) || link.match(/src="([^"]*)"/);
    if (hrefMatch && hrefMatch[1].includes('undefined')) {
      brokenAssets.push(hrefMatch[1]);
    }
  });
  
  const healthy = accessible && hasCSS && hasJS && !hasDuplicates && brokenAssets.length === 0;
  
  log(`📊 Health Analysis Results:`);
  log(`   - Accessible: ${accessible}`);
  log(`   - Has CSS: ${hasCSS} (${cssLinks.length} links, ${cssPreloads.length} preloads)`);
  log(`   - Has JS: ${hasJS} (${jsScripts.length} scripts, ${jsPreloads.length} preloads)`);
  log(`   - Has Duplicates: ${hasDuplicates}`);
  log(`   - Broken Assets: ${brokenAssets.length}`);
  log(`   - Overall Health: ${healthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`);
  
  if (brokenAssets.length > 0) {
    log(`🚨 Broken assets detected: ${brokenAssets.join(', ')}`, 'ERROR');
  }
  
  return {
    accessible,
    hasCSS,
    hasJS,
    hasDuplicates,
    brokenAssets,
    healthy,
    cssLinks: cssLinks.length,
    cssPreloads: cssPreloads.length,
    jsScripts: jsScripts.length,
    jsPreloads: jsPreloads.length
  };
}

/**
 * Check local build health before deployment
 */
function checkLocalBuildHealth() {
  log('🏗️ Checking local build health...');
  
  if (!fs.existsSync('index.html')) {
    log('❌ index.html not found', 'ERROR');
    return false;
  }
  
  if (!fs.existsSync('dist/index.html')) {
    log('❌ dist/index.html not found', 'ERROR');
    return false;
  }
  
  const rootHTML = fs.readFileSync('index.html', 'utf8');
  const distHTML = fs.readFileSync('dist/index.html', 'utf8');
  
  const rootHealth = analyzeHTML(rootHTML);
  const distHealth = analyzeHTML(distHTML);
  
  log('📁 Root HTML Health:', rootHealth.healthy ? 'HEALTHY' : 'UNHEALTHY');
  log('📦 Dist HTML Health:', distHealth.healthy ? 'HEALTHY' : 'UNHEALTHY');
  
  return rootHealth.healthy && distHealth.healthy;
}

/**
 * Self-healing attempt
 */
async function attemptSelfHealing() {
  log('🔧 Attempting self-healing...');
  
  try {
    // Clean rebuild
    const { execSync } = await import('child_process');
    
    log('🧹 Cleaning previous build...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    log('🔨 Rebuilding application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    log('✅ Self-healing rebuild completed');
    return true;
  } catch (error) {
    log(`❌ Self-healing failed: ${error.message}`, 'ERROR');
    return false;
  }
}

/**
 * Send alert (placeholder for future integrations)
 */
function sendAlert(message, severity = 'WARNING') {
  log(`🚨 ALERT [${severity}]: ${message}`, 'ALERT');
  
  // Future: Add email, Slack, or webhook notifications
  // For now, just log prominently
  console.error(`\n${'='.repeat(60)}`);
  console.error(`🚨 DEPLOYMENT HEALTH ALERT 🚨`);
  console.error(`Severity: ${severity}`);
  console.error(`Message: ${message}`);
  console.error(`Time: ${new Date().toISOString()}`);
  console.error(`${'='.repeat(60)}\n`);
}

/**
 * Main health monitoring function
 */
async function runHealthMonitor(options = {}) {
  const { checkLocal = true, checkRemote = true, autoHeal = false } = options;
  
  log('🚀 Starting comprehensive health monitor...');
  
  let allHealthy = true;
  
  // Check local build health
  if (checkLocal) {
    const localHealthy = checkLocalBuildHealth();
    if (!localHealthy) {
      allHealthy = false;
      sendAlert('Local build is unhealthy - contains duplicates or broken assets', 'ERROR');
      
      if (autoHeal) {
        const healed = await attemptSelfHealing();
        if (healed) {
          log('✅ Self-healing successful');
        } else {
          sendAlert('Self-healing failed - manual intervention required', 'CRITICAL');
        }
      }
    }
  }
  
  // Check remote deployment health
  if (checkRemote) {
    const remoteHealth = await checkWebsiteHealth();
    if (!remoteHealth.healthy) {
      allHealthy = false;
      
      if (!remoteHealth.accessible) {
        sendAlert('Website is not accessible', 'CRITICAL');
      } else if (remoteHealth.hasDuplicates) {
        sendAlert('Website has duplicate resources causing black screen', 'ERROR');
      } else if (!remoteHealth.hasCSS || !remoteHealth.hasJS) {
        sendAlert('Website missing critical resources (CSS or JS)', 'ERROR');
      }
    }
  }
  
  if (allHealthy) {
    log('🎉 All health checks PASSED - Website is healthy!');
  } else {
    log('⚠️ Health issues detected - See alerts above', 'WARN');
  }
  
  return allHealthy;
}

// CLI interface
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const options = {
    checkLocal: !args.includes('--no-local'),
    checkRemote: !args.includes('--no-remote'),
    autoHeal: args.includes('--auto-heal')
  };
  
  runHealthMonitor(options)
    .then(healthy => {
      process.exit(healthy ? 0 : 1);
    })
    .catch(error => {
      log(`❌ Health monitor crashed: ${error.message}`, 'ERROR');
      process.exit(1);
    });
}

export { runHealthMonitor, checkWebsiteHealth, checkLocalBuildHealth, attemptSelfHealing };
