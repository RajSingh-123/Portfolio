import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated Grid Lines
 * Creates a Tron-like grid that moves forward with neon glow
 */
function GridLines() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, material } = useMemo(() => {
    const gridSize = 100;
    const gridDivisions = 50;
    const spacing = gridSize / gridDivisions;

    // Create grid lines
    const points: number[] = [];

    // Horizontal lines
    for (let i = 0; i <= gridDivisions; i++) {
      const pos = -gridSize / 2 + i * spacing;
      points.push(-gridSize / 2, 0, pos);
      points.push(gridSize / 2, 0, pos);
    }

    // Vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const pos = -gridSize / 2 + i * spacing;
      points.push(pos, 0, -gridSize / 2);
      points.push(pos, 0, gridSize / 2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));

    // Neon glow material
    const mat = new THREE.LineBasicMaterial({
      color: '#00ffff',
      linewidth: 2,
      fog: false,
      transparent: true,
      opacity: 0.8,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Move grid forward continuously
      groupRef.current.position.z += 0.3;

      // Reset position when grid moves too far (for infinite loop effect)
      if (groupRef.current.position.z > 50) {
        groupRef.current.position.z = -50;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      <lineSegments ref={linesRef} geometry={geometry} material={material} />
    </group>
  );
}

/**
 * Animated Grid Planes with Shader
 * Creates additional depth with moving planes
 */
function GridPlanes() {
  const groupRef = useRef<THREE.Group>(null);

  // Vertex shader for glow effect
  const vertexShader = `
    varying vec3 vPosition;
    
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader with glow
  const fragmentShader = `
    uniform float uTime;
    varying vec3 vPosition;
    
    void main() {
      // Distance-based fade
      float dist = length(vPosition.xy);
      float fade = 1.0 - (dist / 50.0);
      fade = max(0.0, fade);
      
      // Glow pulsation
      float glow = 0.5 + 0.5 * sin(uTime * 2.0);
      
      gl_FragColor = vec4(0.0, 1.0, 1.0, fade * glow * 0.3);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Move planes forward
      groupRef.current.position.z += 0.2;

      // Reset when too far
      if (groupRef.current.position.z > 50) {
        groupRef.current.position.z = -200;
      }
    }

    // Update uniform
    const child = groupRef.current?.children[0] as THREE.Mesh;
    const material = child?.material as THREE.ShaderMaterial;
    if (material?.uniforms) {
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(200, 200), []);

  return (
    <group ref={groupRef} position={[0, 0, -100]}>
      {[0, 25, 50, 75, 100, 125, 150, 175].map((z) => (
        <mesh key={z} position={[0, 0, z]} geometry={planeGeometry}>
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Grid Background Component
 *
 * Tron-like animated grid background with:
 * - Forward-moving grid lines
 * - Neon cyan/blue glow
 * - Infinite looping
 * - Performance optimized
 * - Depth effect
 *
 * @component
 * @example
 * <GridBackground />
 *
 * @returns {JSX.Element} Canvas-based grid background
 */
export function GridBackground({ containerClass = 'fixed inset-0 -z-50' }) {
  return (
    <div className={containerClass} style={{ pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas
        camera={{
          position: [0, 20, 0],
          fov: 75,
          near: 0.1,
          far: 500,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'lowp',
          logarithmicDepthBuffer: true,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        performance={{ min: 0.3 }}
      >
        <Suspense fallback={null}>
          {/* Minimal lighting */}
          <ambientLight intensity={0.2} color="#001a4d" />
          <pointLight position={[0, 50, 100]} intensity={0.2} color="#00ffff" />
          <pointLight position={[0, -50, -100]} intensity={0.1} color="#0066ff" />

          {/* Grid elements */}
          <GridLines />
          <GridPlanes />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GridBackground;
