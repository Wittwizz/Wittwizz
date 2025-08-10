# Test Gates PowerShell Script
Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Starting preview server..." -ForegroundColor Green
# Start the preview server as a background job
$previewJob = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    npm run preview 
}

Write-Host "Waiting for preview server to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Check if the server is responding
$maxAttempts = 10
$attempt = 0
$serverReady = $false

while ($attempt -lt $maxAttempts -and -not $serverReady) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4173" -TimeoutSec 5 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $serverReady = $true
            Write-Host "Preview server is ready!" -ForegroundColor Green
        }
    } catch {
        Write-Host "Waiting for server... attempt $($attempt + 1)/$maxAttempts" -ForegroundColor Yellow
        Start-Sleep -Seconds 2
        $attempt++
    }
}

if (-not $serverReady) {
    Write-Host "Preview server failed to start!" -ForegroundColor Red
    Stop-Job $previewJob -ErrorAction SilentlyContinue
    Remove-Job $previewJob -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "Running Lighthouse tests..." -ForegroundColor Green
npm run lh:ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "Lighthouse tests failed!" -ForegroundColor Red
    Stop-Job $previewJob -ErrorAction SilentlyContinue
    Remove-Job $previewJob -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "Running accessibility tests..." -ForegroundColor Green
npm run axe:ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "Accessibility tests failed!" -ForegroundColor Red
    Stop-Job $previewJob -ErrorAction SilentlyContinue
    Remove-Job $previewJob -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "All tests passed! Cleaning up..." -ForegroundColor Green
Stop-Job $previewJob -ErrorAction SilentlyContinue
Remove-Job $previewJob -ErrorAction SilentlyContinue

Write-Host "Test gates completed successfully!" -ForegroundColor Green
