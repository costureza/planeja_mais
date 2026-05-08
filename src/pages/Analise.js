import React from "react";
import { Link } from "react-router-dom";
import { useFinanceiro } from "../context/FinanceiroContext";
import { usePlanejamento } from "../context/PlanejamentoContext";
import "../App.css";

function Analise() {
  const { 
    saldo, 
    insights, 
    padroes, 
    gastosPorCategoria, 
    agrupamentoPorMes, 
    comparativoMetas 
  } = useFinanceiro();

  const { planejamentoConcluido } = usePlanejamento();

  const maiorGastoEntry = Object.entries(gastosPorCategoria)
    .sort(([, a], [, b]) => b - a)[0];

  const maiorGasto = maiorGastoEntry 
    ? { categoria: maiorGastoEntry[0], valor: maiorGastoEntry[1] }
    : { categoria: "Nenhuma", valor: 0 };

  const insightColors = {
    alerta: "#e74c3c",
    aviso: "#f39c12",
    positivo: "#27ae60",
    info: "#2980b9",
  };

  return (
    <main className="page-container">
      <h1>Análise Detalhada</h1>

      <section style={{ width: "100%", maxWidth: "600px", margin: "20px 0" }}>
        <h2>Saldo Atual: R$ {saldo.toFixed(2)}</h2>
        
        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
          <div className="card">
            <h3>Fixos</h3>
            <p>R$ {padroes.gastoFixoTotal.toFixed(2)}</p>
          </div>
          <div className="card">
            <h3>Sazonais</h3>
            <p>R$ {padroes.gastoSazonalTotal.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section style={{ width: "100%", maxWidth: "600px" }}>
        <h2>Visão Mensal</h2>
        <div style={{ backgroundColor: "#f0f7ff", padding: "15px", borderRadius: "8px" }}>
          {Object.entries(agrupamentoPorMes).map(([mes, valores]) => (
            <div key={mes} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", padding: "5px 0" }}>
              <strong>{mes}</strong>
              <span>Rec: R$ {valores.receita.toFixed(2)} | Desp: R$ {valores.despesa.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {planejamentoConcluido && (
        <section style={{ width: "100%", maxWidth: "600px", marginTop: "30px" }}>
          <h2>Acompanhamento de Metas</h2>
          {comparativoMetas.map((item) => (
            <div key={item.categoria} style={{ textAlign: "left", margin: "10px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.categoria}</span>
                <span style={{ color: item.status === "estourou" ? "#e74c3c" : "#27ae60" }}>
                  {item.status.toUpperCase()} (R$ {item.gastoReal.toFixed(2)} / R$ {item.meta.toFixed(2)})
                </span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eee", borderRadius: "5px", overflow: "hidden" }}>
                <div style={{ 
                  width: `${Math.min((item.gastoReal / item.meta) * 100, 100)}%`, 
                  height: "100%", 
                  backgroundColor: item.status === "estourou" ? "#e74c3c" : "#27ae60" 
                }} />
              </div>
            </div>
          ))}
        </section>
      )}

      <section style={{ width: "100%", maxWidth: "600px", marginTop: "30px" }}>
        <h2>Insights Automáticos</h2>
        {insights.map((insight, i) => (
          <p key={i} style={{ color: insightColors[insight.tipo] || "#0b2040", fontWeight: "bold" }}>
            {insight.mensagem}
          </p>
        ))}
      </section>

      <Link to="/" className="button-link">Voltar para Resumo</Link>
    </main>
  );
}

export default Analise;
