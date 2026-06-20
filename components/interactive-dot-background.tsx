"use client";

import { useRef, useEffect } from "react";

const GRID_SPACING = 16;
const BASE_DOT_RADIUS = 0.6;

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

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const dotColor = () =>
      isDark() ? "255,255,255" : "0,0,0";

    const idleOpacity = () =>
      isDark() ? IDLE_OPACITY_DARK : IDLE_OPACITY_LIGHT;

    function buildGrid() {
      const width = window.innerWidth;
      const height = window.innerHeight;

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
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const color = dotColor();
      const idle = idleOpacity();

      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, BASE_DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${idle})`;
        ctx.fill();
      }
    }

    function handleResize() {
      buildGrid();
      draw();
    }

    function redraw() {
      draw();
    }

    buildGrid();
    draw();

    const observer = new MutationObserver(() => {
      redraw();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
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
