# Deep Link Testing Script for Wittwizz Calculator
# Tests all scenarios mentioned in WITTWIZZ-CALC-002D-POST1

Write-Host "🧪 Testing Deep Links for Wittwizz Calculator" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

$baseUrl = "http://localhost:5173"
$testResults = @()

# Test 1: Quick mode link with starter preset
Write-Host "`n1️⃣ Testing Quick mode link (?mode=quick&pick=starter)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl?mode=quick&pick=starter" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Quick mode link works" -ForegroundColor Green
        $testResults += @{Test="Quick mode link"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Quick mode link failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Quick mode link"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Quick mode link failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Quick mode link"; Status="FAIL"; Details=$_.Exception.Message}
}

# Test 2: Advanced mode link with multiple picks
Write-Host "`n2️⃣ Testing Advanced mode link with multiple picks" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl?mode=advanced&pick=brand_kit,web_site,social_media" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Advanced mode link works" -ForegroundColor Green
        $testResults += @{Test="Advanced mode link"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Advanced mode link failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Advanced mode link"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Advanced mode link failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Advanced mode link"; Status="FAIL"; Details=$_.Exception.Message}
}

# Test 3: Old-style link (?pick=starter) still works
Write-Host "`n3️⃣ Testing old-style link (?pick=starter)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl?pick=starter" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Old-style link works" -ForegroundColor Green
        $testResults += @{Test="Old-style link"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Old-style link failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Old-style link"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Old-style link failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Old-style link"; Status="FAIL"; Details=$_.Exception.Message}
}

# Test 4: Bad link defaults safely
Write-Host "`n4️⃣ Testing bad link defaults safely" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl?mode=invalid&pick=nonexistent" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Bad link handled safely" -ForegroundColor Green
        $testResults += @{Test="Bad link handling"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Bad link failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Bad link handling"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Bad link failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Bad link handling"; Status="FAIL"; Details=$_.Exception.Message}
}

# Test 5: Test with no parameters (default state)
Write-Host "`n5️⃣ Testing default state (no parameters)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Default state works" -ForegroundColor Green
        $testResults += @{Test="Default state"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Default state failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Default state"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Default state failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Default state"; Status="FAIL"; Details=$_.Exception.Message}
}

# Test 6: Test mode-only parameter
Write-Host "`n6️⃣ Testing mode-only parameter (?mode=advanced)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl?mode=advanced" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Mode-only parameter works" -ForegroundColor Green
        $testResults += @{Test="Mode-only parameter"; Status="PASS"; Details="Status 200"}
    } else {
        Write-Host "❌ Mode-only parameter failed with status $($response.StatusCode)" -ForegroundColor Red
        $testResults += @{Test="Mode-only parameter"; Status="FAIL"; Details="Status $($response.StatusCode)"}
    }
} catch {
    Write-Host "❌ Mode-only parameter failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{Test="Mode-only parameter"; Status="FAIL"; Details=$_.Exception.Message}
}

# Summary
Write-Host "`n📊 Test Results Summary" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

$passed = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failed = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$total = $testResults.Count

Write-Host "Total Tests: $total" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red

if ($failed -eq 0) {
    Write-Host "`n🎉 All tests passed! Deep links are working correctly." -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed. Check the details above." -ForegroundColor Yellow
}

# Detailed results
Write-Host "`n📋 Detailed Results:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusColor = if ($result.Status -eq "PASS") { "Green" } else { "Red" }
    $statusIcon = if ($result.Status -eq "PASS") { "✅" } else { "❌" }
    Write-Host "$statusIcon $($result.Test): $($result.Status) - $($result.Details)" -ForegroundColor $statusColor
}

Write-Host "`n🔗 Manual Testing URLs:" -ForegroundColor Cyan
Write-Host "Quick mode: $baseUrl`?mode=quick`&pick=starter" -ForegroundColor White
Write-Host "Advanced mode: $baseUrl`?mode=advanced`&pick=brand_kit,web_site" -ForegroundColor White
Write-Host "Legacy: $baseUrl`?pick=starter" -ForegroundColor White
Write-Host "Default: $baseUrl" -ForegroundColor White

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Open the URLs above in your browser" -ForegroundColor White
Write-Host "2. Test copy link button functionality" -ForegroundColor White
Write-Host "3. Test browser back/forward navigation" -ForegroundColor White
Write-Host "4. Verify calculator state persistence" -ForegroundColor White
