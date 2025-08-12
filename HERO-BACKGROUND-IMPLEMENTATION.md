# Hero Background Implementation Guide

## Overview
This document outlines the implementation of a new hero background image for the Wittwizz landing page, replacing the current radial-glow effect with a beautiful gradient background image.

## Files Created/Modified

### 1. New Image File
- **Location**: `assets/hero_gradient.jpg`
- **Specifications**: 1920x1080px (16:9 aspect ratio)
- **Current Status**: Placeholder file created
- **Action Required**: Replace with actual image file

### 2. Updated Hero Component
- **File**: `src/sections/Hero.tsx`
- **Changes**: Added background image and overlay layers
- **Status**: ✅ Complete

### 3. Enhanced CSS Utilities
- **File**: `src/styles/tokens.css`
- **Changes**: Added hero background utility classes
- **Status**: ✅ Complete

### 4. Preview File
- **File**: `hero-preview.html`
- **Purpose**: Visual demonstration of the implementation
- **Status**: ✅ Complete

## Implementation Details

### Background Image Structure
```tsx
<section className="relative overflow-hidden">
  {/* Background Image Layer */}
  <div 
    className="hero-bg"
    style={{
      backgroundImage: 'url(/assets/hero_gradient.jpg)'
    }}
  />
  
  {/* Overlay Layer for Text Readability */}
  <div className="hero-overlay" />
  
  {/* Content Layer */}
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

### CSS Classes Added
```css
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: rgba(255, 255, 255, 0.8);
}

.dark .hero-overlay {
  background: rgba(15, 23, 42, 0.8);
}
```

## How It Works

1. **Background Image**: Full-screen background image with `cover` sizing for responsive behavior
2. **Overlay**: Semi-transparent white overlay (80% opacity) for better text readability
3. **Dark Mode**: Automatic dark mode support with slate-colored overlay
4. **Z-Index Layering**: Proper stacking order (background → overlay → content)
5. **Responsive**: Image scales appropriately on all device sizes

## To Complete Implementation

### Step 1: Replace Placeholder Image
1. Create or obtain your gradient image
2. Ensure it's exactly **1920x1080px** (16:9 aspect ratio)
3. Save it as `hero_gradient.jpg` in the `assets/` folder
4. Replace the existing placeholder file

### Step 2: Test the Implementation
```bash
# Start development server
npm run dev

# Or build and preview
npm run build
npm run preview
```

### Step 3: Verify
- [ ] Background image displays correctly
- [ ] Text remains readable over the background
- [ ] Responsive behavior works on different screen sizes
- [ ] Dark mode overlay functions properly
- [ ] Existing radial-glow effect is preserved

## Image Requirements

### Technical Specifications
- **Dimensions**: 1920x1080px (16:9 aspect ratio)
- **Format**: JPG/JPEG recommended for web
- **File Size**: Optimize for web (under 500KB if possible)
- **Color Profile**: sRGB for web compatibility

### Design Considerations
- **Text Readability**: Ensure sufficient contrast for white text
- **Brand Alignment**: Colors should complement Wittwizz brand palette
- **Performance**: Optimize image for fast loading
- **Accessibility**: Consider users with visual impairments

## Fallback Behavior

If the image fails to load:
- The overlay will still provide a clean background
- Text remains fully readable
- No visual breaking occurs
- Graceful degradation maintained

## Browser Support

- **Modern Browsers**: Full support
- **Older Browsers**: Graceful fallback to overlay-only
- **Mobile**: Responsive scaling maintained
- **High DPI**: Retina display support

## Performance Impact

- **Initial Load**: Minimal impact (single image)
- **Runtime**: No JavaScript overhead
- **Memory**: Standard background image memory usage
- **Accessibility**: Maintains existing accessibility features

## Troubleshooting

### Common Issues
1. **Image not displaying**: Check file path and ensure image exists
2. **Poor text readability**: Adjust overlay opacity in CSS
3. **Mobile scaling issues**: Verify `background-size: cover` is working
4. **Dark mode problems**: Check CSS selector specificity

### Debug Steps
1. Verify image file exists in correct location
2. Check browser developer tools for 404 errors
3. Test with different image formats if needed
4. Validate CSS class application

## Next Steps

1. ✅ **Implementation Complete** - All code changes made
2. 🔄 **Image Required** - Replace placeholder with actual image
3. 🧪 **Testing** - Verify functionality across devices
4. 🚀 **Deployment** - Deploy to production when ready

## Support

For questions or issues with this implementation:
- Check the preview file: `hero-preview.html`
- Review the updated Hero component code
- Consult the CSS utilities in `tokens.css`
- Test with the development server: `npm run dev`
