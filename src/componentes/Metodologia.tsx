import estilos from "./Metodologia.module.css";

export function Metodologia() {
  return (
    <section id="metodologia" className={estilos.section}>
      <h3 className={estilos.title}>Metodologia</h3>
      <p className={estilos.description}>
        A metodologia aplicada envolveu pesquisa de campo com usuários, análise
        de problemas recorrentes em estacionamentos (como ocupação indevida de
        vagas PCD, sinalização insuficiente e congestionamento interno) e o
        desenvolvimento de um protótipo funcional integrado a banco de dados.
      </p>
      <ul className={estilos.list}>
        <li className={estilos.listItem}>Pesquisa de campo e entrevistas com usuários.</li>
        <li className={estilos.listItem}>Mapeamento de pontos críticos de circulação.</li>
        <li className={estilos.listItem}>
          Desenvolvimento de protótipo com sensores simulados e integração com
          banco de dados (modelo relacional/NoSQL).
        </li>
        <li className={estilos.listItem}>Testes de usabilidade e refinamento da interface.</li>
      </ul>
    </section>
  );
}