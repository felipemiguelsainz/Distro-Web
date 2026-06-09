"use client";

import type { ReactNode } from "react";
import { useTilt } from "@/lib/cursor";

export default function TiltCard({
  children,
  className = "tilt-card",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt();
  return (
    <div
      className={className}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
