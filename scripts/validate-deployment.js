#!/usr/bin/env node

/**
 * Post-Deployment Validation Script
 * Ensures deployment is successful and website remains healthy
 */

import { runHealthMonitor } from './health-monitor.js';
import fs from 'fs';

const VALIDATION_LOG = './logs/deployment-validation.log';

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [VALIDATION] [${level}] ${message}`;
  console.log(logMessage);
  
  if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs', { recursive: true });
  }
  fs.appendFileSync(VALIDATION_LOG, logMessage + '\n');
}

/**
 * Wait for deployment to propagate
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate deployment with retries
 */
async function validateDeployment() {
  log('🚀 Starting post-deployment validation...');
  
  const maxRetries = 5;
  const retryDelay = 30000; // 30 seconds
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    log(`🔄 Validation attempt ${attempt}/${maxRetries}`);
    
    if (attempt > 1) {
      log(`⏳ Waiting ${retryDelay/1000} seconds for deployment to propagate...`);
      await sleep(retryDelay);
    }
    
    const healthy = await runHealthMonitor({
      checkLocal: false,
      checkRemote: true,
      autoHeal: false
    });
    
    if (healthy) {
      log('✅ Deployment validation PASSED');
      return true;
    } else {
      log(`❌ Deployment validation FAILED (attempt ${attempt}/${maxRetries})`);
      
      if (attempt === maxRetries) {
        log('🚨 All validation attempts failed - deployment is unhealthy', 'ERROR');
        return false;
      }
    }
  }
  
  return false;
}

/**
 * Create deployment health report
 */
async function createHealthReport() {
  log('📊 Creating deployment health report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    deployment: {
      successful: false,
      healthy: false,
      issues: []
    },
    local: {
      buildExists: fs.existsSync('dist/index.html'),
      rootExists: fs.existsSync('index.html')
    },
    remote: {
      accessible: false,
      hasResources: false,
      noDuplicates: true
    }
  };
  
  try {
    // Run comprehensive health check
    const healthy = await runHealthMonitor({
      checkLocal: true,
      checkRemote: true,
      autoHeal: false
    });
    
    report.deployment.successful = true;
    report.deployment.healthy = healthy;
    
    if (!healthy) {
      report.deployment.issues.push('Health checks failed');
    }
    
  } catch (error) {
    report.deployment.issues.push(`Health check error: ${error.message}`);
  }
  
  // Save report
  const reportPath = `./logs/health-report-${Date.now()}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`📋 Health report saved to ${reportPath}`);
  return report;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  validateDeployment()
    .then(async (success) => {
      await createHealthReport();
      
      if (success) {
        console.log('\n🎉 DEPLOYMENT VALIDATION SUCCESSFUL');
        console.log('✅ Website is healthy and accessible');
        process.exit(0);
      } else {
        console.error('\n❌ DEPLOYMENT VALIDATION FAILED');
        console.error('🚨 Website may be experiencing issues');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error(`💥 Validation script crashed: ${error.message}`);
      process.exit(1);
    });
}
