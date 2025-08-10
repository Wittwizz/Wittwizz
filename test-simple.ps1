# Simple Deep Link Test Script
Write-Host "Testing Deep Links..." -ForegroundColor Green

$baseUrl = "http://localhost:3002"

# Test basic URLs
$urls = @(
    "$baseUrl",
    "$baseUrl`?mode=quick`&pick=starter",
    "$baseUrl`?mode=advanced`&pick=brand_kit,web_site",
    "$baseUrl`?pick=starter",
    "$baseUrl`?mode=invalid`&pick=nonexistent"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        Write-Host "PASS: $url" -ForegroundColor Green
    } catch {
        Write-Host "FAIL: $url - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nManual Testing URLs:" -ForegroundColor Yellow
Write-Host "1. $baseUrl?mode=quick&pick=starter" -ForegroundColor White
Write-Host "2. $baseUrl?mode=advanced&pick=brand_kit,web_site" -ForegroundColor White
Write-Host "3. $baseUrl?pick=starter" -ForegroundColor White
Write-Host "4. $baseUrl" -ForegroundColor White
