// src/context/context.js
// Single Source of Truth — dados brutos + derivados + metas/orçamento
import { createContext, useContext, useCallback, useMemo, useState } from "react";
import { transacoesMock } from "../mocks/consumoMock";

const FinanceiroContext = createContext(null);

// --- CATEGORIAS DISPONÍVEIS para o wizard de planejamento ---
export const CATEGORIAS_DISPONIVEIS = [
  { id: "casa",                nome: "Casa",                icone: "🏠" },
  { id: "educacao",            nome: "Educação",            icone: "📚" },
  { id: "lazer",               nome: "Lazer",               icone: "🎮" },
  { id: "saude",               nome: "Saúde",               icone: "❤️" },
  { id: "transporte",          nome: "Transporte",          icone: "🚗" },
  { id: "despesas_pessoais",   nome: "Despesas pessoais",   icone: "🏡" },
  { id: "alimentacao",         nome: "Alimentação",         icone: "🍽️" },
  { id: "streaming",           nome: "Streaming",           icone: "📺" },
  { id: "restaurante",         nome: "Restaurante",         icone: "🍴" },
  { id: "viagem",              nome: "Viagem",              icone: "✈️" },
];

// --- CAMADA 2: Motor de Insights (funções puras) ---

function calcularTotais(transacoes) {
  return transacoes.reduce(
    (acc, t) => {
      if (t.tipo === "receita") acc.totalReceitas += t.valor;
      if (t.tipo === "despesa") acc.totalDespesas += t.valor;
      return acc;
    },
    { totalReceitas: 0, totalDespesas: 0 }
  );
}

function calcularSaldo(totais) {
  return totais.totalReceitas - totais.totalDespesas;
}

function agruparPorCategoria(transacoes) {
  return transacoes
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
      return acc;
    }, {});
}

function detectarPadroes(transacoes) {
  const recorrentes = transacoes.filter((t) => t.recorrente && t.tipo === "despesa");
  const sazonais = transacoes.filter((t) => !t.recorrente && t.tipo === "despesa");

  return {
    gastoFixoTotal: recorrentes.reduce((sum, t) => sum + t.valor, 0),
    gastoSazonalTotal: sazonais.reduce((sum, t) => sum + t.valor, 0),
    recorrentes,
    sazonais,
  };
}

function gerarInsights(saldo, padroes, gastosPorCategoria) {
  const insights = [];

  if (saldo < 0) {
    insights.push({ tipo: "alerta", mensagem: "Saldo negativo! Suas despesas superam sua receita." });
  } else if (saldo < 500) {
    insights.push({ tipo: "aviso", mensagem: "Saldo baixo. Considere reduzir gastos sazonais." });
  } else {
    insights.push({ tipo: "positivo", mensagem: `Seus gastos sob controle!` });
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

// Compara gastos reais vs metas definidas pelo usuário
function compararMetasVsReal(gastosPorCategoria, metasPorCategoria) {
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

// --- CAMADA 3: Provider ---
export function FinanceiroProvider({ children }) {
  // Estado bruto
  const [transacoes, setTransacoes] = useState(transacoesMock);

  // Estado do planejamento (wizard)
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [metasPorCategoria, setMetasPorCategoria] = useState({});
  const [metaMensal, setMetaMensal] = useState(2500);
  const [planejamentoConcluido, setPlanejamentoConcluido] = useState(false);

  // Dados derivados (memoizados)
  const totais = useMemo(() => calcularTotais(transacoes), [transacoes]);
  const saldo = useMemo(() => calcularSaldo(totais), [totais]);
  const gastosPorCategoria = useMemo(() => agruparPorCategoria(transacoes), [transacoes]);
  const padroes = useMemo(() => detectarPadroes(transacoes), [transacoes]);
  const insights = useMemo(
    () => gerarInsights(saldo, padroes, gastosPorCategoria),
    [saldo, padroes, gastosPorCategoria]
  );
  const comparativoMetas = useMemo(
    () => compararMetasVsReal(gastosPorCategoria, metasPorCategoria),
    [gastosPorCategoria, metasPorCategoria]
  );
  const totalMetas = useMemo(
    () => Object.values(metasPorCategoria).reduce((sum, v) => sum + v, 0),
    [metasPorCategoria]
  );

  // --- Ações ---
  const adicionarTransacao = useCallback((novaTransacao) => {
    setTransacoes((prev) => [...prev, { id: Date.now(), ...novaTransacao }]);
  }, []);

  const toggleCategoria = useCallback((categoriaId) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    );
  }, []);

  const definirMetaCategoria = useCallback((categoria, valor) => {
    setMetasPorCategoria((prev) => ({ ...prev, [categoria]: valor }));
  }, []);

  const concluirPlanejamento = useCallback(() => {
    setPlanejamentoConcluido(true);
  }, []);

  const refazerPlanejamento = useCallback(() => {
    setPlanejamentoConcluido(false);
    setCategoriasSelecionadas([]);
    setMetasPorCategoria({});
  }, []);

  const value = {
    // Dados brutos
    transacoes,
    // Dados derivados
    totais,
    saldo,
    gastosPorCategoria,
    padroes,
    insights,
    comparativoMetas,
    totalMetas,
    // Estado do planejamento
    categoriasSelecionadas,
    metasPorCategoria,
    metaMensal,
    planejamentoConcluido,
    // Ações
    adicionarTransacao,
    toggleCategoria,
    definirMetaCategoria,
    setMetaMensal,
    concluirPlanejamento,
    refazerPlanejamento,
  };

  return (
    <FinanceiroContext.Provider value={value}>
      {children}
    </FinanceiroContext.Provider>
  );
}

// --- CAMADA 4: Hook customizado ---
export function useFinanceiro() {
  const context = useContext(FinanceiroContext);
  if (!context) {
    throw new Error("useFinanceiro deve ser usado dentro de <FinanceiroProvider>");
  }
  return context;
}
