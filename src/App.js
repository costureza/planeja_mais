import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlanejamentoProvider } from "./context/PlanejamentoContext";
import { FinanceiroProvider } from "./context/FinanceiroContext";
import Resumo from "./pages/Resumo";
import Analise from "./pages/Analise";
import Planejamento from "./pages/Planejamento";
import Navbar from "./components/Navbar";

function App() {
  return (
    <PlanejamentoProvider>
      <FinanceiroProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Resumo />} />
            <Route path="/analise" element={<Analise />} />
            <Route path="/planejamento" element={<Planejamento />} />
          </Routes>
        </Router>
      </FinanceiroProvider>
    </PlanejamentoProvider>
  );
}

export default App;
