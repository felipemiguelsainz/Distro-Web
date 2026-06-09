"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/lib/cursor";

type Vendor = { name: string; vis: number; rev: number; color: string };

const vendors: Vendor[] = [
  { name: "Martín R.", vis: 87, rev: 2.4, color: "#BA7517" },
  { name: "Sofía L.", vis: 72, rev: 1.9, color: "#378ADD" },
  { name: "Carlos M.", vis: 65, rev: 1.6, color: "#7F77DD" },
  { name: "Ana P.", vis: 90, rev: 2.1, color: "#EF9F27" },
  { name: "Diego T.", vis: 55, rev: 1.2, color: "#D85A30" },
  { name: "Laura V.", vis: 78, rev: 2.0, color: "#854F0B" },
  { name: "Pablo G.", vis: 60, rev: 1.4, color: "#185FA5" },
  { name: "Valeria C.", vis: 82, rev: 1.8, color: "#993556" },
];

const titleText = "Cada vendedor, cada número, en un solo vistazo";

export default function ScatterPlot() {
  const { setRing } = useCursor();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const buildScatter = () => {
      const sc = scatterRef.current;
      const stt = tooltipRef.current;
      if (!sc || !stt) return;

      vendors.forEach((v, i) => {
        const dot = document.createElement("div");
        dot.className = "scatter-dot";
        const size = 10 + v.rev * 4;
        dot.style.cssText = `width:${size}px;height:${size}px;background:${v.color};left:${
          8 + v.vis * 0.84
        }%;bottom:${10 + v.rev * 28}%;transform:scale(0);transition:transform 0.5s ${
          i * 0.08
        }s ease;`;

        dot.addEventListener("mouseenter", () => {
          const r = sc.getBoundingClientRect();
          const dr = dot.getBoundingClientRect();
          stt.style.display = "block";
          stt.style.left = dr.left - r.left + size + 6 + "px";
          stt.style.top = dr.top - r.top - 8 + "px";
          stt.innerHTML = `<strong>${v.name}</strong><br>Visitas: ${v.vis} · $${v.rev}M`;
          setRing({ width: 0, height: 0 });
        });
        dot.addEventListener("mouseleave", () => {
          stt.style.display = "none";
          setRing({ width: 32, height: 32 });
        });

        sc.appendChild(dot);
        setTimeout(() => {
          dot.style.transform = "scale(1)";
        }, 100 + i * 80);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === titleRef.current) {
            setRevealed(true);
            io.unobserve(e.target);
          }
          if (e.target === scatterRef.current && !builtRef.current) {
            builtRef.current = true;
            buildScatter();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (titleRef.current) io.observe(titleRef.current);
    if (scatterRef.current) io.observe(scatterRef.current);
    return () => io.disconnect();
  }, [setRing]);

  return (
    <section className="content" id="vendedores">
      <p className="section-label">Rendimiento</p>
      <h2
        ref={titleRef}
        className={`section-title reveal-words${revealed ? " revealed" : ""}`}
      >
        {titleText.split(" ").map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="word"
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {w}{" "}
          </span>
        ))}
      </h2>
      <div className="scatter" id="scatter" ref={scatterRef}>
        <span className="scatter-axis-x">Clientes visitados</span>
        <span className="scatter-axis-y">Facturación</span>
        <div className="scatter-tooltip" ref={tooltipRef} />
      </div>
    </section>
  );
}
