import React, { useRef, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated Cube Shape
 */
function AnimatedCube({ position, baseColor, hoverColor }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse position globally
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;

    // Float animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.5;

    // Parallax effect - react to mouse movement
    meshRef.current.position.x = position[0] + mouseRef.current.x * 0.5;
    meshRef.current.position.z = position[2] + mouseRef.current.y * 0.3;

    // Color interpolation on hover
    if (materialRef.current) {
      const targetColor = isHovered ? hoverColor : baseColor;
      materialRef.current.color.lerp(new THREE.Color(targetColor), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshPhongMaterial
        ref={materialRef}
        color={baseColor}
        emissive={isHovered ? hoverColor : '#000000'}
        emissiveIntensity={isHovered ? 0.3 : 0}
        shininess={100}
      />
    </mesh>
  );
}

/**
 * Animated Sphere Shape
 */
function AnimatedSphere({ position, baseColor, hoverColor }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.x += 0.008;
    meshRef.current.rotation.z += 0.012;

    // Float animation (slower than cube)
    meshRef.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.8) * 0.6;

    // Parallax effect
    meshRef.current.position.x = position[0] + mouseRef.current.x * 0.4;
    meshRef.current.position.z = position[2] + mouseRef.current.y * 0.4;

    // Color interpolation on hover
    if (materialRef.current) {
      const targetColor = isHovered ? hoverColor : baseColor;
      materialRef.current.color.lerp(new THREE.Color(targetColor), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        ref={materialRef}
        color={baseColor}
        emissive={isHovered ? hoverColor : '#000000'}
        emissiveIntensity={isHovered ? 0.4 : 0}
        shininess={100}
      />
    </mesh>
  );
}

/**
 * Animated Torus Knot Shape
 */
function AnimatedTorusKnot({ position, baseColor, hoverColor }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotation - faster
    meshRef.current.rotation.x += 0.015;
    meshRef.current.rotation.y += 0.01;

    // Float animation (variable speed)
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.7;

    // Parallax effect
    meshRef.current.position.x = position[0] + mouseRef.current.x * 0.6;
    meshRef.current.position.z = position[2] + mouseRef.current.y * 0.2;

    // Color interpolation on hover
    if (materialRef.current) {
      const targetColor = isHovered ? hoverColor : baseColor;
      materialRef.current.color.lerp(new THREE.Color(targetColor), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <torusKnotGeometry args={[0.7, 0.2, 100, 16]} />
      <meshPhongMaterial
        ref={materialRef}
        color={baseColor}
        emissive={isHovered ? hoverColor : '#000000'}
        emissiveIntensity={isHovered ? 0.5 : 0}
        shininess={100}
      />
    </mesh>
  );
}

/**
 * Scene Container with all shapes
 */
function ShapesScene() {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.6} color="#06b6d4" />
      <pointLight position={[0, 0, 20]} intensity={0.5} color="#8b5cf6" />

      {/* Shapes arranged in 3D space */}
      <AnimatedCube 
        position={[-4, 0, 0]} 
        baseColor="#3b82f6" 
        hoverColor="#06b6d4" 
      />
      <AnimatedSphere 
        position={[0, 2, -3]} 
        baseColor="#8b5cf6" 
        hoverColor="#d946ef" 
      />
      <AnimatedTorusKnot 
        position={[4, -1, 0]} 
        baseColor="#06b6d4" 
        hoverColor="#22d3ee" 
      />
      <AnimatedCube 
        position={[-2, -2, -3]} 
        baseColor="#10b981" 
        hoverColor="#34d399" 
      />
      <AnimatedSphere 
        position={[3, 1, 2]} 
        baseColor="#f59e0b" 
        hoverColor="#fbbf24" 
      />
    </>
  );
}

/**
 * Floating 3D Shapes Component
 *
 * Features:
 * - Animated 3D shapes (cubes, spheres, torus knots)
 * - Floating up and down with sine/cosine waves
 * - Continuous rotation
 * - Mouse parallax effect
 * - Hover color transitions
 * - GPU-optimized
 *
 * @component
 * @example
 * <Floating3DShapes />
 *
 * @returns {JSX.Element} Canvas-based 3D shapes component
 */
export function Floating3DShapes({ containerClass = 'w-full h-96' }) {
  return (
    <div className={containerClass} style={{ cursor: 'grab' }}>
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
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ShapesScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Floating3DShapes;
