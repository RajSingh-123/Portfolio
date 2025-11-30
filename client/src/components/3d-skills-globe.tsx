import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Skill Node Component
 * Floating skill tags arranged in 3D space
 */
function SkillNode({ position, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position} scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          shininess={80}
        />
      </mesh>
    </Float>
  );
}

/**
 * Skills Globe Scene
 */
function SkillsGlobeScene() {
  const skills = useMemo(
    () => [
      { name: 'SQL', color: '#3b82f6', angle: 0 },
      { name: 'Power BI', color: '#8b5cf6', angle: Math.PI / 3 },
      { name: 'Python', color: '#06b6d4', angle: (Math.PI * 2) / 3 },
      { name: 'Excel', color: '#10b981', angle: Math.PI },
      { name: 'DAX', color: '#f59e0b', angle: (Math.PI * 4) / 3 },
      { name: 'ETL', color: '#ef4444', angle: (Math.PI * 5) / 3 },
    ],
    []
  );

  const positions = useMemo(
    () =>
      skills.map((skill) => [
        Math.cos(skill.angle) * 4,
        Math.sin(skill.angle) * 3,
        Math.cos(skill.angle * 0.5) * 2,
      ]),
    [skills]
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />

      {/* Skill nodes */}
      {skills.map((skill, idx) => (
        <SkillNode
          key={skill.name}
          position={positions[idx] as [number, number, number]}
          color={skill.color}
        />
      ))}

      {/* Central sphere */}
      <mesh scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#1f2937"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

/**
 * 3D Skills Globe Component
 * Interactive visualization of core skills in 3D space
 */
export function Skills3DGlobe() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Suspense fallback={null}>
          <SkillsGlobeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Skills3DGlobe;
