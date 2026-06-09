"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { useMagnetic } from "@/lib/cursor";
import { useModal } from "@/lib/modal";

const phrases = ["Distro", "Tu equipo", "Tu negocio", "Tus metas", "Tu data", "Distro"];
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function ScrambleSection() {
  const scRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  const { ref: btnRef, onMouseMove, onMouseLeave } = useMagnetic();

  useEffect(() => {
    const scEl = scRef.current;
    if (!scEl) return;

    let activeIv: ReturnType<typeof setInterval> | null = null;

    const scramble = (t: string) => {
      let i = 0;
      if (activeIv) clearInterval(activeIv);
      activeIv = setInterval(() => {
        scEl.textContent = t
          .split("")
          .map((c, j) => (j < i ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("");
        if (i >= t.length && activeIv) clearInterval(activeIv);
        i += 0.5;
      }, 40);
    };

    let pi = 0;
    scramble(phrases[0]);
    const loop = setInterval(() => {
      pi = (pi + 1) % phrases.length;
      scramble(phrases[pi]);
    }, 2800);

    return () => {
      clearInterval(loop);
      if (activeIv) clearInterval(activeIv);
    };
  }, []);

  const handleRipple = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const rip = document.createElement("span");
    rip.className = "ripple";
    rip.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${
      e.clientY - r.top - d / 2
    }px;`;
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 700);
  };

  return (
    <section className="content" style={{ textAlign: "center" }}>
      <p className="section-label">Tecnología</p>
      <div className="text-scramble" ref={scRef}>
        Distro
      </div>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          margin: "1rem auto 2.5rem",
          maxWidth: "400px",
        }}
      >
        Implementación a medida. Sin licencias por usuario. Operando en días.
      </p>
      <button
        ref={btnRef}
        className="ripple-btn"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={(e) => {
          handleRipple(e);
          openModal("form");
        }}
      >
        Solicitar demo ahora →
      </button>
    </section>
  );
}
