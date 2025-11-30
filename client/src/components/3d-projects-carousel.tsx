import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Card Component
 * Displays project as a 3D rotating card
 */
function ProjectCard3D({ project, isActive }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Smooth rotation transition
    groupRef.current.rotation.x += (targetRotationRef.current.x - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y += (targetRotationRef.current.y - groupRef.current.rotation.y) * 0.1;

    // Continuous gentle rotation when not active
    if (!isActive) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Update target rotation on mouse move (when active)
  const handleMouseMove = (e: any) => {
    if (!isActive) return;
    const x = (e.clientY / window.innerHeight) * 0.3 - 0.15;
    const y = (e.clientX / window.innerWidth) * 0.3 - 0.15;
    targetRotationRef.current = { x, y };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  return (
    <group ref={groupRef} position={isActive ? [0, 0, 2] : [4, 0, 0]} scale={isActive ? 1.2 : 0.8}>
      {/* Card background */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 4]} />
        <meshPhongMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isActive ? 0.4 : 0.1}
        />
      </mesh>

      {/* Title text */}
      <mesh position={[0, 1.2, 0.01]}>
        <planeGeometry args={[2.8, 0.5]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

/**
 * 3D Projects Carousel Scene
 */
function ProjectsCarouselScene({ activeProject }: any) {
  const projects = [
    { id: 1, name: 'HR Dashboard', color: '#3b82f6' },
    { id: 2, name: 'ETL Pipeline', color: '#8b5cf6' },
    { id: 3, name: 'Sales Analytics', color: '#06b6d4' },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />

      {/* Project cards */}
      {projects.map((project) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          isActive={activeProject === project.id}
        />
      ))}
    </>
  );
}

/**
 * 3D Projects Carousel Component
 * Interactive carousel showing projects in 3D
 */
export function Projects3DCarousel() {
  const [activeProject, setActiveProject] = useState(1);

  return (
    <div className="space-y-4">
      <div className="w-full h-96 rounded-2xl overflow-hidden border border-primary/20 bg-muted/50 backdrop-blur-sm">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
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
            <ProjectsCarouselScene activeProject={activeProject} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-3">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setActiveProject(num)}
            className={`h-2 rounded-full transition-all ${
              activeProject === num
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            data-testid={`carousel-dot-${num}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects3DCarousel;
