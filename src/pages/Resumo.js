import { Link } from "react-router-dom";
import { useFinanceiro } from "../context/FinanceiroContext";
import "../App.css"; // importa os estilos globais

function Resumo() {
  // Resumo consome apenas saldo e totais — visão geral rápida.
  const { saldo, totais, insights } = useFinanceiro();

  // Pega só o primeiro insight como destaque
  const destaqueInsight = insights.length > 0 ? insights[0] : null;

  return (
    <div className="page-container">
      <h1>Resumo</h1>
      <p>Visão geral do seu perfil financeiro.</p>

      <div style={{ margin: "20px 0", fontSize: "18px" }}>
        <p><strong>Receitas:</strong> R$ {totais.totalReceitas.toFixed(2)}</p>
        <p><strong>Despesas:</strong> R$ {totais.totalDespesas.toFixed(2)}</p>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>
          Saldo: R$ {saldo.toFixed(2)}
        </p>
      </div>

      {destaqueInsight && (
        <p style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: saldo < 0 ? "#fde8e8" : "#e8f5e9",
          color: saldo < 0 ? "#c0392b" : "#2e7d32",
          fontWeight: "bold",
        }}>
          {destaqueInsight.mensagem}
        </p>
      )}

      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <Link to="/analise" className="button-link">Meus Gastos</Link>
        <Link to="/planejamento" className="button-link">Agenda Financeira</Link>
        <Link to="/planejamento" className="button-link">Planejamento Financeiro</Link>
      </div>
    </div>
  );
}

export default Resumo;
