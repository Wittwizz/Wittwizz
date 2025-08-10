# Create Placeholder Images for Wittwizz Landing Page
# This script generates basic placeholder images to avoid broken links

$assetsDir = "../assets"
$imageList = @(
    "hero_og.jpg",
    "service_branding.jpg",
    "service_web.jpg", 
    "service_social.jpg",
    "service_growth.jpg",
    "package_startup.jpg",
    "package_growth.jpg",
    "package_scale.jpg",
    "differentiator_automation.jpg",
    "differentiator_speed.jpg",
    "differentiator_clarity.jpg",
    "sector_d2c.jpg",
    "sector_saas.jpg",
    "sector_fintech.jpg",
    "sector_healthtech.jpg",
    "case_teaser_1.jpg",
    "case_teaser_2.jpg",
    "case_teaser_3.jpg"
)

Write-Host "Creating placeholder images for Wittwizz Landing Page..." -ForegroundColor Green

# Check if ImageMagick is available
try {
    $magickVersion = magick --version 2>$null
    if ($magickVersion) {
        Write-Host "ImageMagick found, creating high-quality placeholders..." -ForegroundColor Green
        
        foreach ($image in $imageList) {
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($image)
            $extension = [System.IO.Path]::GetExtension($image)
            $outputPath = Join-Path $assetsDir $image
            
            # Create a simple placeholder with text
            $text = $baseName -replace '_', ' ' -replace '([a-z])([A-Z])', '$1 $2'
            magick -size 400x300 xc:#f0f0f0 -fill "#666" -gravity center -pointsize 24 -annotate 0 $text $outputPath
            
            Write-Host "Created: $image" -ForegroundColor Yellow
        }
    } else {
        throw "ImageMagick not found"
    }
} catch {
    Write-Host "ImageMagick not available, creating simple text files as placeholders..." -ForegroundColor Yellow
    
    foreach ($image in $imageList) {
        $outputPath = Join-Path $assetsDir $image
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($image)
        $text = $baseName -replace '_', ' ' -replace '([a-z])([A-Z])', '$1 $2'
        
        # Create a simple text file with .jpg extension (will show as broken image but prevents 404s)
        "Placeholder for $text" | Out-File -FilePath $outputPath -Encoding UTF8
        
        Write-Host "Created placeholder: $image" -ForegroundColor Yellow
    }
}

Write-Host "Placeholder images created in $assetsDir" -ForegroundColor Green
Write-Host "Note: These are basic placeholders. Replace with actual images before production." -ForegroundColor Yellow
