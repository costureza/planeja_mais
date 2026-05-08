import { Link } from "react-router-dom";

import { buscarProdutos } from "../services/consumoService";
import { consumoMock } from "../mocks/consumoMock";

function Analise() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const dados = await buscarProdutos();

      setProdutos(dados);
    }

    carregarProdutos();
  }, []);

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

  const insightColors = {
    alerta: "#e74c3c",
    aviso: "#f39c12",
    positivo: "#27ae60",
    info: "#2980b9",
  };

  return (
    <main style={containerStyle}>
      <h1>Análise</h1>

      <p>Aqui você verá gráficos e estatísticas detalhadas.</p>

      <h2>Consumo Mensal</h2>

      {consumoMock.map((item, index) => (
        <p key={index}>
          {item.categoria}: R$ {item.valor}
        </p>
      ))}

      <h2>Insight</h2>

      <p>
        Maior gasto: {maiorGasto.categoria} — R$ {maiorGasto.valor}
      </p>

      <h2>Produtos da API</h2>

      {produtos.slice(0, 5).map((produto) => (
        <div key={produto.id}>
          <p>{produto.title}</p>
        </div>
      ))}

      {/* Botão voltar */}
      <Link to="/" style={buttonStyle}>
        Voltar para Resumo
      </Link>
    </main>
  );
}

export default Analise;
