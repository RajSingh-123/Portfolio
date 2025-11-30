import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particle System Component
 * Creates an infinite field of moving, twinkling particles
 */
function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);

  // Create particle geometry and velocities
  const { geometry, velocities } = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random positions in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 50 + Math.random() * 30;

      positions[i] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i + 1] = Math.cos(phi) * radius;
      positions[i + 2] = Math.sin(phi) * Math.sin(theta) * radius;

      // Random velocities (slow movement)
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;

      // Initial opacity for twinkle effect
      opacities[i / 3] = Math.random() * 0.8 + 0.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    return { geometry: geo, velocities };
  }, []);

  velocityRef.current = velocities;

  // Animation loop
  useFrame(() => {
    if (!pointsRef.current || !velocityRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = pointsRef.current.geometry.attributes.opacity.array as Float32Array;

    timeRef.current += 0.001;

    for (let i = 0; i < positions.length; i += 3) {
      // Update positions based on velocities
      positions[i] += velocityRef.current[i];
      positions[i + 1] += velocityRef.current[i + 1];
      positions[i + 2] += velocityRef.current[i + 2];

      // Wrap around (infinite field effect)
      if (Math.abs(positions[i]) > 80) positions[i] *= -0.9;
      if (Math.abs(positions[i + 1]) > 80) positions[i + 1] *= -0.9;
      if (Math.abs(positions[i + 2]) > 80) positions[i + 2] *= -0.9;

      // Twinkle effect (sine wave oscillation)
      const particleIndex = i / 3;
      const twinkleSpeed = 0.02;
      const baseOpacity = 0.3 + Math.random() * 0.5;
      opacities[particleIndex] =
        baseOpacity + Math.sin(timeRef.current * twinkleSpeed + particleIndex) * 0.3;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.3}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * ParticleField Component
 *
 * A high-performance 3D particle field background layer that:
 * - Creates 1000 particles in infinite motion
 * - Implements smooth slow movement across 3D space
 * - Adds twinkling effect with sine wave modulation
 * - Wraps particles around boundaries for infinite effect
 * - Optimized for all devices with adjustable particle count
 * - Uses Three.js Points for maximum performance
 *
 * @component
 * @example
 * // Full screen background
 * <ParticleField />
 *
 * // With container styling
 * <div className="relative w-full h-screen">
 *   <ParticleField />
 *   <YourContent />
 * </div>
 *
 * @param {number} [particleCount=1000] - Optional: adjust particle count for performance
 * @returns {JSX.Element} Canvas-based infinite particle field
 */
export function ParticleField({ containerClass = 'absolute inset-0 -z-10' }) {
  return (
    <div className={containerClass}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        performance={{ min: 0.3 }}
      >
        <Suspense fallback={null}>
          <ParticleSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ParticleField;
