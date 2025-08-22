# Wittwizz Animation System

A comprehensive, accessible animation system built with React and CSS, designed for optimal performance and user experience.

## 🎯 Overview

The animation system provides:
- **Performance-safe animations** using only `opacity` and `transform` properties
- **Accessibility-first design** with automatic `prefers-reduced-motion` support
- **Centralized motion tokens** for consistent timing and easing
- **Reusable components** for common animation patterns
- **Zero layout shift** animations that maintain CLS scores

## 🚀 Core Components

### 1. Motion Tokens (`src/lib/motion.ts`)

Centralized configuration for all animations:

```typescript
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_THRESHOLDS } from '@/lib/motion';

// Duration tokens (150ms - 600ms)
MOTION_DURATIONS.fast      // 150ms
MOTION_DURATIONS.normal    // 300ms
MOTION_DURATIONS.slow      // 450ms
MOTION_DURATIONS.slower    // 600ms

// Easing functions
MOTION_EASINGS.ease        // Standard ease
MOTION_EASINGS.smooth      // Smooth transitions
MOTION_EASINGS.spring      // Bouncy animations
MOTION_EASINGS.bounce      // Elastic bounce

// Intersection Observer thresholds
MOTION_THRESHOLDS.standard // 15% in viewport
MOTION_THRESHOLDS.early    // 10% in viewport
MOTION_THRESHOLDS.late     // 25% in viewport
```

### 2. HeroReveal

First-paint hero animations with staggered children:

```tsx
import { HeroReveal, HeroRevealChild } from '@/ui';

<HeroReveal>
  <HeroRevealChild delay={0}>
    <h1>Title</h1>
  </HeroRevealChild>
  <HeroRevealChild delay={100}>
    <p>Subtitle</p>
  </HeroRevealChild>
  <HeroRevealChild delay={200}>
    <Button>CTA</Button>
  </HeroRevealChild>
</HeroReveal>
```

**Features:**
- Triggers only once per page load
- Staggered child animations
- Automatic reduced motion support
- Configurable timing

### 3. SectionSlideIn

Scroll-triggered section animations:

```tsx
import { SectionSlideIn, SlideUp, SlideDown, SlideLeft, SlideRight } from '@/ui';

// Custom direction and threshold
<SectionSlideIn direction="up" threshold={0.2} distance={32}>
  <div>Content slides up from below</div>
</SectionSlideIn>

// Predefined directions
<SlideUp>Content slides up</SlideUp>
<SlideDown>Content slides down</SlideDown>
<SlideLeft>Content slides from right</SlideLeft>
<SlideRight>Content slides from left</SlideRight>
```

**Features:**
- Uses Intersection Observer for performance
- Configurable trigger threshold (default: 15%)
- Automatic observer cleanup
- Direction-based transforms

### 4. ValidationNudge

Form validation feedback with gentle shake:

```tsx
import { ValidationNudge, ValidationField } from '@/ui';

<ValidationNudge
  isValid={isValid}
  showError={showError}
  errorMessage="This field is required"
>
  <input type="text" />
</ValidationNudge>

// Or use the field wrapper
<ValidationField
  isValid={isValid}
  showError={showError}
  errorMessage="This field is required"
>
  <input type="text" />
</ValidationField>
```

**Features:**
- Gentle shake animation only on invalid state
- Automatic error message display
- Respects reduced motion preferences
- Resets after validation passes

### 5. ToggleMicro

Animated toggle components:

```tsx
import { ToggleMicro, ToggleSwitch } from '@/ui';

// Simple toggle
<ToggleMicro
  isActive={isToggled}
  onChange={setIsToggled}
  size="md"
>
  {isToggled ? 'ON' : 'OFF'}
</ToggleMicro>

// Switch with label
<ToggleSwitch
  isActive={isToggled}
  onChange={setIsToggled}
  label="Enable feature"
  size="lg"
/>
```

**Features:**
- Subtle scale animations
- Multiple size variants
- Accessible ARIA attributes
- Smooth state transitions

### 6. Skeleton

Loading placeholders with pulse animation:

```tsx
import { Skeleton, SkeletonText, SkeletonCard, SkeletonTable } from '@/ui';

// Basic skeleton
<Skeleton variant="text" width="200px" height="20px" />

// Multiple lines
<SkeletonText lines={3} />

// Card skeleton
<SkeletonCard />

// Table skeleton
<SkeletonTable rows={5} columns={4} />
```

