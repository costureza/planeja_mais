// src/context/PlanejamentoContext.js
import { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";

const PlanejamentoContext = createContext(null);

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

const LS_KEY = "planeja_mais_planejamento";

export function PlanejamentoProvider({ children }) {
  // Inicialização do estado a partir do localStorage
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : {
      categoriasSelecionadas: [],
      metasPorCategoria: {},
      metaMensal: 2500,
      planejamentoConcluido: false
    };
  });

  // Salva no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  const toggleCategoria = useCallback((categoriaId) => {
    setState(prev => ({
      ...prev,
      categoriasSelecionadas: prev.categoriasSelecionadas.includes(categoriaId)
        ? prev.categoriasSelecionadas.filter(id => id !== categoriaId)
        : [...prev.categoriasSelecionadas, categoriaId]
    }));
  }, []);

  const definirMetaCategoria = useCallback((categoria, valor) => {
    setState(prev => ({
      ...prev,
      metasPorCategoria: { ...prev.metasPorCategoria, [categoria]: valor }
    }));
  }, []);

  const setMetaMensal = useCallback((valor) => {
    setState(prev => ({ ...prev, metaMensal: valor }));
  }, []);

  const concluirPlanejamento = useCallback(() => {
    setState(prev => ({ ...prev, planejamentoConcluido: true }));
  }, []);

  const refazerPlanejamento = useCallback(() => {
    setState({
      categoriasSelecionadas: [],
      metasPorCategoria: {},
      metaMensal: 2500,
      planejamentoConcluido: false
    });
  }, []);

  const totalMetas = useMemo(() => 
    Object.values(state.metasPorCategoria).reduce((sum, v) => sum + v, 0),
    [state.metasPorCategoria]
  );

  const value = {
    ...state,
    totalMetas,
    toggleCategoria,
    definirMetaCategoria,
    setMetaMensal,
    concluirPlanejamento,
    refazerPlanejamento
  };

  return (
    <PlanejamentoContext.Provider value={value}>
      {children}
    </PlanejamentoContext.Provider>
  );
}

export function usePlanejamento() {
  const context = useContext(PlanejamentoContext);
  if (!context) {
    throw new Error("usePlanejamento deve ser usado dentro de <PlanejamentoProvider>");
  }
  return context;
}
