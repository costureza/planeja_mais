// src/context/FinanceiroContext.js
import { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";
import { transacoesMock } from "../mocks/consumoMock";
import * as logic from "./financeiroLogic";
import { usePlanejamento } from "./PlanejamentoContext";

const FinanceiroContext = createContext(null);

const LS_KEY = "planeja_mais_transacoes";

export function FinanceiroProvider({ children }) {
  // Planejamento é necessário para o comparativo de metas
  const { metasPorCategoria } = usePlanejamento();

  // Inicialização do estado a partir do localStorage ou mock
  const [transacoes, setTransacoes] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : transacoesMock;
  });

  // Salva no localStorage sempre que as transações mudarem
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(transacoes));
  }, [transacoes]);

  // Dados derivados (memoizados usando as funções puras)
  const totais = useMemo(() => logic.calcularTotais(transacoes), [transacoes]);
  const saldo = useMemo(() => logic.calcularSaldo(totais), [totais]);
  const gastosPorCategoria = useMemo(() => logic.agruparPorCategoria(transacoes), [transacoes]);
  const padroes = useMemo(() => logic.detectarPadroes(transacoes), [transacoes]);
  const insights = useMemo(
    () => logic.gerarInsights(saldo, padroes, gastosPorCategoria),
    [saldo, padroes, gastosPorCategoria]
  );
  
  // Novo: Agrupamento por mês
  const agrupamentoPorMes = useMemo(() => logic.agruparPorMes(transacoes), [transacoes]);

  // Comparativo de metas (ponte entre os dois contextos)
  const comparativoMetas = useMemo(
    () => logic.compararMetasVsReal(gastosPorCategoria, metasPorCategoria),
    [gastosPorCategoria, metasPorCategoria]
  );

  const adicionarTransacao = useCallback((novaTransacao) => {
    setTransacoes((prev) => [...prev, { id: Date.now(), ...novaTransacao }]);
  }, []);

  const value = {
    transacoes,
    totais,
    saldo,
    gastosPorCategoria,
    padroes,
    insights,
    agrupamentoPorMes,
    comparativoMetas,
    adicionarTransacao
  };

  return (
    <FinanceiroContext.Provider value={value}>
      {children}
    </FinanceiroContext.Provider>
  );
}

export function useFinanceiro() {
  const context = useContext(FinanceiroContext);
  if (!context) {
    throw new Error("useFinanceiro deve ser usado dentro de <FinanceiroProvider>");
  }
  return context;
}
