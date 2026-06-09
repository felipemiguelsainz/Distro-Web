"use client";

import { useEffect, useRef } from "react";
import { animCount } from "@/lib/animate";

export default function KpiStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          const byId = (id: string) => document.getElementById(id);

          setTimeout(() => {
            const t = byId("kv1");
            if (t) animCount(t, 1840000, "$", "", 1200);
          }, 100);
          setTimeout(() => {
            const t = byId("kv2");
            if (t) animCount(t, 34, "", "", 1000);
          }, 200);
          setTimeout(() => {
            const t = byId("kv3");
            if (t) animCount(t, 83, "", "%", 1100);
          }, 300);
          setTimeout(() => {
            const t = byId("kv4");
            if (t) animCount(t, 12, "", "", 900);
          }, 400);

          (
            [
              ["kb1", "74"],
              ["kb2", "78"],
              ["kb3", "83"],
              ["kb4", "86"],
            ] as const
          ).forEach(([id, w], i) =>
            setTimeout(() => {
              const b = byId(id);
              if (b) b.style.width = w + "%";
            }, 300 + i * 100),
          );

          io.unobserve(e.target);
        });
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="kpi-row" id="kpi-strip" ref={ref}>
      <div className="kpi-card">
        <div className="kpi-label">Facturación hoy</div>
        <div className="kpi-value" id="kv1">
          $0
        </div>
        <div className="kpi-delta">
          <i className="ti ti-trending-up" /> +12% vs ayer
        </div>
        <div className="kpi-bar" id="kb1" />
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Clientes visitados</div>
        <div className="kpi-value" id="kv2">
          0
        </div>
        <div className="kpi-delta">
          <i className="ti ti-trending-up" /> 78% del obj.
        </div>
        <div className="kpi-bar" id="kb2" style={{ background: "#378ADD" }} />
      </div>
      <div className="kpi-card">
        <div className="kpi-label">CCC del mes</div>
        <div className="kpi-value" id="kv3">
          0%
        </div>
        <div className="kpi-delta">
          <i className="ti ti-trending-up" /> +5pp vs meta
        </div>
        <div className="kpi-bar" id="kb3" style={{ background: "#7F77DD" }} />
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Vendedores activos</div>
        <div className="kpi-value" id="kv4">
          0
        </div>
        <div className="kpi-delta">
          <i className="ti ti-trending-up" /> 12 de 14
        </div>
        <div className="kpi-bar" id="kb4" style={{ background: "#D85A30" }} />
      </div>
    </div>
  );
}
