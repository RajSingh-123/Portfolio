import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Generate network graph nodes distributed on a sphere
 */
function generateNodeGraph(nodeCount: number = 50, connectionDistance: number = 2.5) {
  const nodes: THREE.Vector3[] = [];
  const edges: [number, number][] = [];

  // Generate nodes on sphere surface
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = goldenAngle * i;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    nodes.push(new THREE.Vector3(x * 3, y * 3, z * 3));
  }

  // Connect nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const distance = nodes[i].distanceTo(nodes[j]);
      if (distance < connectionDistance && Math.random() > 0.3) {
        edges.push([i, j]);
      }
    }
  }

  return { nodes, edges };
}

/**
 * Network nodes visualization
 */
function NetworkNodes({ nodes }: { nodes: THREE.Vector3[] }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: '#06b6d4',
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    return { geometry: geo, material: mat };
  }, [nodes]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/**
 * Network edges (connections between nodes)
 */
function NetworkEdges({ nodes, edges }: { nodes: THREE.Vector3[]; edges: [number, number][] }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, material } = useMemo(() => {
    const positions: number[] = [];

    edges.forEach(([start, end]) => {
      positions.push(nodes[start].x, nodes[start].y, nodes[start].z);
      positions.push(nodes[end].x, nodes[end].y, nodes[end].z);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    const mat = new THREE.LineBasicMaterial({
      color: '#0891b2',
      transparent: true,
      opacity: 0.4,
      linewidth: 1,
      fog: false,
    });

    return { geometry: geo, material: mat };
  }, [nodes, edges]);

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}

/**
 * Rotating data sphere container
 */
function DataSphereScene({ nodes, edges }: { nodes: THREE.Vector3[]; edges: [number, number][] }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationSpeedRef = useRef(0.0005);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeedRef.current * 0.5;
      groupRef.current.rotation.y += rotationSpeedRef.current;
      groupRef.current.rotation.z += rotationSpeedRef.current * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#1e3a8a" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#0891b2" />

      {/* Network visualization */}
      <NetworkEdges nodes={nodes} edges={edges} />
      <NetworkNodes nodes={nodes} />

      {/* Central glow sphere */}
      <mesh position={[0, 0, 0]} scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

/**
 * Data Sphere Component
 *
 * Features:
 * - Network graph nodes distributed on sphere surface
 * - Procedurally generated edges based on proximity
 * - Continuous slow rotation on multiple axes
 * - Neon cyan color theme
 * - GPU-optimized point and line rendering
 * - Graph theory inspired layout (golden spiral)
 *
 * @component
 * @example
 * <DataSphere />
 *
 * @returns {JSX.Element} Canvas-based 3D data sphere
 */
export function DataSphere({ containerClass = 'w-full h-96' }) {
  const { nodes, edges } = useMemo(() => generateNodeGraph(50, 2.5), []);

  return (
    <div className={containerClass} style={{ cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
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
          <DataSphereScene nodes={nodes} edges={edges} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default DataSphere;
