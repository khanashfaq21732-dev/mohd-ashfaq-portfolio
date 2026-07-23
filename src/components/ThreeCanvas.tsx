'use client';

import React, { Component, useEffect, useRef, useState, ReactNode } from 'react';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('ThreeCanvas ErrorBoundary caught a WebGL exception:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function ThreeCanvasInner() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let isContextLost = false;

    // Helper to check WebGL availability safely
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      setHasWebGLError(true);
      return;
    }

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x09090b, 0.015);

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 25;

      // Renderer setup with safety flags
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const canvasElement = renderer.domElement;
      container.appendChild(canvasElement);

      // WebGL Context Lost & Restored handlers
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        isContextLost = true;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        setHasWebGLError(true);
      };

      canvasElement.addEventListener('webglcontextlost', handleContextLost, false);

      // Particle field
      const particleCount = 700;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const cyanColor = new THREE.Color('#06b6d4');
      const blueColor = new THREE.Color('#3b82f6');
      const pinkColor = new THREE.Color('#ec4899');

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const rand = Math.random();
        const mixedColor = rand < 0.5 ? cyanColor : rand < 0.8 ? blueColor : pinkColor;
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      scene.add(particles);

      // Glowing central floating geometric Wireframe Torus Ring
      const ringGeo = new THREE.TorusGeometry(8, 2, 16, 50);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ringMesh);

      // Secondary floating Cube Wireframe
      const cubeGeo = new THREE.BoxGeometry(6, 6, 6);
      const cubeMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });
      const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
      scene.add(cubeMesh);

      // Mouse interactive tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
      };

      window.addEventListener('mousemove', onMouseMove);

      // Handle Resize
      const onResize = () => {
        if (!renderer || isContextLost) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onResize);

      // Animation Loop
      const animate = () => {
        if (isContextLost || !renderer) return;
        animationFrameId = requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;

        ringMesh.rotation.x += 0.002;
        ringMesh.rotation.y += 0.003;

        cubeMesh.rotation.x -= 0.001;
        cubeMesh.rotation.y -= 0.002;

        camera.position.x += (targetX * 15 - camera.position.x) * 0.05;
        camera.position.y += (-targetY * 15 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        try {
          renderer.render(scene, camera);
        } catch {
          isContextLost = true;
          setHasWebGLError(true);
        }
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        if (canvasElement) {
          canvasElement.removeEventListener('webglcontextlost', handleContextLost);
        }
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        if (renderer && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        particleMaterial.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        cubeGeo.dispose();
        cubeMat.dispose();
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to ambient CSS background:', err);
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return <CSSFallbackBackground />;
  }

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80" 
      aria-hidden="true"
    />
  );
}

function CSSFallbackBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),rgba(59,130,246,0.04),transparent_70%)]" 
      aria-hidden="true"
    />
  );
}

export default function ThreeCanvas() {
  return (
    <ThreeErrorBoundary fallback={<CSSFallbackBackground />}>
      <ThreeCanvasInner />
    </ThreeErrorBoundary>
  );
}


