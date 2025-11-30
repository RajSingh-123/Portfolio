import React, { Suspense, useState, useEffect, lazy } from 'react';
import { useAnimation } from '@/context/AnimationContext';

// Lazy load the 3D scene component
const AnimatedBackgroundScene = lazy(() => {
  const module = import('./animated-bg-scene');
  return module.then(m => ({ default: m.AnimatedBackgroundSceneComponent }));
});
type Props = {
  reducedGraphics?: boolean;
};

export function AnimatedBackground({ reducedGraphics = false }: Props) {
  const { enabled: animationEnabled, setEnabled: setAnimationEnabled } = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Initialize from localStorage and respect prefers-reduced-motion
  useEffect(() => {
    setMounted(true);
    
    // Check stored preference
    const stored = localStorage.getItem('animate-bg-enabled');
    if (stored !== null) {
      setAnimationEnabled(stored === 'true');
    }

    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Persist animation preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('animate-bg-enabled', String(animationEnabled));
    }
  }, [animationEnabled, mounted]);

  const shouldAnimate = animationEnabled && !prefersReducedMotion && !reducedGraphics;

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #071029 0%, #0d2238 100%)',
        }}
      />
    );
  }

  return (
    <>
      {/* Animated Background Layer */}
      <div
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #071029 0%, #0d2238 100%)',
          overflow: 'hidden',
        }}
      >
        {shouldAnimate && (
          <Suspense fallback={null}>
            <AnimatedBackgroundScene />
          </Suspense>
        )}
      </div>

      {/* Contrast Overlay */}
      <div
        className="fixed inset-0 -z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(6,22,43,0.35) 0%, rgba(6,22,43,0.45) 100%)',
        }}
      />

      {/* Animation Toggle Button */}
      <button
        onClick={() => setAnimationEnabled(!animationEnabled)}
        className="fixed top-20 right-4 z-50 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
        data-testid="button-toggle-background-animation"
        aria-label={animationEnabled ? 'Pause animation' : 'Play animation'}
      >
        <span 
          className="w-2 h-2 rounded-full transition-colors"
          style={{
            backgroundColor: animationEnabled ? '#15b6b0' : '#666',
          }}
        />
        {animationEnabled ? 'Animating' : 'Paused'}
      </button>

      {/* Reduced Motion Indicator */}
      {prefersReducedMotion && (
        <div className="fixed top-20 right-48 z-50 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 text-white text-xs hidden lg:block opacity-60">
          Reduced motion enabled
        </div>
      )}
    </>
  );
}

export default AnimatedBackground;
