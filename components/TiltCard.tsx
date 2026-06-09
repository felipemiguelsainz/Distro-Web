"use client";

import type { ReactNode } from "react";
import { useTilt } from "@/lib/cursor";

export default function TiltCard({ children }: { children: ReactNode }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();
  return (
    <div
      className="tilt-card"
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