**Features:**
- CSS-only pulse animation
- Multiple variants (text, circular, rectangular, rounded)
- Automatic reduced motion support
- Configurable dimensions and spacing

## 🎨 Enhanced UI Components

### Button
- **Press animation**: Scale down to 98% on active state
- **Hover effects**: Scale up to 105% with subtle lift
- **Smooth transitions**: 150ms duration with smooth easing
- **Reduced motion**: Minimal scale changes for accessibility

### Card
- **Hover animation**: Scale up to 102% with lift effect
- **Shadow transitions**: Enhanced shadows on hover
- **Smooth transforms**: 300ms duration with smooth easing
- **Performance optimized**: Uses `will-change-transform`

## ♿ Accessibility Features

### Reduced Motion Support
- **Automatic detection**: Uses `prefers-reduced-motion` media query
- **Graceful degradation**: Shows content immediately without animation
- **CSS fallbacks**: Comprehensive reduced motion CSS rules
- **High contrast**: Maintains focus indicators in high contrast mode

### Performance Optimizations
- **GPU acceleration**: All animations use `transform` properties
- **Efficient observers**: Intersection Observer with automatic cleanup
- **Minimal repaints**: No layout-triggering properties
- **Smooth 60fps**: Optimized for consistent frame rates

## 📱 Mobile & Desktop Testing

### Performance Targets
- **FPS**: ≥60 frames per second
- **Lighthouse Performance**: ≥90
- **Lighthouse Accessibility**: ≥95
- **CLS**: Zero layout shift from animations

### Browser Support
- **Modern browsers**: Full animation support
- **Legacy browsers**: Graceful fallback to static content
- **Mobile devices**: Touch-optimized interactions
- **Screen readers**: Proper ARIA attributes and announcements

## 🛠️ Usage Guidelines

### 1. Animation Duration
- **Fast interactions**: 150ms (buttons, toggles)
- **Standard transitions**: 300ms (cards, sections)
- **Hero animations**: 600ms (page load reveals)

### 2. Easing Functions
- **Interactive elements**: `smooth` easing for natural feel
- **Page transitions**: `easeOut` for professional appearance
- **Micro-interactions**: `spring` for playful feedback

### 3. Performance Best Practices
- Use only `opacity` and `transform` properties
- Avoid animating `height`, `width`, `padding`, `margin`
- Implement `will-change-transform` for complex animations
- Clean up observers and timers properly

### 4. Accessibility Considerations
- Always respect `prefers-reduced-motion`
- Provide alternative states for animated content
- Ensure focus indicators remain visible
- Test with screen readers and keyboard navigation

## 🔧 Customization

### Extending Motion Tokens
```typescript
// Add custom durations
export const CUSTOM_DURATIONS = {
  ...MOTION_DURATIONS,
  extraSlow: 800,
  instant: 50,
};

// Add custom easings
export const CUSTOM_EASINGS = {
  ...MOTION_EASINGS,
  custom: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
```

### Creating Custom Animations
```typescript
// Custom animation component
export const CustomAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div
      className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transitionTimingFunction: MOTION_EASINGS.spring,
      }}
    >
      {children}
    </div>
  );
};
```

## 📊 Performance Monitoring

### Metrics to Track
- **First Contentful Paint (FCP)**: Ensure animations don't delay content
- **Largest Contentful Paint (LCP)**: Monitor hero animation impact
- **Cumulative Layout Shift (CLS)**: Verify zero layout disruption
- **Time to Interactive (TTI)**: Check animation performance impact

### Testing Tools
- **Lighthouse**: Performance and accessibility scores
- **Chrome DevTools**: Performance profiling and frame analysis
- **WebPageTest**: Real device performance testing
- **Accessibility tools**: Screen reader and keyboard navigation testing

## 🚀 Future Enhancements

### Planned Features
- **Framer Motion integration**: For complex animations
- **Page transition wrapper**: Smooth route changes
- **Animation orchestration**: Coordinated multi-element animations
- **Performance analytics**: Animation performance tracking
- **Design system integration**: Figma-to-code animation workflow

### Community Contributions
- **Custom easing curves**: Designer-friendly animation presets
- **Animation presets**: Common pattern libraries
- **Performance benchmarks**: Cross-browser animation testing
- **Accessibility guides**: Inclusive animation best practices

---

For questions, issues, or contributions, please refer to the project documentation or create an issue in the repository.




