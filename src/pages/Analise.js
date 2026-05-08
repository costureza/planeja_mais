import { Link } from "react-router-dom";
import GastosPorCategoriaChart from "../charts/GastosPorCategoriaChart";

function Analise() {
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
    <main style={containerStyle}>
      <h1>Análise</h1>
      <p>Aqui você verá gráficos e estatísticas detalhadas.</p>
      <GastosPorCategoriaChart />
      <Link to="/" style={buttonStyle}>Voltar para Resumo</Link>
    </main>
  );
}

export default Analise;
