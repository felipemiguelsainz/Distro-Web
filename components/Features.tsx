import TiltCard from "./TiltCard";

const features = [
  {
    icon: "ti-chart-bar",
    title: "Dashboard en tiempo real",
    desc: "KPIs por vendedor, equipo y zona con estacionalidad automática y comparación vs año anterior.",
  },
  {
    icon: "ti-target",
    title: "Gestión de metas",
    desc: "La meta sigue al territorio, no a la persona. Reasignaciones automáticas sin perder el histórico.",
  },
  {
    icon: "ti-map-pin",
    title: "Rutas optimizadas",
    desc: "Seleccioná los PDVs, el sistema optimiza el orden y abre Google Maps directo.",
  },
  {
    icon: "ti-robot",
    title: "IA conversacional",
    desc: "Preguntá en lenguaje natural. Datos reales de tu equipo al instante, de forma segura y auditable.",
  },
  {
    icon: "ti-bell",
    title: "Alertas automáticas",
    desc: "Notificaciones cuando un vendedor cae debajo del umbral o un cliente no compra.",
  },
  {
    icon: "ti-file-spreadsheet",
    title: "Carga flexible",
    desc: "Funciona con cualquier ERP vía Excel. Sin acceso a sistemas tercerizados.",
  },
];

export default function Features() {
  return (
    <section className="content" id="features">
      <p className="section-label">Funcionalidades</p>
      <h2 className="section-title">Todo en un solo lugar</h2>
      <div className="features-grid">
        {features.map((f) => (
          <TiltCard key={f.title}>
            <div className="card-icon">
              <i className={`ti ${f.icon}`} />
            </div>
            <p className="card-title">{f.title}</p>
            <p className="card-desc">{f.desc}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
