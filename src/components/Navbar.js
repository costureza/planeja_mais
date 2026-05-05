import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    padding: "15px",
    backgroundColor: "#001f3f", // azul marinho
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle = {
    color: "#FFA500", // laranja suave
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Arial, sans-serif",
    marginLeft: "20px",
  };

  const linksContainerStyle = {
    display: "flex",
    gap: "20px",
    marginRight: "20px",
  };

  const linkStyle = {
    color: "#FFFFFF", // branco
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Planeja+</div>
      <div style={linksContainerStyle}>
        <Link to="/" style={linkStyle}>Resumo</Link>
        <Link to="/analise" style={linkStyle}>Análise</Link>
        <Link to="/planejamento" style={linkStyle}>Planejamento</Link>
      </div>
    </nav>
  );
}

export default Navbar;







