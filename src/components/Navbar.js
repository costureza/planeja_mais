import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#001f3f", // azul marinho
    color: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
  };

  const logoStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  const plusStyle = {
    color: "#FFD700", // amarelo dourado para o "+"
  };

  const linkStyle = {
    color: "#FFFFFF",
    textDecoration: "none",
    marginLeft: "15px",
    fontWeight: "bold",
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <span style={{ color: "#FFFFFF" }}>Planeja</span>
        <span style={plusStyle}>+</span>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Resumo</Link>
        <Link to="/analise" style={linkStyle}>Análise</Link>
        <Link to="/planejamento" style={linkStyle}>Planejamento</Link>
      </div>
    </nav>
  );
}

export default Navbar;









