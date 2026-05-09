import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useState } from "react";
import styles from "./Navbar.module.scss";

function Navbar() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const notificacoes = JSON.parse(localStorage.getItem("notificacoes")) || [];
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span style={{ color: "#e5f0ff" }}>planeja</span>
        <span style={{ color: "#FFD700" }}>+</span>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link to="/resumo" className={styles.link}>Meus Gastos</Link>
        <Link to="/analise" className={styles.link}>Agenda Financeira</Link>
        <Link to="/planejamento" className={styles.link}>Planejamento</Link>
      </div>

      {/* Ícones à direita */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", position: "relative" }}>
        {/* Sino */}
        <div style={{ position: "relative" }}>
          <FaBell
            style={{ color: "#ffa500", fontSize: "24px", cursor: "pointer" }}
            onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
          />
          {notificacoes.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              fontSize: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>
              {notificacoes.length}
            </span>
          )}
        </div>

        {/* Avatar */}
        {usuarioLogado?.avatar ? (
          <img src={usuarioLogado.avatar} alt="Avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #FFD700" }} />
        ) : (
          <FaUserCircle style={{ color: "#ffa500", fontSize: "24px" }} />
        )}

        {/* Nome e sair */}
        {usuarioLogado && (
          <>
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>{usuarioLogado.nome}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "#FFD700",
                cursor: "pointer",
                marginLeft: "10px",
                fontWeight: "bold"
              }}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;














