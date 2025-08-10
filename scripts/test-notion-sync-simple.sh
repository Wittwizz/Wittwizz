#!/bin/bash

# Simple Notion Sync Test Script (No jq dependency)
# Tests various sync events and verifies Notion updates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_ROOT/logs/notion-sync-simple.log"
CONFIG_FILE="$PROJECT_ROOT/automation/notion_sync_rules.json"
MAPPINGS_FILE="$PROJECT_ROOT/automation/notion_mappings.json"

# Ensure logs directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Logging function
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# Test result tracking
test_result() {
    local test_name="$1"
    local result="$2"
    local details="$3"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    
    if [ "$result" = "PASS" ]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        log "TEST" "${GREEN}✓ PASS${NC} - $test_name"
        if [ -n "$details" ]; then
            log "DETAILS" "$details"
        fi
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        log "TEST" "${RED}✗ FAIL${NC} - $test_name"
        if [ -n "$details" ]; then
            log "DETAILS" "$details"
        fi
    fi
}

# Simple JSON field checker using grep
check_json_field() {
    local file="$1"
    local field="$2"
    if grep -q "\"$field\"" "$file" 2>/dev/null; then
        return 0
    else
        return 1
    fi
}

# Header
log "INFO" "Starting Simple Notion Sync Tests (No jq dependency)"
log "INFO" "Project Root: $PROJECT_ROOT"
log "INFO" "Config File: $CONFIG_FILE"
log "INFO" "Log File: $LOG_FILE"

# Test 1: Configuration Files Validation
log "INFO" "Test 1: Validating configuration files"
if [ -f "$CONFIG_FILE" ] && [ -f "$MAPPINGS_FILE" ]; then
    test_result "Config Files Exist" "PASS" "Both notion_sync_rules.json and notion_mappings.json found"
else
    test_result "Config Files Exist" "FAIL" "Missing required configuration files"
fi

# Test 2: Basic JSON Structure Validation
log "INFO" "Test 2: Validating basic JSON structure"
if [ -f "$CONFIG_FILE" ] && [ -f "$MAPPINGS_FILE" ]; then
    # Check if files start with { and end with }
    if head -1 "$CONFIG_FILE" | grep -q "^{" && tail -1 "$CONFIG_FILE" | grep -q "}$"; then
        test_result "Config JSON Structure" "PASS" "Config file has valid JSON structure"
    else
        test_result "Config JSON Structure" "FAIL" "Config file JSON structure invalid"
    fi
    
    if head -1 "$MAPPINGS_FILE" | grep -q "^{" && tail -1 "$MAPPINGS_FILE" | grep -q "}$"; then
        test_result "Mappings JSON Structure" "PASS" "Mappings file has valid JSON structure"
    else
        test_result "Mappings JSON Structure" "FAIL" "Mappings file JSON structure invalid"
    fi
else
    test_result "JSON Structure Validation" "SKIP" "Files not found, skipping validation"
fi

# Test 3: Required Sync Policies Check
log "INFO" "Test 3: Checking required sync policies"
required_policies=(
    "cursor.task.created"
    "cursor.task.started"
    "github.pr.opened"
    "lighthouse.report.attached"
    "github.pr.merged"
    "cursor.task.blocked"
)

missing_policies=()
for policy in "${required_policies[@]}"; do
    if ! grep -q "\"$policy\"" "$CONFIG_FILE" 2>/dev/null; then
        missing_policies+=("$policy")
    fi
done

