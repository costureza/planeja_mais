import React, { useState } from "react";
import { Link } from "react-router-dom";
import GastosPorCategoriaChart from "../charts/GastosPorCategoriaChart";
import styles from "./Analise.module.scss";
import { useFinanceiro } from "../context/FinanceiroContext";
import { usePlanejamento } from "../context/PlanejamentoContext";

function Analise() {
  const { saldo, insights, gastosPorCategoria, agrupamentoPorMes, comparativoMetas } = useFinanceiro();
  const { planejamentoConcluido } = usePlanejamento();

  // Estados locais para edição
  const [visaoMensal, setVisaoMensal] = useState(agrupamentoPorMes);
  const [insightsEditaveis, setInsightsEditaveis] = useState(insights);

  const handleInsightChange = (index, value) => {
    const novos = [...insightsEditaveis];
    novos[index].mensagem = value;
    setInsightsEditaveis(novos);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Análise Financeira</h1>
      <p className={styles.subtitle}>Painel com gráficos, categorias e metas.</p>

      {/* Gráfico principal */}
      <div className={styles.section}>
        <h2>Distribuição de Gastos</h2>
        <GastosPorCategoriaChart />
      </div>

      {/* Cards organizados por categoria */}
      <div className={styles.cardsRow}>
        {/* Saldo Atual */}
        <div className={styles.card}>
          <h3>Saldo Atual</h3>
          <p className={styles.value}>R$ {saldo.toFixed(2)}</p>
        </div>

        {/* Maior gasto */}
        <div className={styles.card}>
          <h3>Maior Gasto</h3>
          {Object.entries(gastosPorCategoria).length > 0 ? (
            <p>
              {Object.entries(gastosPorCategoria).sort(([, a], [, b]) => b - a)[0][0]} — R${" "}
              {Object.entries(gastosPorCategoria).sort(([, a], [, b]) => b - a)[0][1].toFixed(2)}
            </p>
          ) : (
            <p>Nenhum gasto registrado</p>
          )}
        </div>

        {/* Insights */}
        <div className={styles.card}>
          <h3>Insights</h3>
          {insightsEditaveis.map((insight, i) => (
            <input
              key={i}
              type="text"
              value={insight.mensagem}
              onChange={(e) => handleInsightChange(i, e.target.value)}
              className={styles.input}
            />
          ))}
        </div>
      </div>

      {/* Visão mensal */}
      <div className={styles.section}>
        <h2>Visão Mensal</h2>
        <div className={styles.mensalBox}>
          {Object.entries(visaoMensal).map(([mes, valores]) => (
            <div key={mes} className={styles.mensalItem}>
              <strong>{mes}</strong>
              <div className={styles.inputsRow}>
                <label>
                  Receita:
                  <input
                    type="number"
                    value={valores.receita}
                    onChange={(e) =>
                      setVisaoMensal({
                        ...visaoMensal,
                        [mes]: { ...valores, receita: parseFloat(e.target.value) },
                      })
                    }
                    className={styles.input}
                  />
                </label>
                <label>
                  Despesa:
                  <input
                    type="number"
                    value={valores.despesa}
                    onChange={(e) =>
                      setVisaoMensal({
                        ...visaoMensal,
                        [mes]: { ...valores, despesa: parseFloat(e.target.value) },
                      })
                    }
                    className={styles.input}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metas */}
      {planejamentoConcluido && (
        <div className={styles.section}>
          <h2>Acompanhamento de Metas</h2>
          {comparativoMetas.map((item) => (
            <div key={item.categoria} className={styles.metaItem}>
              <span>{item.categoria}</span>
              <span style={{ color: item.status === "estourou" ? "#e74c3c" : "#27ae60" }}>
                {item.status.toUpperCase()} (R$ {item.gastoReal.toFixed(2)} / R$ {item.meta.toFixed(2)})
              </span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min((item.gastoReal / item.meta) * 100, 100)}%`,
                    backgroundColor: item.status === "estourou" ? "#e74c3c" : "#27ae60",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão voltar */}
      <Link to="/resumo" className={styles.button}>
        ← Voltar para Resumo
      </Link>
    </main>
  );
}

export default Analise;


