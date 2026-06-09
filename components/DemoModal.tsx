"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/lib/modal";
import { animCount } from "@/lib/animate";

type Tab = "kpis" | "equipo" | "metas" | "intelligence";

type Bar = { name: string; w: number; color?: string };

const equipoBars: Bar[] = [
  { name: "Martín R.", w: 94 },
  { name: "Sofía L.", w: 78, color: "#378ADD" },
  { name: "Ana P.", w: 88, color: "#7F77DD" },
  { name: "Diego T.", w: 61, color: "#D85A30" },
];

const metasBars: Bar[] = [
  { name: "Chocolates", w: 82 },
  { name: "Bebidas", w: 71, color: "#378ADD" },
  { name: "Snacks", w: 90, color: "#7F77DD" },
];

type Client = { name: string; score: number; segment: string; alert: string };

const clients: Client[] = [
  { name: "Despensa María", score: 24, segment: "Crítico", alert: "Sin compras hace 67 días" },
  { name: "Kiosco Norte", score: 38, segment: "En riesgo", alert: "No compra hace 41 días" },
  { name: "Maxikiosco Centro", score: 55, segment: "Atención", alert: "Frecuencia en caída" },
  { name: "Almacén El Sol", score: 72, segment: "Estable", alert: "Bajó 18% vs mes pasado" },
  { name: "Drugstore 24h", score: 91, segment: "Alto valor", alert: "Listo para línea Premium" },
];

// Health-score color buckets — green / accent / red.
function scoreColor(score: number) {
  if (score >= 80) return "#1F9D55";
  if (score >= 50) return "#BA7517";
  return "#D85A30";
}

function BarRow({ bar, filled }: { bar: Bar; filled: boolean }) {
  return (
    <div className="demo-bar-item">
      <span className="demo-bar-name">{bar.name}</span>
      <div className="demo-bar-track">
        <div
          className="demo-bar-fill"
          style={{
            width: filled ? `${bar.w}%` : 0,
            ...(bar.color ? { background: bar.color } : {}),
          }}
        />
      </div>
      <span className="demo-bar-pct">{bar.w}%</span>
    </div>
  );
}

export default function DemoModal() {
  const { modals, closeModal, openModal } = useModal();
  const open = modals.demo;

  const [tab, setTab] = useState<Tab>("kpis");
  const [equipoFilled, setEquipoFilled] = useState(false);
  const [metasFilled, setMetasFilled] = useState(false);

  // Imperative refs — kept empty in JSX so animCount's textContent survives
  // re-renders (tab switches don't wipe the animated values).
  const dk1 = useRef<HTMLDivElement>(null);
  const dk2 = useRef<HTMLDivElement>(null);
  const dk3 = useRef<HTMLDivElement>(null);

  // Count-up KPIs each time the modal opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (dk1.current) animCount(dk1.current, 1840000, "$", "", 1000);
      if (dk2.current) animCount(dk2.current, 83, "", "%", 900);
      if (dk3.current) animCount(dk3.current, 34, "", "", 800);
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  const switchTab = (t: Tab) => {
    setTab(t);
    if (t === "equipo" && !equipoFilled) setTimeout(() => setEquipoFilled(true), 50);
    if (t === "metas" && !metasFilled) setTimeout(() => setMetasFilled(true), 50);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "kpis", label: "KPIs" },
    { id: "equipo", label: "Equipo" },
    { id: "metas", label: "Metas" },
    { id: "intelligence", label: "Intelligence" },
  ];

  return (
    <div
      className={`overlay${open ? " open" : ""}`}
      id="demo-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal("demo");
      }}
    >
      <div className="modal" style={{ maxWidth: "520px" }}>
        <button className="modal-close" onClick={() => closeModal("demo")}>
          <i className="ti ti-x" />
        </button>
        <p className="modal-title">Vista previa del dashboard</p>
        <p className="modal-sub">Así ve un supervisor su equipo en tiempo real.</p>

        <div className="demo-screen">
          <div className="demo-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`demo-tab${tab === t.id ? " active" : ""}`}
                onClick={() => switchTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: tab === "kpis" ? "block" : "none" }}>
            <div className="demo-kpi-row">
              <div className="demo-kpi">
                <div className="demo-kpi-label">Facturación</div>
                <div className="demo-kpi-val" ref={dk1} />
              </div>
              <div className="demo-kpi">
                <div className="demo-kpi-label">CCC</div>
                <div className="demo-kpi-val" ref={dk2} />
              </div>
              <div className="demo-kpi">
                <div className="demo-kpi-label">Visitas</div>
                <div className="demo-kpi-val" ref={dk3} />
              </div>
            </div>
          </div>

          <div style={{ display: tab === "equipo" ? "block" : "none" }}>
            <div className="demo-bar-row">
              {equipoBars.map((b) => (
                <BarRow key={b.name} bar={b} filled={equipoFilled} />
              ))}
            </div>
          </div>

          <div style={{ display: tab === "metas" ? "block" : "none" }}>
            <div
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                marginBottom: "12px",
              }}
            >
              Avance del equipo — Junio 2026
            </div>
            <div className="demo-bar-row">
              {metasBars.map((b) => (
                <BarRow key={b.name} bar={b} filled={metasFilled} />
              ))}
            </div>
          </div>

          <div style={{ display: tab === "intelligence" ? "block" : "none" }}>
            <div
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                marginBottom: "12px",
              }}
            >
              Score de salud por cliente
            </div>
            <div className="intel-list">
              {clients.map((c) => (
                <div className="intel-item" key={c.name}>
                  <div className="intel-main">
                    <span className="intel-name">{c.name}</span>
                    <span className="intel-alert">{c.alert}</span>
                  </div>
                  <div className="intel-side">
                    <span
                      className="intel-seg"
                      style={{
                        color: scoreColor(c.score),
                        background: `${scoreColor(c.score)}22`,
                      }}
                    >
                      {c.segment}
                    </span>
                    <span
                      className="intel-score"
                      style={{ color: scoreColor(c.score) }}
                    >
                      {c.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="form-submit"
          onClick={() => {
            closeModal("demo");
            openModal("form");
          }}
        >
          Quiero implementar esto →
        </button>
      </div>
    </div>
  );
}
