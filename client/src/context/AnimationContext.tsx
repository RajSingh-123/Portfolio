// src/context/AnimationContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type AnimationContextType = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return true;
      const stored = localStorage.getItem('animate-bg-enabled');
      if (stored !== null) return stored === 'true';
      // respect OS-level preference if no stored preference
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReduced;
    } catch {
      return true;
    }
  });

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem('animate-bg-enabled', String(enabled));
    } catch {}
  }, [enabled]);

  return (
    <AnimationContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const ctx = useContext(AnimationContext);
  if (!ctx) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return ctx;
};
