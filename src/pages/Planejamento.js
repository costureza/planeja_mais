import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanejamento, CATEGORIAS_DISPONIVEIS } from "../context/PlanejamentoContext";
import { useFinanceiro } from "../context/FinanceiroContext";
import "../App.css";

function Planejamento() {
  const {
    categoriasSelecionadas,
    metasPorCategoria,
    metaMensal,
    toggleCategoria,
    definirMetaCategoria,
    setMetaMensal,
    concluirPlanejamento,
    refazerPlanejamento,
    planejamentoConcluido,
    totalMetas,
  } = usePlanejamento();

  const { padroes, saldo } = useFinanceiro();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  function handleConcluir() {
    concluirPlanejamento();
    navigate("/analise");
  }

  const categoriasFiltradas = CATEGORIAS_DISPONIVEIS.filter((c) =>
    categoriasSelecionadas.includes(c.id)
  );

  // Simulação de economia (baseada em dados reais do FinanceiroContext)
  const economiaSimulada = padroes.gastoSazonalTotal * 0.5;
  const saldoSimulado = saldo + economiaSimulada;

  if (!planejamentoConcluido && step === 1) {
    return (
      <div className="page-container">
        <h1>Planejamento</h1>
        <h2>Quais são seus gastos?</h2>
        <p>Selecione as categorias que deseja monitorar:</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "20px 0" }}>
          {CATEGORIAS_DISPONIVEIS.map((cat) => (
            <label key={cat.id} style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={categoriasSelecionadas.includes(cat.id)}
                onChange={() => toggleCategoria(cat.id)}
              />
              {cat.icone} {cat.nome}
            </label>
          ))}
        </div>

        <button className="button-link" onClick={() => setStep(2)} disabled={categoriasSelecionadas.length === 0}>
          Continuar
        </button>
      </div>
    );
  }

  if (!planejamentoConcluido && step === 2) {
    return (
      <div className="page-container">
        <h1>Planejamento</h1>
        <h2>Defina seus limites</h2>
        
        {categoriasFiltradas.map((cat) => (
          <div key={cat.id} style={{ margin: "10px 0", textAlign: "left", width: "100%", maxWidth: "300px" }}>
            <label>{cat.icone} {cat.nome}</label>
            <input
              type="number"
              value={metasPorCategoria[cat.nome] || ""}
              onChange={(e) => definirMetaCategoria(cat.nome, Number(e.target.value))}
              placeholder="R$ 0,00"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
        ))}

        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <p>Total das metas: <strong>R$ {totalMetas.toFixed(2)}</strong></p>
          <label>Meta Mensal Global:</label>
          <input
            type="number"
            value={metaMensal}
            onChange={(e) => setMetaMensal(Number(e.target.value))}
            style={{ padding: "8px", marginLeft: "10px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="button-link" onClick={() => setStep(1)} style={{ backgroundColor: "#555" }}>Voltar</button>
          <button className="button-link" onClick={handleConcluir}>Concluir</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Seu Planejamento</h1>
      <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
        <h3>Simulação de Economia</h3>
        <p>Se você reduzir 50% dos gastos sazonais, economizará: <strong>R$ {economiaSimulada.toFixed(2)}</strong></p>
        <p>Seu saldo saltaria de R$ {saldo.toFixed(2)} para <strong>R$ {saldoSimulado.toFixed(2)}</strong>!</p>
      </div>

      <button className="button-link" onClick={refazerPlanejamento}>Refazer Planejamento</button>
    </div>
  );
}

export default Planejamento;
