// src/context/financeiroLogic.js

export function calcularTotais(transacoes) {
  return transacoes.reduce(
    (acc, t) => {
      if (t.tipo === "receita") acc.totalReceitas += t.valor;
      if (t.tipo === "despesa") acc.totalDespesas += t.valor;
      return acc;
    },
    { totalReceitas: 0, totalDespesas: 0 }
  );
}

export function calcularSaldo(totais) {
  return totais.totalReceitas - totais.totalDespesas;
}

export function agruparPorCategoria(transacoes) {
  return transacoes
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
      return acc;
    }, {});
}

export function detectarPadroes(transacoes) {
  const despesas = transacoes.filter((t) => t.tipo === "despesa");
  const recorrentes = despesas.filter((t) => t.recorrente);
  const sazonais = despesas.filter((t) => !t.recorrente);

  return {
    gastoFixoTotal: recorrentes.reduce((sum, t) => sum + t.valor, 0),
    gastoSazonalTotal: sazonais.reduce((sum, t) => sum + t.valor, 0),
    recorrentes,
    sazonais,
  };
}

export function gerarInsights(saldo, padroes, gastosPorCategoria) {
  const insights = [];

  if (saldo < 0) {
    insights.push({ tipo: "alerta", mensagem: "Saldo negativo! Suas despesas superam sua receita." });
  } else if (saldo < 500) {
    insights.push({ tipo: "aviso", mensagem: "Saldo baixo. Considere reduzir gastos sazonais." });
  } else {
    insights.push({ tipo: "positivo", mensagem: "Seus gastos sob controle!" });
  }

  const totalGasto = padroes.gastoFixoTotal + padroes.gastoSazonalTotal;
  if (totalGasto > 0) {
    const percentualFixo = padroes.gastoFixoTotal / totalGasto;
    if (percentualFixo > 0.7) {
      insights.push({ tipo: "aviso", mensagem: "Mais de 70% dos seus gastos são fixos. Revise contratos e assinaturas." });
    }
  }

  const entries = Object.entries(gastosPorCategoria);
  if (entries.length > 0) {
    const [categoriaDominante, valorDominante] = entries.sort(([, a], [, b]) => b - a)[0];
    insights.push({
      tipo: "info",
      mensagem: `"${categoriaDominante}" é seu maior gasto: R$ ${valorDominante.toFixed(2)}.`,
    });
  }

  return insights;
}

export function compararMetasVsReal(gastosPorCategoria, metasPorCategoria) {
  return Object.entries(metasPorCategoria).map(([categoria, meta]) => {
    const gastoReal = gastosPorCategoria[categoria] || 0;
    const diferenca = meta - gastoReal;
    const status = diferenca >= 0 ? "dentro" : "estourou";

    return {
      categoria,
      meta,
      gastoReal,
      diferenca: Math.abs(diferenca),
      status,
    };
  });
}

/**
 * Agrupa totais de receita e despesa por mês/ano.
 * Entrada: transacoes[]
 * Saída: { "2025-04": { receita: 4500, despesa: 1850 }, ... }
 */
export function agruparPorMes(transacoes) {
  return transacoes.reduce((acc, t) => {
    // Pega o YYYY-MM da data "2025-04-05"
    const mesAno = t.data.substring(0, 7);
    
    if (!acc[mesAno]) {
      acc[mesAno] = { receita: 0, despesa: 0 };
    }
    
    if (t.tipo === "receita") acc[mesAno].receita += t.valor;
    if (t.tipo === "despesa") acc[mesAno].despesa += t.valor;
    
    return acc;
  }, {});
}
