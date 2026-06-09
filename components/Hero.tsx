"use client";

import { useEffect, useState } from "react";
import GridCanvas from "./GridCanvas";
import MagneticButton from "./MagneticButton";
import { useModal } from "@/lib/modal";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { openModal } = useModal();
  const [lineDone, setLineDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLineDone(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <GridCanvas />
      <p className="eyebrow">Gestión comercial inteligente</p>
      <h1>
        Tu equipo de ventas,
        <br />
        <span className={`highlight${lineDone ? " line-done" : ""}`}>
          visible en tiempo real
        </span>
      </h1>
      <p className="hero-sub">
        Visibilidad en tiempo real y recomendaciones accionables para equipos
        comerciales que operan en campo.
      </p>
      <div className="cta-row">
        <MagneticButton className="magnetic-btn" onClick={() => openModal("demo")}>
          <i className="ti ti-player-play" /> Ver demo
        </MagneticButton>
        <MagneticButton className="ghost-btn" onClick={() => scrollTo("features")}>
          <i className="ti ti-arrow-down" /> Conocer más
        </MagneticButton>
      </div>
    </section>
  );
}
