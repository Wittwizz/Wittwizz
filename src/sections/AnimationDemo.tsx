import * as React from 'react';
import { 
  HeroReveal, 
  HeroRevealChild, 
  SectionSlideIn, 
  ValidationNudge, 
  ToggleMicro, 
  ToggleSwitch,
  Skeleton,
  SkeletonCard,
  Button
} from '@/ui';

export default function AnimationDemo() {
  const [isValid, setIsValid] = React.useState(true);
  const [showError, setShowError] = React.useState(false);
  const [isToggled, setIsToggled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleValidationTest = () => {
    setShowError(true);
    setIsValid(false);
    
    setTimeout(() => {
      setIsValid(true);
      setShowError(false);
    }, 3000);
  };
  
  const handleToggleTest = () => {
    setIsToggled(!isToggled);
  };
  
  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <HeroReveal>
          <h2 className="text-3xl font-bold text-center mb-12">Animation System Demo</h2>
        </HeroReveal>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Hero Reveal Demo */}
          <SectionSlideIn direction="up" delay={100}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Hero Reveal</h3>
              <HeroReveal className="space-y-3">
                <HeroRevealChild delay={0}>
                  <div className="h-4 bg-blue-200 rounded"></div>
                </HeroRevealChild>
                <HeroRevealChild delay={100}>
                  <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                </HeroRevealChild>
                <HeroRevealChild delay={200}>
                  <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                </HeroRevealChild>
              </HeroReveal>
            </div>
          </SectionSlideIn>
          
          {/* Section Slide In Demo */}
          <SectionSlideIn direction="up" delay={200}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Section Slide In</h3>
              <div className="space-y-3">
                <div className="h-4 bg-green-200 rounded"></div>
                <div className="h-4 bg-green-200 rounded w-3/4"></div>
                <div className="h-4 bg-green-200 rounded w-1/2"></div>
              </div>
            </div>
          </SectionSlideIn>
          
          {/* Validation Nudge Demo */}
          <SectionSlideIn direction="up" delay={300}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Validation Nudge</h3>
              <ValidationNudge
                isValid={isValid}
                showError={showError}
                errorMessage="This field is required"
              >
                <input
                  type="text"
                  placeholder="Test input"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </ValidationNudge>
              <Button 
                onClick={handleValidationTest}
                className="mt-3 w-full"
                size="sm"
              >
                Test Validation
              </Button>
            </div>
          </SectionSlideIn>
          
          {/* Toggle Micro Demo */}
          <SectionSlideIn direction="up" delay={400}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Toggle Micro</h3>
              <div className="space-y-4">
                <ToggleMicro
                  isActive={isToggled}
                  onChange={handleToggleTest}
                >
                  {isToggled ? 'ON' : 'OFF'}
                </ToggleMicro>
                
                <ToggleSwitch
                  isActive={isToggled}
                  onChange={handleToggleTest}
                  label="Toggle Switch"
                />
              </div>
            </div>
          </SectionSlideIn>
          
          {/* Skeleton Demo */}
          <SectionSlideIn direction="up" delay={500}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Skeleton Loading</h3>
              <div className="space-y-3">
                {isLoading ? (
                  <SkeletonCard />
                ) : (
                  <div className="space-y-2">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                )}
                <Button 
                  onClick={handleLoadingTest}
                  className="w-full"
                  size="sm"
                >
                  {isLoading ? 'Loading...' : 'Toggle Loading'}
                </Button>
              </div>
            </div>
          </SectionSlideIn>
          
          {/* Button Animation Demo */}
          <SectionSlideIn direction="up" delay={600}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Button Animations</h3>
              <div className="space-y-3">
                <Button className="w-full">Primary Button</Button>
                <Button variant="ghost" className="w-full">Ghost Button</Button>
                <Button size="sm" className="w-full">Small Button</Button>
              </div>
            </div>
          </SectionSlideIn>
        </div>
        
        {/* Performance Info */}
        <SectionSlideIn direction="up" delay={700}>
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              All animations use only opacity/transform properties for optimal performance.
              <br />
              Reduced motion preferences are automatically respected.
            </p>
          </div>
        </SectionSlideIn>
      </div>
    </section>
  );
}



