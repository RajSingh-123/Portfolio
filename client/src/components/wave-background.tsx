import React from 'react';

/**
 * Pure CSS Wave Background
 * Smooth flowing wave animation with dark blue to neon blue gradient
 * No Three.js - pure SVG and CSS for reliability
 */
export function WaveBackground({ containerClass = 'absolute inset-0 -z-10' }) {
  return (
    <div className={containerClass}>
      {/* SVG with animated waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.2))',
        }}
      >
        <defs>
          {/* Gradient for waves */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#001f3f" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#0066cc" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
          </linearGradient>

          {/* Radial glow */}
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
          </radialGradient>

          {/* Filter for wave effect */}
          <filter id="waveFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="4"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Background glow */}
        <circle
          cx="600"
          cy="200"
          r="400"
          fill="url(#glowGradient)"
          opacity="0.5"
        />

        {/* Wave layers */}
        <g filter="url(#waveFilter)">
          {/* Base wave */}
          <path
            d="M0,400 Q300,350 600,400 T1200,400 V800 H0 Z"
            fill="url(#waveGradient)"
            opacity="0.6"
            className="animate-wave"
            style={{
              animation: 'wave 15s ease-in-out infinite',
            }}
          />

          {/* Middle wave */}
          <path
            d="M0,450 Q300,400 600,450 T1200,450 V800 H0 Z"
            fill="url(#waveGradient)"
            opacity="0.5"
            className="animate-wave"
            style={{
              animation: 'wave 20s ease-in-out infinite reverse',
            }}
          />

          {/* Detail wave */}
          <path
            d="M0,500 Q300,450 600,500 T1200,500 V800 H0 Z"
            fill="url(#waveGradient)"
            opacity="0.4"
            className="animate-wave"
            style={{
              animation: 'wave 25s ease-in-out infinite',
            }}
          />
        </g>

        {/* Animated circles for visual interest */}
        <circle cx="200" cy="300" r="60" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.3">
          <animate attributeName="r" from="60" to="120" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="8s" repeatCount="indefinite" />
        </circle>

        <circle cx="1000" cy="250" r="40" fill="none" stroke="#0066cc" strokeWidth="2" opacity="0.3">
          <animate attributeName="r" from="40" to="100" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="10s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* CSS animations */}
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(50px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
    </div>
  );
}

export default WaveBackground;
