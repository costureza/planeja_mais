import { Link } from "react-router-dom";
import "../App.css"; // importa os estilos globais

function Resumo() {
  return (
    <div className="page-container">
      <h1>Resumo</h1>
      <p>Visão geral do consumo inteligente.</p>

      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <Link to="/analise" className="button-link">Meus Gastos</Link>
        <Link to="/planejamento" className="button-link">Agenda Financeira</Link>
        <Link to="/planejamento" className="button-link">Planejamento Financeiro</Link>
      </div>
    </div>
  );
}

export default Resumo;
