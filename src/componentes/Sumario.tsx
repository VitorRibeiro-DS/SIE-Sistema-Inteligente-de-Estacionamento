import estilos from "./Sumario.module.css";

export function Sumario() {
  return (
    <section id="sumario" className={estilos.section}>
      <div className={estilos.container}>
        <div>
          <h2 className={estilos.title}>
            Reduza tempo de busca. Melhore mobilidade.
          </h2>
          <p className={estilos.description}>
            O presente Trabalho de Conclusão de Curso apresenta um Sistema
            Inteligente de Estacionamento (SIE) para otimizar a ocupação de
            vagas, reduzir congestionamento e diminuir emissões. Sensores em
            cada vaga detectam ocupação em tempo real e uma aplicação exibe as
            vagas disponíveis — incluindo controle e visibilidade de vagas
            destinadas a Pessoas com Deficiência (PCD).
          </p>
          <div className={estilos.actions}>
            <a href="#metodologia" className={`${estilos.actionLink} ${estilos.primaryLink}`}>
              Metodologia
            </a>
            <a href="#resultados" className={`${estilos.actionLink} ${estilos.secondaryLink}`}>
              Resultados esperados
            </a>
          </div>
        </div>
        <div className={estilos.infoBox}>
          <h3 className={estilos.infoTitle}>
            Visão rápida do sistema
          </h3>
          <ul className={estilos.infoList}>
            <li className={estilos.infoListItem}>Sensores por vaga para monitoramento em tempo real.</li>
            <li className={estilos.infoListItem}>Aplicativo web para localização de vagas livres.</li>
            <li className={estilos.infoListItem}>Destaque e controle de vagas PCD.</li>
            <li className={estilos.infoListItem}>
              Proposta de integração com banco de dados e protótipo funcional.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