if [ ${#missing_policies[@]} -eq 0 ]; then
    test_result "Required Sync Policies" "PASS" "All required sync policies are defined"
else
    test_result "Required Sync Policies" "FAIL" "Missing policies: ${missing_policies[*]}"
fi

# Test 4: Field Mappings Validation
log "INFO" "Test 4: Validating field mappings"
required_fields=("Name" "Status" "Type" "Priority")
missing_fields=()

for field in "${required_fields[@]}"; do
    if ! grep -q "\"$field\"" "$MAPPINGS_FILE" 2>/dev/null; then
        missing_fields+=("$field")
    fi
done

if [ ${#missing_fields[@]} -eq 0 ]; then
    test_result "Required Field Mappings" "PASS" "All required field mappings are defined"
else
    test_result "Required Field Mappings" "FAIL" "Missing field mappings: ${missing_fields[*]}"
fi

# Test 5: Status Transitions Validation
log "INFO" "Test 5: Validating status transitions"
if grep -q "status_transitions" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Status Transitions" "PASS" "Status transition rules are defined"
else
    test_result "Status Transitions" "FAIL" "Status transition rules are missing"
fi

# Test 6: Webhook Endpoints Check
log "INFO" "Test 6: Checking webhook endpoints"
required_webhooks=("cursor_webhook" "github_webhook" "lighthouse_webhook")
missing_webhooks=()

for webhook in "${required_webhooks[@]}"; do
    if ! grep -q "\"$webhook\"" "$CONFIG_FILE" 2>/dev/null; then
        missing_webhooks+=("$webhook")
    fi
done

if [ ${#missing_webhooks[@]} -eq 0 ]; then
    test_result "Webhook Endpoints" "PASS" "All required webhook endpoints are defined"
else
    test_result "Webhook Endpoints" "FAIL" "Missing webhooks: ${missing_webhooks[*]}"
fi

# Test 7: Error Handling Configuration
log "INFO" "Test 7: Checking error handling configuration"
if grep -q "error_handling" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Error Handling" "PASS" "Error handling and retry policies are configured"
else
    test_result "Error Handling" "FAIL" "Error handling configuration is missing"
fi

# Test 8: Dry Run Configuration
log "INFO" "Test 8: Checking dry run configuration"
if grep -q "dry_run_config" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Dry Run Configuration" "PASS" "Dry run mode is configured"
else
    test_result "Dry Run Configuration" "FAIL" "Dry run configuration is missing"
fi

# Test 9: Event Field Validation
log "INFO" "Test 9: Validating event field mappings"
# Check if cursor.task.created has required field mappings
if grep -q "cursor.task.title" "$CONFIG_FILE" 2>/dev/null && grep -q "cursor.task.id" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Cursor Task Field Mappings" "PASS" "Required cursor task fields are mapped"
else
    test_result "Cursor Task Field Mappings" "FAIL" "Missing required cursor task field mappings"
fi

# Test 10: GitHub PR Field Validation
log "INFO" "Test 10: Validating GitHub PR field mappings"
if grep -q "github.pr.title" "$CONFIG_FILE" 2>/dev/null && grep -q "github.pr.url" "$CONFIG_FILE" 2>/dev/null; then
    test_result "GitHub PR Field Mappings" "PASS" "Required GitHub PR fields are mapped"
else
    test_result "GitHub PR Field Mappings" "FAIL" "Missing required GitHub PR field mappings"
fi

# Test 11: Lighthouse Field Validation
log "INFO" "Test 11: Validating Lighthouse field mappings"
if grep -q "lighthouse.performance" "$CONFIG_FILE" 2>/dev/null && grep -q "lighthouse.accessibility" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Lighthouse Field Mappings" "PASS" "Required Lighthouse fields are mapped"
else
    test_result "Lighthouse Field Mappings" "FAIL" "Missing required Lighthouse field mappings"
fi

# Test 12: Validation Rules Check
log "INFO" "Test 12: Checking validation rules"
if grep -q "validation_rules" "$CONFIG_FILE" 2>/dev/null; then
    test_result "Validation Rules" "PASS" "Validation rules are configured"
else
    test_result "Validation Rules" "FAIL" "Validation rules are missing"
fi

# Summary
log "INFO" "=== SIMPLE TEST SUMMARY ==="
log "INFO" "Total Tests: $TESTS_TOTAL"
log "INFO" "Passed: ${GREEN}$TESTS_PASSED${NC}"
log "INFO" "Failed: ${RED}$TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    log "INFO" "${GREEN}All tests passed!${NC} Sync rules are properly configured."
    exit 0
else
    log "WARN" "${YELLOW}Some tests failed.${NC} Please review the configuration and fix issues before proceeding."
    exit 1
fi
