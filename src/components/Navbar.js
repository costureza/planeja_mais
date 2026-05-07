import { Link } from "react-router-dom";

function Navbar() {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#001f3f", // azul marinho
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "16px",
  };

  return (
    <nav style={navbarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <span style={{ color: "#FFFFFF" }}>Planeja</span>
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
