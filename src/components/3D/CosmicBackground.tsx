import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  mousePosition: { x: number; y: number };
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ mousePosition }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const frameRef = useRef<number>();
  const particlesRef = useRef<THREE.Points>();
  const nebulaMeshRef = useRef<THREE.Mesh>();
  const planetRef = useRef<THREE.Group>();
  const ringsRef = useRef<THREE.Group>();

  // Create particle system
  const createParticleSystem = useMemo(() => {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a sphere
      const radius = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color variations for cosmic theme
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Blue stars
        colors[i * 3] = 0.2 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
        colors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.6) {
        // Purple stars
        colors[i * 3] = 0.6 + Math.random() * 0.4;
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Orange/yellow stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.3;
      }

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create particle system
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(createParticleSystem.positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(createParticleSystem.colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(createParticleSystem.sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Add subtle movement
          mvPosition.x += sin(time * 0.5 + position.y * 0.01) * 2.0;
          mvPosition.y += cos(time * 0.3 + position.x * 0.01) * 2.0;
          
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Add twinkling effect
          alpha *= (0.5 + 0.5 * sin(gl_FragCoord.x * 0.01 + gl_FragCoord.y * 0.01));
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Create cosmic nebula background
    const nebulaGeometry = new THREE.SphereGeometry(80, 32, 32);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Noise function
        float noise(vec3 p) {
          return sin(p.x * 2.0) * sin(p.y * 3.0) * sin(p.z * 4.0);
        }
        
        void main() {
          vec3 pos = vPosition * 0.05;
          
          // Create flowing nebula effect
          float n1 = noise(pos + time * 0.1);
          float n2 = noise(pos * 2.0 + time * 0.15);
          float n3 = noise(pos * 4.0 + time * 0.2);
          
          float nebula = (n1 + n2 * 0.5 + n3 * 0.25) * 0.5 + 0.5;
          
          // Mouse interaction
          float mouseInfluence = 1.0 + (mouseX + mouseY) * 0.3;
          nebula *= mouseInfluence;
          
          // Color gradient
          vec3 color1 = vec3(0.1, 0.2, 0.8); // Deep blue
          vec3 color2 = vec3(0.6, 0.1, 0.8); // Purple
          vec3 color3 = vec3(0.8, 0.4, 0.1); // Orange
          
          vec3 finalColor = mix(color1, color2, nebula);
          finalColor = mix(finalColor, color3, nebula * 0.3);
          
          float alpha = nebula * 0.15;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });

    const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaMesh);
    nebulaMeshRef.current = nebulaMesh;

    // Create a distant planet
    const planetGroup = new THREE.Group();
    
    const planetGeometry = new THREE.SphereGeometry(8, 32, 32);
    const planetMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Create planet surface with moving patterns
          float pattern = sin(vUv.x * 10.0 + time * 0.5) * sin(vUv.y * 8.0 + time * 0.3);
          
          vec3 baseColor = vec3(0.3, 0.5, 0.9);
          vec3 patternColor = vec3(0.1, 0.3, 0.7);
          
          vec3 color = mix(baseColor, patternColor, pattern * 0.5 + 0.5);
          
          // Simple lighting
          float light = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))) * 0.5 + 0.5;
          color *= light;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(-40, 20, -60);
    planetGroup.add(planet);

    // Add rings to the planet
    const ringsGroup = new THREE.Group();
    const ringGeometry = new THREE.RingGeometry(10, 15, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    ringsGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.z = Math.PI / 4;
    ring2.scale.setScalar(0.8);
    ringsGroup.add(ring2);

    ringsGroup.position.copy(planet.position);
    planetGroup.add(ringsGroup);
    
    scene.add(planetGroup);
    planetRef.current = planetGroup;
    ringsRef.current = ringsGroup;

    // Position camera
    camera.position.z = 30;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update shader uniforms
      if (particles.material instanceof THREE.ShaderMaterial) {
        particles.material.uniforms.time.value = time;
      }

      if (nebulaMesh.material instanceof THREE.ShaderMaterial) {
        nebulaMesh.material.uniforms.time.value = time;
        nebulaMesh.material.uniforms.mouseX.value = (mousePosition.x - 50) * 0.02;
        nebulaMesh.material.uniforms.mouseY.value = (mousePosition.y - 50) * 0.02;
      }

      if (planet.material instanceof THREE.ShaderMaterial) {
        planet.material.uniforms.time.value = time;
      }

      // Rotate particles slowly
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Rotate nebula
      nebulaMesh.rotation.y += 0.0002;
      nebulaMesh.rotation.x += 0.0001;

      // Rotate planet and rings
      planet.rotation.y += 0.005;
      ringsGroup.rotation.z += 0.003;

      // Mouse-based camera movement
      const targetX = (mousePosition.x - 50) * 0.0002;
      const targetY = (mousePosition.y - 50) * 0.0002;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup
      geometry.dispose();
      material.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      planetGeometry.dispose();
      planetMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePosition, createParticleSystem]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(0, 10, 30, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)'
      }}
    />
  );
};

export default CosmicBackground;