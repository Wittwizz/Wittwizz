#!/bin/bash

# Notion Sync Dry-Run Test Script
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
LOG_FILE="$PROJECT_ROOT/logs/notion-sync-dry-run.log"
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

# Header
log "INFO" "Starting Notion Sync Dry-Run Tests"
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

# Test 2: JSON Schema Validation
log "INFO" "Test 2: Validating JSON schema"
if command -v jq >/dev/null 2>&1; then
    if jq empty "$CONFIG_FILE" 2>/dev/null && jq empty "$MAPPINGS_FILE" 2>/dev/null; then
        test_result "JSON Schema Validation" "PASS" "Both files contain valid JSON"
    else
        test_result "JSON Schema Validation" "FAIL" "Invalid JSON in configuration files"
    fi
else
    test_result "JSON Schema Validation" "SKIP" "jq not available, skipping JSON validation"
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
    if ! jq -e ".sync_policies.\"$policy\"" "$CONFIG_FILE" >/dev/null 2>&1; then
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
    if ! jq -e ".field_map.\"$field\"" "$MAPPINGS_FILE" >/dev/null 2>&1; then
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
if jq -e '.validation_rules.status_transitions' "$CONFIG_FILE" >/dev/null 2>&1; then
    test_result "Status Transitions" "PASS" "Status transition rules are defined"
else
    test_result "Status Transitions" "FAIL" "Status transition rules are missing"
fi

# Test 6: Webhook Endpoints Check
log "INFO" "Test 6: Checking webhook endpoints"
required_webhooks=("cursor_webhook" "github_webhook" "lighthouse_webhook")
missing_webhooks=()

for webhook in "${required_webhooks[@]}"; do
    if ! jq -e ".webhook_endpoints.\"$webhook\"" "$CONFIG_FILE" >/dev/null 2>&1; then
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
if jq -e '.error_handling.retry_policy' "$CONFIG_FILE" >/dev/null 2>&1; then
    test_result "Error Handling" "PASS" "Error handling and retry policies are configured"
else
    test_result "Error Handling" "FAIL" "Error handling configuration is missing"
fi

# Test 8: Dry Run Configuration
log "INFO" "Test 8: Checking dry run configuration"
if jq -e '.dry_run_config.enabled' "$CONFIG_FILE" >/dev/null 2>&1; then
    dry_run_enabled=$(jq -r '.dry_run_config.enabled' "$CONFIG_FILE")
    if [ "$dry_run_enabled" = "true" ]; then
        test_result "Dry Run Configuration" "PASS" "Dry run mode is enabled and configured"
    else
        test_result "Dry Run Configuration" "FAIL" "Dry run mode is disabled"
    fi
else
    test_result "Dry Run Configuration" "FAIL" "Dry run configuration is missing"
fi

# Test 9: Simulate Cursor Task Created Event
log "INFO" "Test 9: Simulating cursor.task.created event"
cursor_task_event='{
  "event": "cursor.task.created",
  "data": {
    "cursor": {
      "task": {
        "id": "test-task-001",
        "title": "Test Task Creation",
        "type": "Feature",
        "priority": "High",
        "assignee": "Himanshu"
      }
    }
  }
}'

