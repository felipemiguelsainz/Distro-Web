const industries = [
  "Distribuidoras",
  "Consumo masivo",
  "Laboratorios",
  "Seguros",
  "Bebidas",
  "Electrónica",
  "Logística",
  "Ferretería",
  "Materiales",
  "Tabaco",
  "Limpieza",
  "Cualquier fuerza de ventas",
];

export default function Industries() {
  return (
    <section
      className="content"
      id="industrias"
      style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}
    >
      <p className="section-label">Industrias</p>
      <h2 className="section-title">Funciona para cualquier equipo en campo</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {industries.map((name) => (
          <span className="ftag" key={name}>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
