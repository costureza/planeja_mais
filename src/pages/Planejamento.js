import { Link } from "react-router-dom";

function Planejamento() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#FFFFFF",
    color: "#001f3f",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#001f3f", // azul marinho igual ao Navbar
    color: "#FFFFFF", // fonte branca
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Planejamento</h1>
      <p>Aqui você terá dicas e planos para consumir melhor.</p>

      <Link to="/" style={buttonStyle}>Voltar para Resumo</Link>
    </div>
  );
}

export default Planejamento;





