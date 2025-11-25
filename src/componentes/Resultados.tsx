import estilos from "./Resultados.module.css";

export function Resultados() {
  return (
    <section id="resultados" className={estilos.section}>
      <h3 className={estilos.title}>Resultados esperados</h3>
      <p className={estilos.description}>
        Espera-se que o SIE promova maior organização no uso de vagas, reduza o
        tempo médio de procura por vagas, minimize congestionamentos internos e
        contribua para a diminuição da emissão de gases poluentes devido à menor
        circulação desnecessária. Também se busca aumentar a fiscalização e a
        disponibilidade real das vagas destinadas a Pessoas com Deficiência
        (PCD), promovendo inclusão e equidade.
      </p>
      <div className={estilos.grid}>
        <div className={estilos.card}>
          <h4 className={estilos.cardTitle}>Sustentabilidade</h4>
          <p className={estilos.cardText}>
            Menos tempo procurando vaga = menos emissão de CO₂.
          </p>
        </div>
        <div className={estilos.card}>
          <h4 className={estilos.cardTitle}>Inclusão</h4>
          <p className={estilos.cardText}>
            Maior controle e visibilidade das vagas PCD.
          </p>
        </div>
        <div className={estilos.card}>
          <h4 className={estilos.cardTitle}>Eficiência</h4>
          <p className={estilos.cardText}>
            Melhor aproveitamento do espaço em estacionamentos de grande porte.
          </p>
        </div>
      </div>
    </section>
  );
}