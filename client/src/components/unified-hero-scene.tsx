import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {useAnimation} from '@/context/AnimationContext';
import * as THREE from 'three';

/**
 * Detect if running on mobile device
 */
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Simple Particle System (Optimized)
 */
function OptimizedParticles({ enabled }: { enabled: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityRef = useRef<Float32Array | null>(null);
  const timeRef = useRef(0);

  const { geometry, velocities } = useMemo(() => {
    const isMobile = isMobileDevice();
    const particleCount = isMobile ? 300 : 800;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 40 + Math.random() * 20;

      positions[i] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i + 1] = Math.cos(phi) * radius;
      positions[i + 2] = Math.sin(phi) * Math.sin(theta) * radius;

      velocities[i] = (Math.random() - 0.5) * 0.015;
      velocities[i + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i + 2] = (Math.random() - 0.5) * 0.015;

      opacities[i / 3] = Math.random() * 0.6 + 0.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    return { geometry: geo, velocities };
  }, []);

  velocityRef.current = velocities;

  useFrame(() => {
    if (!enabled || !pointsRef.current || !velocityRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const opacities = pointsRef.current.geometry.attributes.opacity.array as Float32Array;

    timeRef.current += 0.0005;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocityRef.current[i];
      positions[i + 1] += velocityRef.current[i + 1];
      positions[i + 2] += velocityRef.current[i + 2];

      if (Math.abs(positions[i]) > 60) positions[i] *= -0.9;
      if (Math.abs(positions[i + 1]) > 60) positions[i + 1] *= -0.9;
      if (Math.abs(positions[i + 2]) > 60) positions[i + 2] *= -0.9;

      const particleIndex = i / 3;
      opacities[particleIndex] = 0.3 + Math.sin(timeRef.current * 0.02 + particleIndex) * 0.25;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.6}
        color="#06b6d4"
        fog={false}
      />
    </points>
  );
}

/**
 * Simple Floating Cube (Optimized)
 */
function FloatingCube({ position, enabled }: { position: [number, number, number]; enabled: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!enabled || !meshRef.current) return;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshPhongMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.2}
        shininess={60}
      />
    </mesh>
  );
}

/**
 * Optimized Network Graph (Data Sphere simplified)
 */
function SimpleDataGraph({ enabled }: { enabled: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, material } = useMemo(() => {
    const nodeCount = isMobileDevice() ? 20 : 35;
    const positions: number[] = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = goldenAngle * i;

      const x = Math.cos(angle) * radius * 2.5;
      const z = Math.sin(angle) * radius * 2.5;

      positions.push(x, y * 2.5, z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    const mat = new THREE.PointsMaterial({
      color: '#06b6d4',
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame(() => {
    if (!enabled || !groupRef.current) return;
    groupRef.current.rotation.y += 0.0008;
    groupRef.current.rotation.x += 0.0003;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

function UnifiedScene({ animationsEnabled }: { animationsEnabled: boolean }) {
  return (
    <>
      {/* Minimal lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#06b6d4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

      {/* Scene elements */}
      <OptimizedParticles enabled={animationsEnabled} />
      <FloatingCube position={[-3, 0, 0]} enabled={animationsEnabled} />
      <FloatingCube position={[3, 0, 0]} enabled={animationsEnabled} />
      <SimpleDataGraph enabled={animationsEnabled} />
    </>
  );
}

export function UnifiedHeroScene() {
  const {enabled: animationsEnabled, setEnabled: setAnimationsEnabled} = useAnimation();
  const [fps, setFps] = useState(60);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const isMobile = isMobileDevice();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      const currentFps = Math.round(frameCountRef.current / delta);
      setFps(currentFps);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'mediump',
          logarithmicDepthBuffer: false,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        frameloop={animationsEnabled ? 'always' : 'demand'}
        onCreated={(state) => {
          // Track frame count for FPS monitoring
          const originalRender = state.gl.render;
          state.gl.render = function (...args) {
            frameCountRef.current++;
            return originalRender.apply(this, args);
          };
        }}
      >
        <Suspense fallback={null}>
          <UnifiedScene animationsEnabled={animationsEnabled} />
        </Suspense>
      </Canvas>
      
      {/* Performance Monitor (Development) */}
      <div className="absolute bottom-4 right-4 z-20 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs font-mono hidden md:block">
        <div>FPS: {fps}</div>
        <div className="text-gray-400 text-[10px]">{isMobile ? 'Mobile' : 'Desktop'}</div>
      </div>
    </div>
  );
}

export default UnifiedHeroScene;
