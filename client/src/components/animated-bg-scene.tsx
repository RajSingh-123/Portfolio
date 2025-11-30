import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============ CONFIGURATION - Adjust these for performance/visuals ============
const CONFIG = {
  particleCount: window.innerWidth < 768 ? 150 : 300,
  particleSize: 0.08,
  particleOpacity: 0.4,
  floatSpeed: 0.0003,
  rotationSpeed: 0.00008,
  colors: {
    primary: '#15b6b0',      // Teal
    secondary: '#5aa0ff',    // Soft blue
    tertiary: '#0d2238',     // Navy
  },
};

/**
 * Floating Particles Component
 * Creates subtle twinkling particles that drift slowly
 */
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const velocities = new Float32Array(CONFIG.particleCount * 3);
    const opacities = new Float32Array(CONFIG.particleCount);

    for (let i = 0; i < CONFIG.particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 50 + Math.random() * 30;

      positions[i] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i + 1] = Math.cos(phi) * radius;
      positions[i + 2] = Math.sin(phi) * Math.sin(theta) * radius;

      // Very slow velocities for subtle drifting
      velocities[i] = (Math.random() - 0.5) * 0.008;
      velocities[i + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i + 2] = (Math.random() - 0.5) * 0.008;

      opacities[i / 3] = Math.random() * 0.5 + 0.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    return { geometry: geo, velocities };
  }, []);

  velocityRef.current = velocities;

  useFrame(() => {
    if (!pointsRef.current || !velocityRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = pointsRef.current.geometry.attributes.opacity.array as Float32Array;

    timeRef.current += CONFIG.floatSpeed;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocityRef.current[i];
      positions[i + 1] += velocityRef.current[i + 1];
      positions[i + 2] += velocityRef.current[i + 2];

      // Wrap around boundaries
      if (Math.abs(positions[i]) > 80) positions[i] *= -0.95;
      if (Math.abs(positions[i + 1]) > 80) positions[i + 1] *= -0.95;
      if (Math.abs(positions[i + 2]) > 80) positions[i + 2] *= -0.95;

      // Subtle twinkling
      const particleIndex = i / 3;
      opacities[particleIndex] = 0.2 + Math.sin(timeRef.current * 0.005 + particleIndex) * 0.15;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={CONFIG.particleSize}
        sizeAttenuation
        transparent
        opacity={CONFIG.particleOpacity}
        color={CONFIG.colors.primary}
        fog={false}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Subtle Orb Component
 * Soft glowing spheres that drift gently
 */
function SubtleOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Very subtle rotation and drift
    meshRef.current.rotation.x += CONFIG.rotationSpeed;
    meshRef.current.rotation.y += CONFIG.rotationSpeed * 1.5;
    
    // Gentle floating motion
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * 0.3 + offset.current) * 0.2;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.25 + offset.current) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        shininess={40}
        transparent
        opacity={0.3}
        wireframe={false}
      />
    </mesh>
  );
}

/**
 * Animated Background Scene
 * Combines particles and subtle orbs for a low-impact animated background
 */
function BackgroundScene() {
  return (
    <>
      {/* Minimal lighting */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <pointLight position={[20, 20, 20]} intensity={0.15} color={CONFIG.colors.primary} />
      <pointLight position={[-20, -20, -20]} intensity={0.1} color={CONFIG.colors.secondary} />

      {/* Scene elements */}
      <FloatingParticles />
      
      {/* Subtle orbs at various positions */}
      <SubtleOrb position={[-15, 5, 0]} color={CONFIG.colors.primary} scale={0.6} />
      <SubtleOrb position={[15, -5, -10]} color={CONFIG.colors.secondary} scale={0.4} />
      <SubtleOrb position={[0, 10, -20]} color={CONFIG.colors.primary} scale={0.5} />
    </>
  );
}

/**
 * Animated Background Scene Component (Lazy Loaded)
 * Renders a Three.js Canvas with minimal, performant animations
 */
export function AnimatedBackgroundSceneComponent() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        precision: isMobile ? 'lowp' : 'mediump',
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>
    </Canvas>
  );
}

export default AnimatedBackgroundSceneComponent;
