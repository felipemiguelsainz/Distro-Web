"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMagnetic } from "@/lib/cursor";

type Props = {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  type?: "button" | "submit";
};

export default function MagneticButton({
  className,
  children,
  onClick,
  style,
  type = "button",
}: Props) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();
  return (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
