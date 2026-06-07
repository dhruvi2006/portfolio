"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface IPD3DLogoProps {
  className?: string;
}

export function IPD3DLogo({
  className = "",
}: IPD3DLogoProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    let isMounted = true;
    const container = mountRef.current;
    if (!container) return;

    // Determine initial container size
    const rect = container.getBoundingClientRect();
    const w = rect.width || 400;
    const h = rect.height || 400;

    // Clear any existing content
    container.innerHTML = "";

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(3, 3, 3);
    cameraRef.current = camera;

    // --- Renderer (transparent background) ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0); // Fully transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // --- Controls (with auto-rotate) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(5, 10, 7.5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x64b5f6, 1.8);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    // --- Load GLTF Model ---
    const loader = new GLTFLoader();
    loader.load(
      "/3d_ipdnow.glb",
      (gltf) => {
        const model = gltf.scene;

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale the model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.2 / maxDim;
        model.scale.setScalar(scale);

        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        if (!isMounted) return;
        scene.add(model);
      },
      (progress) => {
        console.log(
          "Loading progress:",
          Math.round((progress.loaded / progress.total) * 100) + "%"
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Mount the renderer to the DOM
    container.appendChild(renderer.domElement);

    // --- Animation Loop ---
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // --- Handle Resize with ResizeObserver ---
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      cameraRef.current.aspect = r.width / r.height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(r.width, r.height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    resizeObserverRef.current = resizeObserver;

    // --- Cleanup on unmount ---
    return () => {
      isMounted = false;
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (controlsRef.current) controlsRef.current.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (
          container &&
          rendererRef.current.domElement.parentElement === container
        ) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      // Dispose all geometries and materials to prevent memory leaks
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full ${className}`}
      title="Interactive 3D Logo"
    />
  );
}
