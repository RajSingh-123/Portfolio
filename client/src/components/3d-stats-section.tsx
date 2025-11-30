import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated 3D Counter
 * Displays a number with rotating background shape
 */
function AnimatedCounter({ position, color }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Rotating background cube */}
      <mesh scale={1.5}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe={true}
          opacity={0.4}
          transparent={true}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh scale={0.8}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          shininess={60}
        />
      </mesh>
    </group>
  );
}

/**
 * 3D Stats Scene
 */
function StatsScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      {/* Stats counters */}
      <AnimatedCounter position={[-4, 0, 0]} color="#3b82f6" />
      <AnimatedCounter position={[0, 0, 0]} color="#8b5cf6" />
      <AnimatedCounter position={[4, 0, 0]} color="#06b6d4" />

    </>
  );
}

/**
 * 3D Statistics Section Component
 * Showcases key portfolio metrics in an interactive 3D environment
 */
export function Stats3D() {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-primary/20 bg-muted/50 backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <StatsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Stats3D;
