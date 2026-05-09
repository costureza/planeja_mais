import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./pages/Register";
import { PlanejamentoProvider } from "./context/PlanejamentoContext";
import { FinanceiroProvider } from "./context/FinanceiroContext";
import Resumo from "./pages/Resumo";
import Analise from "./pages/Analise";
import Planejamento from "./pages/Planejamento";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";

function App() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // 🔔 Simulação de notificações (salvas no localStorage)
  const notificacoesExistentes = JSON.parse(localStorage.getItem("notificacoes")) || [];
  if (notificacoesExistentes.length === 0) {
    const notificacoes = [
      { id: 1, mensagem: "Pagamento vence amanhã" },
      { id: 2, mensagem: "Nova meta de gastos disponível" },
      { id: 3, mensagem: "Você gastou 80% do orçamento" },
    ];
    localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
  }

  return (
    <PlanejamentoProvider>
      <FinanceiroProvider>
        <Router>
          <ConditionalNavbar />
          <Routes>
            {/* 🔑 Rota inicial: se não estiver logado → login */}
            <Route
              path="/"
              element={usuarioLogado ? <Navigate to="/resumo" /> : <Navigate to="/login" />}
            />

            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Rotas protegidas */}
            <Route
              path="/resumo"
              element={usuarioLogado ? <Resumo /> : <Navigate to="/login" />}
            />
            <Route
              path="/analise"
              element={usuarioLogado ? <Analise /> : <Navigate to="/login" />}
            />
            <Route
              path="/planejamento"
              element={usuarioLogado ? <Planejamento /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      </FinanceiroProvider>
    </PlanejamentoProvider>
  );
}

// 🔒 Navbar só aparece fora das rotas públicas
function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  return !hideNavbar ? <Navbar /> : null;
}

export default App;

