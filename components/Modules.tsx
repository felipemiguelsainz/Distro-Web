import TiltCard from "./TiltCard";

const modules = [
  {
    icon: "ti-chart-dots",
    name: "Distro Analytics",
    tag: "Lo que está pasando, en tiempo real.",
    featured: false,
    items: [
      "KPIs en tiempo real",
      "Metas con estacionalidad",
      "Rutas optimizadas",
      "Chat con IA",
      "Comparativos históricos",
    ],
  },
  {
    icon: "ti-brain",
    name: "Distro Intelligence",
    tag: "Lo que va a pasar, y qué hacer al respecto.",
    featured: true,
    items: [
      "Clientes en riesgo",
      "Score de salud",
      "Próxima compra estimada",
      "Segmentación automática",
      "Centro de Recomendaciones IA",
    ],
  },
];

export default function Modules() {
  return (
    <section className="content" id="modulos">
      <p className="section-label">La plataforma</p>
      <h2 className="section-title">Dos módulos, una sola operación</h2>
      <div className="modules-grid">
        {modules.map((m) => (
          <TiltCard
            key={m.name}
            className={`module-card${m.featured ? " featured" : ""}`}
          >
            <div className="module-head">
              <div className="module-icon">
                <i className={`ti ${m.icon}`} />
              </div>
              <div>
                <p className="module-name">{m.name}</p>
                <p className="module-tag">{m.tag}</p>
              </div>
            </div>
            <ul className="module-list">
              {m.items.map((item) => (
                <li key={item}>
                  <i className="ti ti-check" />
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
