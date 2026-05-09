import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useState } from "react";

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
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "25px 50px",
      backgroundColor: "#0b2040",
      color: "#e5f0ff",
      fontFamily: "Montserrat, Arial, sans-serif"
    }}>
      {/* Logo */}
      <div style={{ fontSize: "26px", fontWeight: "bold" }}>
        <span style={{ color: "#e5f0ff" }}>Planeja</span>
        <span style={{ color: "#FFD700" }}>+</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "40px", flex: 1, justifyContent: "center" }}>
        <Link to="/resumo" style={{ color: "#e5f0ff", textDecoration: "none" }}>Meus Gastos</Link>
        <Link to="/analise" style={{ color: "#e5f0ff", textDecoration: "none" }}>Agenda Financeira</Link>
        <Link to="/planejamento" style={{ color: "#e5f0ff", textDecoration: "none" }}>Planejamento</Link>
      </div>

      {/* Ícones à direita */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center", position: "relative" }}>
        {/* Sino com badge vermelho */}
        <div style={{ position: "relative" }}>
          <FaBell
            style={{ color: "#ffa500", fontSize: "24px", cursor: "pointer" }}
            title="Notificações"
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

        {/* Dropdown de notificações */}
        {mostrarNotificacoes && (
          <div style={{
            position: "absolute",
            top: "40px",
            right: "0",
            background: "#fff",
            color: "#000",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "10px",
            minWidth: "250px",
            zIndex: 1000
          }}>
            {notificacoes.length > 0 ? (
              notificacoes.map(n => (
                <div key={n.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  {n.mensagem}
                </div>
              ))
            ) : (
              <div style={{ padding: "8px" }}>Sem notificações</div>
            )}
          </div>
        )}

        {/* Avatar ou ícone de usuário */}
        {usuarioLogado?.avatar ? (
          <img src={usuarioLogado.avatar} alt="Avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #FFD700" }} />
        ) : (
          <FaUserCircle style={{ color: "#ffa500", fontSize: "24px" }} />
        )}

        {/* Nome e botão sair */}
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













