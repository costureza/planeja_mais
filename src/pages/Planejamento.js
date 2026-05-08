import { Link } from "react-router-dom";
import { useFinanceiro } from "../context/context";

function Planejamento() {
  // Planejamento consome padrões e insights para orientar o usuário.
  const { padroes, saldo, insights } = useFinanceiro();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    paddingTop: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
    textAlign: "center",
    fontFamily: "Montserrat, Arial, sans-serif",
    backgroundColor: "#e5f0ff", // fundo claro
    color: "#0b2040",           // azul escuro para contraste
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#001f3f", // azul marinho
    color: "#FFFFFF",           // texto branco
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
  };

  // Calcula quanto sobra se cortar gastos sazonais pela metade
  const economiaSimulada = padroes.gastoSazonalTotal * 0.5;
  const saldoSimulado = saldo + economiaSimulada;

  return (
    <div style={containerStyle}>
      <h1>Planejamento</h1>
      <p>Aqui você terá dicas e planos para consumir melhor.</p>

      <h2>Simulação: Corte 50% dos gastos sazonais</h2>
      <p>Economia potencial: <strong>R$ {economiaSimulada.toFixed(2)}</strong></p>
      <p>Saldo projetado: <strong>R$ {saldoSimulado.toFixed(2)}</strong></p>

      <h2>Todos os Insights</h2>
      {insights.map((insight, i) => (
        <p key={i}>
          [{insight.tipo.toUpperCase()}] {insight.mensagem}
        </p>
      ))}

      <Link to="/" style={buttonStyle}>Voltar para Resumo</Link>
    </div>
  );
}

export default Planejamento;
