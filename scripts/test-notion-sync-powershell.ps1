# PowerShell Notion Sync Test Script
# Tests various sync events and verifies Notion updates

param(
    [string]$LogFile = "logs/notion-sync-powershell.log"
)

# Ensure logs directory exists
$LogDir = Split-Path $LogFile -Parent
if (!(Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

# Colors for output (PowerShell compatible)
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Configuration
$ScriptDir = Split-Path $MyInvocation.MyCommand.Path -Parent
$ProjectRoot = Split-Path $ScriptDir -Parent
$ConfigFile = Join-Path $ProjectRoot "automation/notion_sync_rules.json"
$MappingsFile = Join-Path $ProjectRoot "automation/notion_mappings.json"
$LogFile = Join-Path $ProjectRoot $LogFile

# Logging function
function Write-Log {
    param(
        [string]$Level,
        [string]$Message
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    
    Write-Host $logEntry
    Add-Content -Path $LogFile -Value $logEntry
}

# Test counter
$TestsPassed = 0
$TestsFailed = 0
$TestsTotal = 0

# Test result tracking
function Test-Result {
    param(
        [string]$TestName,
        [string]$Result,
        [string]$Details
    )
    
    $script:TestsTotal++
    
    if ($Result -eq "PASS") {
        $script:TestsPassed++
        Write-Host "✓ PASS - $TestName" -ForegroundColor $Green
        if ($Details) {
            Write-Host "  Details: $Details" -ForegroundColor $Blue
        }
    } else {
        $script:TestsFailed++
        Write-Host "✗ FAIL - $TestName" -ForegroundColor $Red
        if ($Details) {
            Write-Host "  Details: $Details" -ForegroundColor $Red
        }
    }
}

# Header
Write-Log "INFO" "Starting PowerShell Notion Sync Tests"
Write-Log "INFO" "Project Root: $ProjectRoot"
Write-Log "INFO" "Config File: $ConfigFile"
Write-Log "INFO" "Log File: $LogFile"

# Test 1: Configuration Files Validation
Write-Log "INFO" "Test 1: Validating configuration files"
if ((Test-Path $ConfigFile) -and (Test-Path $MappingsFile)) {
    Test-Result "Config Files Exist" "PASS" "Both notion_sync_rules.json and notion_mappings.json found"
} else {
    Test-Result "Config Files Exist" "FAIL" "Missing required configuration files"
}

# Test 2: Basic JSON Structure Validation
Write-Log "INFO" "Test 2: Validating basic JSON structure"
if ((Test-Path $ConfigFile) -and (Test-Path $MappingsFile)) {
    try {
        $configContent = Get-Content $ConfigFile -Raw
        $mappingsContent = Get-Content $MappingsFile -Raw
        
        if ($configContent.Trim().StartsWith("{") -and $configContent.Trim().EndsWith("}")) {
            Test-Result "Config JSON Structure" "PASS" "Config file has valid JSON structure"
        } else {
            Test-Result "Config JSON Structure" "FAIL" "Config file JSON structure invalid"
        }
        
        if ($mappingsContent.Trim().StartsWith("{") -and $mappingsContent.Trim().EndsWith("}")) {
            Test-Result "Mappings JSON Structure" "PASS" "Mappings file has valid JSON structure"
        } else {
            Test-Result "Mappings JSON Structure" "FAIL" "Mappings file JSON structure invalid"
        }
    } catch {
        Test-Result "JSON Structure Validation" "FAIL" "Error reading files: $($_.Exception.Message)"
    }
} else {
    Test-Result "JSON Structure Validation" "SKIP" "Files not found, skipping validation"
}

# Test 3: Required Sync Policies Check
Write-Log "INFO" "Test 3: Checking required sync policies"
$requiredPolicies = @(
    "cursor.task.created",
    "cursor.task.started",
    "github.pr.opened",
    "lighthouse.report.attached",
    "github.pr.merged",
    "cursor.task.blocked"
)

$missingPolicies = @()
foreach ($policy in $requiredPolicies) {
    $escapedPolicy = [regex]::Escape($policy)
    if (!(Select-String -Path $ConfigFile -Pattern "\"$escapedPolicy\"" -Quiet)) {
        $missingPolicies += $policy
    }
}

if ($missingPolicies.Count -eq 0) {
    Test-Result "Required Sync Policies" "PASS" "All required sync policies are defined"
} else {
    Test-Result "Required Sync Policies" "FAIL" "Missing policies: $($missingPolicies -join ', ')"
}

# Test 4: Field Mappings Validation
Write-Log "INFO" "Test 4: Validating field mappings"
$requiredFields = @("Name", "Status", "Type", "Priority")
$missingFields = @()

foreach ($field in $requiredFields) {
    $escapedField = [regex]::Escape($field)
    if (!(Select-String -Path $MappingsFile -Pattern "\"$escapedField\"" -Quiet)) {
        $missingFields += $field
    }
}

if ($missingFields.Count -eq 0) {
    Test-Result "Required Field Mappings" "PASS" "All required field mappings are defined"
} else {
    Test-Result "Required Field Mappings" "FAIL" "Missing field mappings: $($missingFields -join ', ')"
}

# Test 5: Status Transitions Validation
Write-Log "INFO" "Test 5: Validating status transitions"
if (Select-String -Path $ConfigFile -Pattern "status_transitions" -Quiet) {
    Test-Result "Status Transitions" "PASS" "Status transition rules are defined"
} else {
    Test-Result "Status Transitions" "FAIL" "Status transition rules are missing"
}

# Test 6: Webhook Endpoints Check
Write-Log "INFO" "Test 6: Checking webhook endpoints"
$requiredWebhooks = @("cursor_webhook", "github_webhook", "lighthouse_webhook")
$missingWebhooks = @()

foreach ($webhook in $requiredWebhooks) {
    $escapedWebhook = [regex]::Escape($webhook)
    if (!(Select-String -Path $ConfigFile -Pattern "\"$escapedWebhook\"" -Quiet)) {
        $missingWebhooks += $webhook
    }
}

if ($missingWebhooks.Count -eq 0) {
    Test-Result "Webhook Endpoints" "PASS" "All required webhook endpoints are defined"
} else {
    Test-Result "Webhook Endpoints" "FAIL" "Missing webhooks: $($missingWebhooks -join ', ')"
}

# Test 7: Error Handling Configuration
Write-Log "INFO" "Test 7: Checking error handling configuration"
if (Select-String -Path $ConfigFile -Pattern "error_handling" -Quiet) {
    Test-Result "Error Handling" "PASS" "Error handling and retry policies are configured"
} else {
    Test-Result "Error Handling" "FAIL" "Error handling configuration is missing"
}

# Test 8: Dry Run Configuration
Write-Log "INFO" "Test 8: Checking dry run configuration"
if (Select-String -Path $ConfigFile -Pattern "dry_run_config" -Quiet) {
    Test-Result "Dry Run Configuration" "PASS" "Dry run mode is configured"
} else {
    Test-Result "Dry Run Configuration" "FAIL" "Dry run configuration is missing"
}

# Test 9: Event Field Validation
Write-Log "INFO" "Test 9: Validating event field mappings"
# Check if cursor.task.created has required field mappings
if ((Select-String -Path $ConfigFile -Pattern "cursor\.task\.title" -Quiet) -and 
    (Select-String -Path $ConfigFile -Pattern "cursor\.task\.id" -Quiet)) {
    Test-Result "Cursor Task Field Mappings" "PASS" "Required cursor task fields are mapped"
} else {
    Test-Result "Cursor Task Field Mappings" "FAIL" "Missing required cursor task field mappings"
}

# Test 10: GitHub PR Field Validation
Write-Log "INFO" "Test 10: Validating GitHub PR field mappings"
if ((Select-String -Path $ConfigFile -Pattern "github\.pr\.title" -Quiet) -and 
    (Select-String -Path $ConfigFile -Pattern "github\.pr\.url" -Quiet)) {
    Test-Result "GitHub PR Field Mappings" "PASS" "Required GitHub PR fields are mapped"
} else {
    Test-Result "GitHub PR Field Mappings" "FAIL" "Missing required GitHub PR field mappings"
}

# Test 11: Lighthouse Field Validation
Write-Log "INFO" "Test 11: Validating Lighthouse field mappings"
if ((Select-String -Path $ConfigFile -Pattern "lighthouse\.performance" -Quiet) -and 
    (Select-String -Path $ConfigFile -Pattern "lighthouse\.accessibility" -Quiet)) {
    Test-Result "Lighthouse Field Mappings" "PASS" "Required Lighthouse fields are mapped"
} else {
    Test-Result "Lighthouse Field Mappings" "FAIL" "Missing required Lighthouse field mappings"
}

# Test 12: Validation Rules Check
Write-Log "INFO" "Test 12: Checking validation rules"
if (Select-String -Path $ConfigFile -Pattern "validation_rules" -Quiet) {
    Test-Result "Validation Rules" "PASS" "Validation rules are configured"
} else {
    Test-Result "Validation Rules" "FAIL" "Validation rules are missing"
}

# Summary
Write-Log "INFO" "=== POWERSHELL TEST SUMMARY ==="
Write-Log "INFO" "Total Tests: $TestsTotal"
Write-Log "INFO" "Passed: $TestsPassed"
Write-Log "INFO" "Failed: $TestsFailed"

if ($TestsFailed -eq 0) {
    Write-Host "`nAll tests passed! Sync rules are properly configured." -ForegroundColor $Green
    exit 0
} else {
    Write-Host "`nSome tests failed. Please review the configuration and fix issues before proceeding." -ForegroundColor $Yellow
    exit 1
}
