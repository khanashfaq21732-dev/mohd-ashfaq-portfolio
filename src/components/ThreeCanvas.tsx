'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export default function ThreeCanvas({ interactive = true }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL availability first before attempting anything Three.js related
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      console.warn("WebGL not supported or blocked by browser sandboxing. Falling back to ambient CSS Glassmorphic background.");
      setWebglSupported(false);
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // --- SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf4f4f5, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // --- RENDERER SETUP (SAFE WRAPPER) ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      // Verify if context was actually obtained
      if (!renderer.getContext()) {
        throw new Error("WebGL context is null");
      }
    } catch (err) {
      console.warn("WebGL Context not available or blocked. Falling back to ambient CSS Glassmorphic background.", err);
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x0284c7, 12, 60);
    mainLight.position.set(5, 5, 10);
    scene.add(mainLight);

    const secondaryLight = new THREE.PointLight(0xec4899, 8, 60);
    secondaryLight.position.set(-5, -5, 10);
    scene.add(secondaryLight);

    // Dynamic cursor lighting
    const cursorLight = new THREE.PointLight(0x06b6d4, 15, 30);
    cursorLight.position.set(0, 0, 5);
    scene.add(cursorLight);

    // --- STARFIELD PARTICLES ---
    const starCount = 800;
    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Create a galaxy shape (clustered around center, spread outwards)
      const radius = Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.4; // flatten galaxy
      positions[i + 2] = radius * Math.cos(phi);

      // Gradient colors from slate-blue to muted lavender/indigo on white background
      const ratio = radius / 40;
      colors[i] = 0.2 + ratio * 0.3; // R
      colors[i + 1] = 0.3 + ratio * 0.2; // G
      colors[i + 2] = 0.5 + ratio * 0.1; // B
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.55
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- CENTRAL GEOMETRIES (Luxurious Glass Cubes) ---
    const cubeCount = 6;
    const cubes: THREE.Mesh[] = [];
    const cubeGroup = new THREE.Group();

    for (let i = 0; i < cubeCount; i++) {
      // Floating glass cube mesh with physical transmissive materials
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x00f2fe : 0xff007f,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.6, // Glass transparency
        thickness: 1.2,
        ior: 1.5, // Index of refraction
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });

      const cube = new THREE.Mesh(geometry, material);
      
      // Random spread
      cube.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      const scale = 0.5 + Math.random() * 1.2;
      cube.scale.set(scale, scale, scale);

      cubeGroup.add(cube);
      cubes.push(cube);
    }
    scene.add(cubeGroup);

    // --- SPINNING METALLIC RING ---
    const ringGeo = new THREE.TorusGeometry(8, 0.1, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x4facfe,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x112244
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // --- CURSOR INTERACTION LOGIC ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse positions
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // --- RESIZE LOGIC ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: currentWidth, height: currentHeight } = entry.contentRect;
        if (!rendererRef.current) return;
        
        camera.aspect = currentWidth / currentHeight;
        camera.updateProjectionMatrix();
        
        rendererRef.current.setSize(currentWidth, currentHeight);
      }
    });
    resizeObserver.observe(containerRef.current);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow rotation of central starfield galaxy
      starField.rotation.y = elapsedTime * 0.05;
      starField.rotation.z = elapsedTime * 0.02;

      // Spin ring
      ring.rotation.z = -elapsedTime * 0.15;
      ring.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;

      // Animate each cube independently (floating movement)
      cubes.forEach((cube, idx) => {
        cube.rotation.x += 0.005 * (idx + 1);
        cube.rotation.y += 0.003 * (idx + 1);
        cube.position.y += Math.sin(elapsedTime * 0.8 + idx) * 0.008;
      });

      // Ease cursor tracking
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      // Move camera slightly for premium parralax depth
      camera.position.x = targetX * 4;
      camera.position.y = targetY * 4;
      camera.lookAt(0, 0, 0);

      // Move cursor lighting
      cursorLight.position.x = targetX * 12;
      cursorLight.position.y = targetY * 8;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      resizeObserver.disconnect();
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          // Ignore
        }
      }
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      cubes.forEach(c => {
        c.geometry.dispose();
        if (Array.isArray(c.material)) {
          c.material.forEach(m => m.dispose());
        } else {
          c.material.dispose();
        }
      });
    };
  }, [interactive]);

  return (
    <div 
      id="three-canvas-root" 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-zinc-50" 
    >
      {/* Elegantly styled CSS Glassmorphic Fallback if WebGL fails */}
      {!webglSupported && (
        <div className="absolute inset-0 overflow-hidden bg-radial from-slate-50 via-zinc-100 to-zinc-200">
          {/* Cyan blur ball */}
          <div className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full bg-cyan-200/40 blur-[90px] animate-pulse duration-[6000ms]" />
          
          {/* Pink blur ball */}
          <div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-pink-100/40 blur-[100px] animate-pulse duration-[8000ms]" />
          
          {/* Blue blur ball */}
          <div className="absolute top-[45%] right-[25%] w-72 h-72 rounded-full bg-blue-150/30 blur-[80px] animate-pulse duration-[7000ms]" />
          
          {/* Abstract Grid Mesh Overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      )}
    </div>
  );
}
