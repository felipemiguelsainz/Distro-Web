"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

type RingState = { width?: number; height?: number; color?: string };

type CursorContextValue = {
  setRing: (s: RingState) => void;
  resetRing: () => void;
};

const CursorContext = createContext<CursorContextValue>({
  setRing: () => {},
  resetRing: () => {},
});

export const useCursor = () => useContext(CursorContext);

/**
 * Renders the custom cursor (dot + lerped ring) and exposes imperative helpers
 * so any component can grow/shrink/recolor the ring on hover — exactly like the
 * original vanilla script mutated `#cring` from buttons, cards and scatter dots.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const lerp = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.12;
      p.ry += (p.my - p.ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx - 16 + "px";
        ringRef.current.style.top = p.ry - 16 + "px";
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setRing = useCallback((s: RingState) => {
    const r = ringRef.current;
    if (!r) return;
    if (s.width !== undefined) r.style.width = s.width + "px";
    if (s.height !== undefined) r.style.height = s.height + "px";
    if (s.color !== undefined) r.style.borderColor = s.color;
  }, []);

  const resetRing = useCallback(
    () => setRing({ width: 32, height: 32, color: "#BA7517" }),
    [setRing],
  );

  return (
    <CursorContext.Provider value={{ setRing, resetRing }}>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      {children}
    </CursorContext.Provider>
  );
}

/**
 * Magnetic-button behaviour: translate the element toward the cursor and swell
 * the ring (52px, dark accent). Spread the returned handlers onto a <button>.
 */
export function useMagnetic() {
  const { setRing, resetRing } = useCursor();
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${
      (e.clientY - r.top - r.height / 2) * 0.25
    }px)`;
    setRing({ width: 52, height: 52, color: "#854F0B" });
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    resetRing();
  };

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * 3D tilt behaviour for feature cards. Rotates on the X/Y axes based on cursor
 * position and shrinks the ring slightly. Spread onto a <div>.
 */
export function useTilt() {
  const { setRing } = useCursor();
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${
      -y * 10
    }deg) translateZ(4px)`;
    setRing({ width: 44, height: 44 });
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    setRing({ width: 32, height: 32 });
  };

  return { ref, onMouseMove, onMouseLeave };
}
