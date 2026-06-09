const steps = [
  {
    n: "01",
    icon: "ti-file-spreadsheet",
    title: "Exportás como siempre",
    desc: "Tu sistema actual genera los mismos Excel de siempre. No cambiás nada de tu operación ni de tus procesos.",
  },
  {
    n: "02",
    icon: "ti-database",
    title: "Replicamos tu base",
    desc: "Distro reconstruye tu base de datos a partir de esos archivos. Sin integraciones complejas ni acceso a servidores externos.",
  },
  {
    n: "03",
    icon: "ti-bolt",
    title: "Operás con todo en vivo",
    desc: "KPIs, alertas y recomendaciones sobre tus datos reales, listos para usar en días.",
  },
];

export default function ErpSection() {
  return (
    <section className="content" id="erp">
      <p className="section-label">Integración</p>
      <h2 className="section-title">Funciona con el sistema que ya tenés</h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          maxWidth: "560px",
          lineHeight: 1.6,
        }}
      >
        No importa qué ERP uses. Distro se adapta a tu empresa replicando tu base
        de datos a partir de los exports que ya generás, normalmente en Excel.
      </p>
      <div className="steps-grid">
        {steps.map((s) => (
          <div className="step-card" key={s.n}>
            <div className="step-head">
              <div className="step-icon">
                <i className={`ti ${s.icon}`} />
              </div>
              <span className="step-num">{s.n}</span>
            </div>
            <p className="step-title">{s.title}</p>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
