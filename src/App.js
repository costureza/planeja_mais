import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanceiroProvider } from "./context/context";
import Resumo from "./pages/Resumo";
import Analise from "./pages/Analise";
import Planejamento from "./pages/Planejamento";
import Navbar from "./components/Navbar";

function App() {
  return (
    <FinanceiroProvider>
      <Router>
        {/* Navbar sempre visível */}
        <Navbar />

        {/* Rotas principais */}
        <Routes>
          <Route path="/" element={<Resumo />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/planejamento" element={<Planejamento />} />
        </Routes>
      </Router>
    </FinanceiroProvider>
  );
}

export default App;
