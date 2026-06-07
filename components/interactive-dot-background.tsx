"use client";

import { useRef, useEffect } from "react";

const GRID_SPACING = 16;
const MOUSE_RADIUS = 120;

const BASE_DOT_RADIUS = 0.6;

const MAX_SCALE = 2.5;
const MAX_OPACITY = 0.5;

const IDLE_OPACITY_LIGHT = 0.04;
const IDLE_OPACITY_DARK = 0.02;

type Dot = {
  x: number;
  y: number;
};

export function InteractiveDotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas = canvasElement;
    const ctx = context;

    let dots: Dot[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const dotColor = () =>
      isDark() ? "255,255,255" : "0,0,0";

    const idleOpacity = () =>
      isDark() ? IDLE_OPACITY_DARK : IDLE_OPACITY_LIGHT;

    function buildGrid() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];

      const cols = Math.ceil(width / GRID_SPACING);
      const rows = Math.ceil(height / GRID_SPACING);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: col * GRID_SPACING + GRID_SPACING / 2,
            y: row * GRID_SPACING + GRID_SPACING / 2,
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const color = dotColor();
      const idle = idleOpacity();

      for (const dot of dots) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let opacity = idle;
        let scale = 1;

        if (distance < MOUSE_RADIUS) {
          const t = 1 - distance / MOUSE_RADIUS;
          const reveal = t * t * (3 - 2 * t); // smoothstep — smooth, wide halo

          opacity = idle + (MAX_OPACITY - idle) * reveal;
          scale = 1 + (MAX_SCALE - 1) * reveal;
        }

        ctx.beginPath();

        ctx.arc(
          dot.x,
          dot.y,
          BASE_DOT_RADIUS * scale,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }
    }

    function requestDraw() {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        draw();
        animationFrame = 0;
      });
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      requestDraw();
    }

    function handleMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
      requestDraw();
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;

      mouseX = touch.clientX;
      mouseY = touch.clientY;

      requestDraw();
    }

    function handleTouchEnd() {
      mouseX = -1000;
      mouseY = -1000;
      requestDraw();
    }

    function handleResize() {
      buildGrid();
      draw();
    }

    buildGrid();
    draw();

    const observer = new MutationObserver(() => {
      draw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrame);

      observer.disconnect();

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}