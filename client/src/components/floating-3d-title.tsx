import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * 3D Text with Bloom Glow
 * Main text element with continuous slow rotation and glow effect
 */
function TextContent() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!textRef.current) return;
    // Very slow continuous rotation
    textRef.current.rotation.y += 0.0003;
    textRef.current.rotation.x += 0.00005;
  });

  return (
    <group ref={textRef}>
      <Text
        position={[0, 0, 0]}
        fontSize={1.2}
        font="/fonts/inter-bold.woff"
        maxWidth={12}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Raj Singh — Data Analyst
        <meshPhongMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          shininess={100}
          wireframe={false}
        />
      </Text>
    </group>
  );
}

/**
 * Scene Content with Lighting
 */
function SceneContent() {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#06b6d4" />

      {/* Floating Text with Gentle Bob Motion */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3} floatingRange={[-0.5, 0.5]}>
        <TextContent />
      </Float>

      {/* Bloom Effect */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          mipmapBlur={true}
        />
      </EffectComposer>
    </>
  );
}

/**
 * Floating3DTitle Component
 *
 * A reusable 3D text animation component that displays "Raj Singh — Data Analyst"
 * with continuous slow rotation, bloom glow, and gentle floating motion.
 *
 * Features:
 * - Smooth continuous rotation on X and Y axes
 * - Soft multi-colored point lighting (blue, purple, cyan)
 * - Bloom post-processing effect for glowing appearance
 * - Gentle floating motion using @react-three/drei Float component
 * - Fully responsive canvas
 * - Optimized performance with high refresh rate
 *
 * @component
 * @example
 * <Floating3DTitle />
 *
 * @returns {JSX.Element} Canvas-based 3D rotating text
 */
export function Floating3DTitle() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
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
      </Canvas>

      {/* Gradient overlay for polish */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </div>
  );
}

/**
 * Alternative: Compact Version for Hero Integration
 * Use this version to embed the 3D title in other sections
 */
export function Floating3DTitleCompact() {
  return (
    <div className="w-full aspect-video">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
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
      </Canvas>
    </div>
  );
}

export default Floating3DTitle;
