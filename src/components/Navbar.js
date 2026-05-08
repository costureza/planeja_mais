import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0b2040", // azul marinho mais escuro
    color: "#e5f0ff",           // tom claro para contraste
    fontFamily: "Montserrat, Arial, sans-serif",
  };

  const logoStyle = {
    fontSize: "22px",
    fontWeight: "bold",
  };

  const plusStyle = {
    color: "#FFD700", // amarelo dourado para o "+"
  };

  const linksContainerStyle = {
    display: "flex",
    gap: "20px",
  };

  const linkStyle = {
    color: "#e5f0ff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  };

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <span style={{ color: "#e5f0ff" }}>Planeja</span>
        <span style={plusStyle}>+</span>
      </div>

      {/* Links */}
      <div style={linksContainerStyle}>
        <Link to="/" style={linkStyle}>Resumo</Link>
        <Link to="/analise" style={linkStyle}>Análise</Link>
        <Link to="/planejamento" style={linkStyle}>Planejamento</Link>
      </div>
    </nav>
  );
}

export default Navbar;
