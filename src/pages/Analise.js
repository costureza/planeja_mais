import React from "react";
import { Link } from "react-router-dom";
import GastosPorCategoriaChart from "../charts/GastosPorCategoriaChart";
import styles from "./Analise.module.scss";
import { useFinanceiro } from "../context/FinanceiroContext";
import { usePlanejamento } from "../context/PlanejamentoContext";

function Analise() {
  const { saldo, insights, padroes, gastosPorCategoria, agrupamentoPorMes, comparativoMetas } = useFinanceiro();
  const { planejamentoConcluido } = usePlanejamento();

  const maiorGastoEntry = Object.entries(gastosPorCategoria).sort(([, a], [, b]) => b - a)[0];
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
    <main className={styles.container}>
      <h1 className={styles.title}>Análise</h1>
      <p className={styles.subtitle}>Aqui você verá gráficos e estatísticas detalhadas.</p>

      {/* Gráfico */}
      <div className={styles.section}>
        <GastosPorCategoriaChart />
      </div>

      {/* Insight */}
      <div className={styles.section}>
        <h2>Insight</h2>
        <p>
          Maior gasto: {maiorGasto.categoria} — R$ {maiorGasto.valor}
        </p>
      </div>

      {/* Visão Mensal */}
      <div className={styles.section}>
        <h2>Visão Mensal</h2>
        {Object.entries(agrupamentoPorMes).map(([mes, valores]) => (
          <div key={mes} className={styles.mes}>
            <strong>{mes}</strong>
            <span>Rec: R$ {valores.receita.toFixed(2)} | Desp: R$ {valores.despesa.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Metas */}
      {planejamentoConcluido && (
        <div className={styles.section}>
          <h2>Acompanhamento de Metas</h2>
          {comparativoMetas.map((item) => (
            <div key={item.categoria} className={styles.meta}>
              <span>{item.categoria}</span>
              <span style={{ color: item.status === "estourou" ? "#e74c3c" : "#27ae60" }}>
                {item.status.toUpperCase()} (R$ {item.gastoReal.toFixed(2)} / R$ {item.meta.toFixed(2)})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Insights automáticos */}
      <div className={styles.section}>
        <h2>Insights Automáticos</h2>
        {insights.map((insight, i) => (
          <p key={i} style={{ color: insightColors[insight.tipo] || "#0b2040", fontWeight: "bold" }}>
            {insight.mensagem}
          </p>
        ))}
      </div>

      {/* Botão voltar */}
      <Link to="/resumo" className={styles.button}>
        Voltar para Resumo
      </Link>
    </main>
  );
}

export default Analise;
