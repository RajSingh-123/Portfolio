import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating Orb Component
 * Smooth floating animation with slight rotation
 */
function FloatingOrb({ position, speed, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    timeRef.current += speed * 0.0005;
    
    // Floating motion
    meshRef.current.position.y += Math.sin(timeRef.current) * 0.001;
    meshRef.current.position.x += Math.cos(timeRef.current * 0.7) * 0.0005;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.0001;
    meshRef.current.rotation.y += 0.0002;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <Sphere args={[1, 32, 32]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </Sphere>
    </mesh>
  );
}

/**
 * Rotating Torus Component
 * Geometric shape that rotates continuously
 */
function RotatingTorus({ position, speed, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.0001;
    meshRef.current.rotation.y += speed * 0.00015;
    meshRef.current.rotation.z += speed * 0.00008;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <Torus args={[1, 0.3, 16, 100]}>
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          wireframe={false}
        />
      </Torus>
    </mesh>
  );
}

/**
 * Rotating Wireframe Cube
 * Low-poly geometric element
 */
function WireframeCube({ position, speed, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.00012;
    meshRef.current.rotation.y += speed * 0.0001;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        color={color}
        wireframe={true}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

/**
 * Particle Stars Background
 * Static stars scattered throughout the scene
 */
function ParticleStars() {
  const particlesRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!particlesRef.current) return;

    // Create particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40; // x
      positions[i + 1] = (Math.random() - 0.5) * 40; // y
      positions[i + 2] = (Math.random() - 0.5) * 40; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    particlesRef.current.geometry = geometry;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#ffffff" sizeAttenuation transparent opacity={0.4} />
    </points>
  );
}

/**
 * Scene Content
 * All 3D objects and lighting
 */
function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
      {/* Background stars */}
      <ParticleStars />

      {/* Floating Orbs */}
      <FloatingOrb
        position={[-5, 3, -8]}
        speed={0.8}
        scale={1.2}
        color="#3b82f6"
      />
      <FloatingOrb
        position={[5, -2, -6]}
        speed={1.2}
        scale={0.8}
        color="#8b5cf6"
      />
      <FloatingOrb
        position={[0, 4, -10]}
        speed={0.6}
        scale={0.6}
        color="#06b6d4"
      />

      {/* Rotating Geometric Shapes */}
      <RotatingTorus
        position={[-8, 0, 0]}
        speed={0.5}
        scale={1.5}
        color="#ec4899"
      />
      <RotatingTorus
        position={[8, 2, -5]}
        speed={0.7}
        scale={1}
        color="#3b82f6"
      />

      {/* Wireframe Cubes */}
      <WireframeCube
        position={[0, -3, -8]}
        speed={0.9}
        scale={1.5}
        color="#06b6d4"
      />
      <WireframeCube
        position={[-6, -5, -10]}
        speed={0.6}
        scale={0.8}
        color="#8b5cf6"
      />

      {/* Static central sphere with glow */}
      <mesh position={[0, 0, -10]} scale={2}>
        <Sphere args={[0.5, 64, 64]}>
          <meshPhongMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            wireframe={false}
          />
        </Sphere>
      </mesh>
    </>
  );
}

/**
 * Hero3DBackground Component
 * 
 * High-performance 3D animated background using Three.js and React Three Fiber.
 * Features:
 * - Floating orbs with smooth animations
 * - Rotating geometric shapes (torus, wireframe cubes)
 * - Particle star background
 * - Soft glowing ambient lighting
 * - Fully responsive canvas
 * - Optimized for continuous motion without performance impact
 * 
 * @component
 * @example
 * <Hero3DBackground />
 * 
 * @returns {JSX.Element} Canvas-based 3D background
 */
export function Hero3DBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        
        {/* Optional: Disable default controls for static background */}
        {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */}
      </Canvas>

      {/* Gradient overlay for smooth blend with background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
}

export default Hero3DBackground;
