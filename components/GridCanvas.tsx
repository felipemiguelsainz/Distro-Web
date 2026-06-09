"use client";

import { useEffect, useRef } from "react";

/**
 * Reactive dot-grid behind the hero. Dots near the cursor grow brighter/larger.
 * Faithful port of the original canvas `drawGrid` loop.
 */
export default function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let gx = -999;
    let gy = -999;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += 40) {
        for (let y = 0; y < canvas.height; y += 40) {
          const d = Math.sqrt((x - gx) ** 2 + (y - gy) ** 2);
          const maxD = 180;
          ctx.beginPath();
          ctx.arc(x, y, d < maxD ? 1.5 : 1, 0, Math.PI * 2);
          ctx.fillStyle =
            d < maxD
              ? `rgba(186,117,23,${(1 - d / maxD) * 0.35})`
              : "rgba(186,117,23,0.08)";
          ctx.fill();
        }
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      gx = e.clientX - r.left;
      gy = e.clientY - r.top;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas className="hero-grid" ref={ref} />;
}
