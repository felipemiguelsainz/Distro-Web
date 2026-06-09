"use client";

import MagneticButton from "./MagneticButton";
import { useModal } from "@/lib/modal";

export default function CtaSection() {
  const { openModal } = useModal();

  return (
    <section style={{ padding: "5rem 2rem", textAlign: "center" }}>
      <p className="section-label" style={{ textAlign: "center" }}>
        Empezá hoy
      </p>
      <h2 style={{ fontSize: "40px", fontWeight: 500, marginBottom: "1rem" }}>
        Listo en días, no en meses
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          marginBottom: "2.5rem",
        }}
      >
        Implementación personalizada. Sin sorpresas.
      </p>
      <MagneticButton
        className="magnetic-btn"
        style={{ fontSize: "16px", padding: "14px 36px" }}
        onClick={() => openModal("form")}
      >
        Solicitar una demo →
      </MagneticButton>
    </section>
  );
}