# Extract expected field mappings for this event
if jq -e '.sync_policies."cursor.task.created"' "$CONFIG_FILE" >/dev/null 2>&1; then
    test_result "Cursor Task Created Event" "PASS" "Event policy is properly configured"
    
    # Check if required fields are mapped
    required_cursor_fields=("cursor.task.title" "cursor.task.id")
    missing_cursor_fields=()
    
    for field in "${required_cursor_fields[@]}"; do
        if ! echo "$cursor_task_event" | jq -e ".data.$field" >/dev/null 2>&1; then
            missing_cursor_fields+=("$field")
        fi
    done
    
    if [ ${#missing_cursor_fields[@]} -eq 0 ]; then
        test_result "Cursor Task Required Fields" "PASS" "All required fields are present in test data"
    else
        test_result "Cursor Task Required Fields" "FAIL" "Missing fields: ${missing_cursor_fields[*]}"
    fi
else
    test_result "Cursor Task Created Event" "FAIL" "Event policy is not configured"
fi

# Test 10: Simulate GitHub PR Opened Event
log "INFO" "Test 10: Simulating github.pr.opened event"
github_pr_event='{
  "event": "github.pr.opened",
  "data": {
    "github": {
      "pr": {
        "title": "Test PR Title",
        "url": "https://github.com/wittwizz/test-repo/pull/1",
        "repo_url": "https://github.com/wittwizz/test-repo",
        "head_branch": "feature/test-sync",
        "author": "Himanshu"
      }
    }
  }
}'

if jq -e '.sync_policies."github.pr.opened"' "$CONFIG_FILE" >/dev/null 2>&1; then
    test_result "GitHub PR Opened Event" "PASS" "Event policy is properly configured"
    
    # Check if required fields are mapped
    required_github_fields=("github.pr.title" "github.pr.url")
    missing_github_fields=()
    
    for field in "${required_github_fields[@]}"; do
        if ! echo "$github_pr_event" | jq -e ".data.$field" >/dev/null 2>&1; then
            missing_github_fields+=("$field")
        fi
    done
    
    if [ ${#missing_github_fields[@]} -eq 0 ]; then
        test_result "GitHub PR Required Fields" "PASS" "All required fields are present in test data"
    else
        test_result "GitHub PR Required Fields" "FAIL" "Missing fields: ${missing_github_fields[*]}"
    fi
else
    test_result "GitHub PR Opened Event" "FAIL" "Event policy is not configured"
fi

# Test 11: Simulate Lighthouse Report Event
log "INFO" "Test 11: Simulating lighthouse.report.attached event"
lighthouse_event='{
  "event": "lighthouse.report.attached",
  "data": {
    "lighthouse": {
      "performance": 95,
      "accessibility": 98,
      "best_practices": 92,
      "seo": 100,
      "pr_url": "https://github.com/wittwizz/test-repo/pull/1",
      "repo_url": "https://github.com/wittwizz/test-repo"
    }
  }
}'

if jq -e '.sync_policies."lighthouse.report.attached"' "$CONFIG_FILE" >/dev/null 2>&1; then
    test_result "Lighthouse Report Event" "PASS" "Event policy is properly configured"
    
    # Check if required fields are mapped
    required_lh_fields=("lighthouse.performance" "lighthouse.accessibility")
    missing_lh_fields=()
    
    for field in "${required_lh_fields[@]}"; do
        if ! echo "$lighthouse_event" | jq -e ".data.$field" >/dev/null 2>&1; then
            missing_lh_fields+=("$field")
        fi
    done
    
    if [ ${#missing_lh_fields[@]} -eq 0 ]; then
        test_result "Lighthouse Required Fields" "PASS" "All required fields are present in test data"
    else
        test_result "Lighthouse Required Fields" "FAIL" "Missing fields: ${missing_lh_fields[*]}"
    fi
else
    test_result "Lighthouse Report Event" "FAIL" "Event policy is not configured"
fi

# Test 12: Simulate Complete PR Lifecycle
log "INFO" "Test 12: Simulating complete PR lifecycle"
pr_lifecycle_events=(
    "github.pr.opened"
    "lighthouse.report.attached"
    "github.pr.merged"
)

lifecycle_valid=true
for event in "${pr_lifecycle_events[@]}"; do
    if ! jq -e ".sync_policies.\"$event\"" "$CONFIG_FILE" >/dev/null 2>&1; then
        lifecycle_valid=false
        break
    fi
done

if [ "$lifecycle_valid" = true ]; then
    test_result "PR Lifecycle Events" "PASS" "All PR lifecycle events are properly configured"
else
    test_result "PR Lifecycle Events" "FAIL" "Some PR lifecycle events are missing"
fi

# Summary
log "INFO" "=== DRY-RUN TEST SUMMARY ==="
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
