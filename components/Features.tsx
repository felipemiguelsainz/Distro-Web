import TiltCard from "./TiltCard";

const features = [
  {
    icon: "ti-alert-triangle",
    title: "Clientes en Riesgo",
    desc: "Detecta automáticamente qué clientes están por dejar de comprar, antes de que pase.",
  },
  {
    icon: "ti-activity-heartbeat",
    title: "Score de Salud",
    desc: "Un puntaje claro por cliente que combina frecuencia, volumen y tendencia de compra.",
  },
  {
    icon: "ti-calendar-stats",
    title: "Próxima Compra Estimada",
    desc: "Predice cuándo va a volver a comprar cada cliente para anticipar la visita.",
  },
  {
    icon: "ti-category-2",
    title: "Segmentación Automática",
    desc: "Agrupa tu cartera por comportamiento real, sin tener que armar reglas a mano.",
  },
  {
    icon: "ti-route",
    title: "Densificación de Rutas",
    desc: "Encuentra clientes cercanos y desatendidos para aprovechar cada salida a campo.",
  },
  {
    icon: "ti-bulb",
    title: "Centro de Recomendaciones IA",
    desc: "Convierte todo lo anterior en acciones concretas, priorizadas por impacto.",
  },
];

export default function Features() {
  return (
    <section className="content" id="features">
      <p className="section-label">Distro Intelligence</p>
      <h2 className="section-title">Inteligencia aplicada a tu operación</h2>
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
