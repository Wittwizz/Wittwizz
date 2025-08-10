# Test MCP Endpoints - Task M1
# This script tests the reachability of the MCP endpoints for component libraries

$mcpEndpoints = @(
    "https://mcp.shadcn.net",
    "https://mcp.radix-ui.com", 
    "https://mcp.lucide.dev",
    "https://mcp.heroicons.com",
    "https://mcp.tailwindcss.com",
    "https://mcp.flowbite.com"
)

$results = @()
$timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"

Write-Host "🔍 Testing MCP Endpoints for Task M1..." -ForegroundColor Green
Write-Host "Timestamp: $timestamp" -ForegroundColor Cyan
Write-Host ""

foreach ($endpoint in $mcpEndpoints) {
    Write-Host "Testing: $endpoint" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $endpoint -UseBasicParsing -TimeoutSec 30
        $statusCode = $response.StatusCode
        $contentLength = $response.ContentLength
        $contentType = $response.Headers["Content-Type"]
        
        if ($statusCode -eq 200) {
            Write-Host "✅ SUCCESS: HTTP $statusCode" -ForegroundColor Green
            $result = "pass"
        } else {
            Write-Host "⚠️  WARNING: HTTP $statusCode" -ForegroundColor Yellow
            $result = "warning"
        }
        
        Write-Host "   Content-Type: $contentType" -ForegroundColor Gray
        Write-Host "   Content-Length: $contentLength bytes" -ForegroundColor Gray
        
    } catch {
        Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $result = "fail"
        $statusCode = "ERROR"
        $contentLength = 0
        $contentType = "N/A"
    }
    
    $endpointResult = @{
        endpoint = $endpoint
        status = $result
        http_code = $statusCode
        content_length = $contentLength
        content_type = $contentType
        timestamp = $timestamp
        error_message = if ($result -eq "fail") { $_.Exception.Message } else { $null }
    }
    
    $results += $endpointResult
    Write-Host ""
}

# Generate summary
$passCount = ($results | Where-Object { $_.status -eq "pass" }).Count
$warningCount = ($results | Where-Object { $_.status -eq "warning" }).Count
$failCount = ($results | Where-Object { $_.status -eq "fail" }).Count

Write-Host "📊 Test Summary:" -ForegroundColor Cyan
Write-Host "✅ Pass: $passCount" -ForegroundColor Green
Write-Host "⚠️  Warning: $warningCount" -ForegroundColor Yellow
Write-Host "❌ Fail: $failCount" -ForegroundColor Red
Write-Host ""

# Save results to JSON
$resultsPath = "../docs/mcp/endpoint_test_results.json"
$results | ConvertTo-Json -Depth 3 | Out-File -FilePath $resultsPath -Encoding UTF8
Write-Host "Results saved to: $resultsPath" -ForegroundColor Green

# Generate status update
$overallStatus = if ($failCount -eq 0) { "ready" } elseif ($failCount -lt 3) { "partially_ready" } else { "not_ready" }

$statusUpdate = @{
    project = "Wittwizz - MCP Enablement and Allowlist (Task M1)"
    last_updated = $timestamp
    overall_status = $overallStatus
    endpoint_summary = @{
        total = $mcpEndpoints.Count
        pass = $passCount
        warning = $warningCount
        fail = $failCount
    }
    endpoints = $results
    next_actions = @()
}

if ($failCount -gt 0) {
    $statusUpdate.next_actions += "Document failed endpoints and provide fallback options"
}

if ($passCount -gt 0) {
    $statusUpdate.next_actions += "Proceed with component allowlist creation for working endpoints"
    $statusUpdate.next_actions += "Create usage prompts for accessible components"
}

$statusPath = "../docs/mcp/task_m1_status.json"
$statusUpdate | ConvertTo-Json -Depth 4 | Out-File -FilePath $statusPath -Encoding UTF8
Write-Host "Status update saved to: $statusPath" -ForegroundColor Green

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
foreach ($action in $statusUpdate.next_actions) {
    Write-Host "- $action" -ForegroundColor White
}
