"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Category = "Recuperación" | "Crecimiento" | "Cobertura" | "Alerta";

const categoryStyle: Record<
  Category,
  { color: string; light: string; icon: string }
> = {
  Recuperación: {
    color: "#BA7517",
    light: "rgba(186,117,23,0.14)",
    icon: "ti-refresh",
  },
  Crecimiento: {
    color: "#1F9D55",
    light: "rgba(31,157,85,0.14)",
    icon: "ti-trending-up",
  },
  Cobertura: {
    color: "#378ADD",
    light: "rgba(55,138,221,0.14)",
    icon: "ti-map-pin",
  },
  Alerta: {
    color: "#D85A30",
    light: "rgba(216,90,48,0.14)",
    icon: "ti-alert-triangle",
  },
};

type Rec = { category: Category; text: string; impact: string; time: string };

const recommendations: Rec[] = [
  {
    category: "Recuperación",
    text: "Contactar 12 clientes en riesgo que representan $3.4M anuales",
    impact: "$3.4M en juego",
    time: "hace 2 min",
  },
  {
    category: "Recuperación",
    text: "Reactivar 5 clientes que no compran hace más de 60 días",
    impact: "5 clientes",
    time: "hace 8 min",
  },
  {
    category: "Crecimiento",
    text: "Ofrecer línea Premium a 18 clientes con alta probabilidad de adopción",
    impact: "18 oportunidades",
    time: "hace 14 min",
  },
  {
    category: "Cobertura",
    text: "Aprovechar la ruta de mañana para visitar 4 clientes en riesgo cercanos",
    impact: "Ruta de mañana",
    time: "hace 21 min",
  },
  {
    category: "Alerta",
    text: "Caída anormal de ventas en categoría Bebidas esta semana",
    impact: "−14% semanal",
    time: "hace 33 min",
  },
];

export default function Recommendations() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setRevealed(true);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="content" id="recomendaciones">
      <p className="section-label">Centro de Recomendaciones IA</p>
      <h2 className="section-title">No te muestra métricas. Te dice qué hacer.</h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          maxWidth: "560px",
          lineHeight: 1.6,
        }}
      >
        Distro Intelligence analiza tu cartera y prioriza acciones concretas por
        impacto. Tu equipo abre la app y sabe exactamente a quién contactar hoy.
      </p>

      <div className="rec-live">
        <span className="rec-live-dot" />
        En vivo · actualizado recién
      </div>

      <div className={`rec-feed${revealed ? " revealed" : ""}`} ref={ref}>
        {recommendations.map((r, i) => {
          const s = categoryStyle[r.category];
          return (
            <div
              key={r.text}
              className="rec-card"
              style={
                {
                  transitionDelay: `${i * 0.12}s`,
                  "--cat-color": s.color,
                  "--cat-light": s.light,
                } as CSSProperties
              }
            >
              <div className="rec-icon">
                <i className={`ti ${s.icon}`} />
              </div>
              <div className="rec-body">
                <div className="rec-top">
                  <span className="rec-cat">{r.category}</span>
                  <span className="rec-time">{r.time}</span>
                </div>
                <p className="rec-text">{r.text}</p>
                <div className="rec-foot">
                  <span className="rec-impact">{r.impact}</span>
                  <button className="rec-action">Ver clientes →</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
