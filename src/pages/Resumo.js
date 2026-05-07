import { Link } from "react-router-dom";

function Resumo() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#FFFFFF", // fundo branco
    color: "#001f3f", // azul marinho
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "15px", // espaço entre os botões
    marginTop: "20px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#001f3f", // fundo azul marinho (igual ao Navbar)
    color: "#FFFFFF", // fonte branca
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none", // remove sublinhado do Link
  };

  return (
    <div style={containerStyle}>
      <h1>Resumo</h1>
      <p>Visão geral do consumo inteligente.</p>

      <div style={buttonContainerStyle}>
        <Link to="/analise" style={buttonStyle}>Meus Gastos</Link>
        <Link to="/planejamento" style={buttonStyle}>Agenda Financeira</Link>
        <Link to="/planejamento" style={buttonStyle}>Planejamento Financeiro</Link>
      </div>
    </div>
  );
}

export default Resumo;









