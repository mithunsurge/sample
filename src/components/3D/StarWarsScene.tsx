import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text3D, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarWarsSceneProps {
  className?: string;
}

const DeathStar: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[3, 1, -2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
        {/* Death Star superlaser dish */}
        <mesh position={[0.3, 0.3, 0.6]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={0.3}
          />
        </mesh>
      </mesh>
    </Float>
  );
};

const TIEFighter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      groupRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-3, -1, -1]} scale={0.3}>
      {/* Cockpit */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.1, 2, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[0.1, 2, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const Lightsaber: React.FC = () => {
  const bladeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (bladeRef.current) {
      bladeRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={[0, -2, 1]} rotation={[0, 0, Math.PI / 4]}>
        {/* Hilt */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
          <meshStandardMaterial color="#silver" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Blade */}
        <mesh ref={bladeRef} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

const HologramEffect: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1.5, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#00aaff"
        emissive="#00aaff"
        emissiveIntensity={0.3}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const StarWarsScene: React.FC<StarWarsSceneProps> = ({ className }) => {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight ref={ambientLightRef} intensity={0.3} color="#001122" />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <HologramEffect />
        <DeathStar />
        <TIEFighter />
        <Lightsaber />
        
        {/* Floating energy orbs */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <Sphere args={[0.1]} position={[2, 2, 1]}>
            <MeshDistortMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.5}
              distort={0.3}
              speed={2}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Sphere args={[0.08]} position={[-2, -1, 2]}>
            <MeshDistortMaterial
              color="#ff0066"
              emissive="#ff0066"
              emissiveIntensity={0.5}
              distort={0.4}
              speed={3}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

export default StarWarsScene;