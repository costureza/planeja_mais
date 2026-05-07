import { Link } from "react-router-dom";

function Planejamento() {
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
    backgroundColor: "#FFFFFF",
    color: "#001f3f",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#001f3f",
    color: "#FFFFFF",
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
