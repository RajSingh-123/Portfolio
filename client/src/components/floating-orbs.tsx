import React from 'react';

export function FloatingOrbs() {
  return (
    <>
      {/* Floating Orb 1 - Primary Color */}
      <div className="fixed top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none animate-float-slow" 
        style={{
          background: 'radial-gradient(circle, rgba(0, 208, 132, 0.6), transparent)',
          animation: 'float-slow 8s ease-in-out infinite',
          zIndex: -20
        }}
      />
      
      {/* Floating Orb 2 - Blue Accent */}
      <div className="fixed top-1/3 right-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent)',
          animation: 'float-medium 10s ease-in-out infinite',
          animationDelay: '2s',
          zIndex: -20
        }}
      />
      
      {/* Floating Orb 3 - Purple Accent */}
      <div className="fixed bottom-1/4 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
          animation: 'float-fast 12s ease-in-out infinite',
          animationDelay: '4s',
          zIndex: -20
        }}
      />
      
      {/* Floating Orb 4 - Cyan Accent */}
      <div className="fixed top-2/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)',
          animation: 'float-slow 14s ease-in-out infinite',
          animationDelay: '1s',
          zIndex: -20
        }}
      />
      
      {/* Background Gradient Animation */}
      <div className="fixed inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'linear-gradient(-45deg, rgba(0, 208, 132, 0.05), rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05), rgba(0, 208, 132, 0.05))',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
          zIndex: -25
        }}
      />
    </>
  );
}
