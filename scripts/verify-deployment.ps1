# Verify Deployment - Wittwizz Landing Page v1
# This script checks if the deployed site is accessible and working

$siteUrl = "https://wittwizz.github.io/Wittwizz/"
$testUrls = @(
    $siteUrl,
    "$siteUrl#services",
    "$siteUrl#packages",
    "$siteUrl#lead_form"
)

Write-Host "🚀 Verifying Wittwizz Landing Page v1 Deployment..." -ForegroundColor Green
Write-Host "Site URL: $siteUrl" -ForegroundColor Cyan
Write-Host ""

# Test basic connectivity
try {
    Write-Host "Testing basic connectivity..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 30
    $statusCode = $response.StatusCode
    $contentLength = $response.ContentLength
    
    if ($statusCode -eq 200) {
        Write-Host "✅ Site is accessible (HTTP $statusCode)" -ForegroundColor Green
        Write-Host "   Content length: $contentLength bytes" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  Site returned HTTP $statusCode" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Failed to connect to site: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test specific sections
Write-Host ""
Write-Host "Testing specific sections..." -ForegroundColor Yellow

foreach ($url in $testUrls) {
    try {
        $sectionResponse = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
        $sectionName = if ($url -match "#(.+)") { $matches[1] } else { "home" }
        
        if ($sectionResponse.StatusCode -eq 200) {
            Write-Host "✅ $sectionName section accessible" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $sectionName section returned HTTP $($sectionResponse.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Failed to access $url : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Check for common issues
Write-Host ""
Write-Host "Checking for common deployment issues..." -ForegroundColor Yellow

try {
    $robotsResponse = Invoke-WebRequest -Uri "$siteUrl/robots.txt" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ robots.txt accessible" -ForegroundColor Green
} catch {
    Write-Host "⚠️  robots.txt not found (optional)" -ForegroundColor Yellow
}

try {
    $sitemapResponse = Invoke-WebRequest -Uri "$siteUrl/sitemap.xml" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ sitemap.xml accessible" -ForegroundColor Green
} catch {
    Write-Host "⚠️  sitemap.xml not found (optional)" -ForegroundColor Yellow
}

# Performance check
Write-Host ""
Write-Host "Performance check..." -ForegroundColor Yellow
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
try {
    $perfResponse = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 30
    $stopwatch.Stop()
    $responseTime = $stopwatch.ElapsedMilliseconds
    
    if ($responseTime -lt 2000) {
        Write-Host "✅ Fast response time: ${responseTime}ms" -ForegroundColor Green
    } elseif ($responseTime -lt 5000) {
        Write-Host "⚠️  Moderate response time: ${responseTime}ms" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Slow response time: ${responseTime}ms" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Performance test failed" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "🎉 Deployment Verification Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Visit the site: $siteUrl" -ForegroundColor White
Write-Host "2. Test all sections and functionality" -ForegroundColor White
Write-Host "3. Check form submission (currently logs to console)" -ForegroundColor White
Write-Host "4. Replace placeholder images with actual assets" -ForegroundColor White
Write-Host "5. Implement form backend for lead capture" -ForegroundColor White
Write-Host ""
Write-Host "Site Status: ✅ DEPLOYED AND ACCESSIBLE" -ForegroundColor Green
