import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KpiStrip from "@/components/KpiStrip";
import Features from "@/components/Features";
import ScatterPlot from "@/components/ScatterPlot";
import ScrambleSection from "@/components/ScrambleSection";
import Industries from "@/components/Industries";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <KpiStrip />

      <div style={{ height: "2rem" }} />
      <div className="divider" />

      <Features />
      <div className="divider" />

      <ScatterPlot />
      <div className="divider" />

      <ScrambleSection />
      <div className="divider" />

      <Industries />
      <div className="divider" style={{ marginTop: "4rem" }} />

      <CtaSection />

      <footer
        style={{
          borderTop: "0.5px solid var(--color-border)",
          padding: "1.5rem 2rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
          © 2026 Distro. Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
}
