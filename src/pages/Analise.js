import { Link } from "react-router-dom";
import GastosPorCategoriaChart from "../charts/GastosPorCategoriaChart";
import styles from "./Analise.module.scss"; // 🔑 importa o SCSS

// Exemplo de dados mockados
const consumoMock = [
  { categoria: "Alimentação", valor: 500 },
  { categoria: "Transporte", valor: 300 },
  { categoria: "Lazer", valor: 200 },
];

const produtos = [
  { id: 1, title: "Produto A" },
  { id: 2, title: "Produto B" },
  { id: 3, title: "Produto C" },
];

function Analise() {
  const maiorGasto = consumoMock.reduce((maior, atual) =>
    atual.valor > maior.valor ? atual : maior
  );

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Análise</h1>
      <p className={styles.subtitle}>Aqui você verá gráficos e estatísticas detalhadas.</p>

      {/* Gráfico */}
      <div className={styles.section}>
        <GastosPorCategoriaChart />
      </div>

      {/* Consumo Mensal */}
      <div className={styles.section}>
        <h2>Consumo Mensal</h2>
        {consumoMock.map((item, index) => (
          <p key={index}>
            {item.categoria}: R$ {item.valor}
          </p>
        ))}
      </div>

      {/* Insight */}
      <div className={styles.section}>
        <h2>Insight</h2>
        <p>
          Maior gasto: {maiorGasto.categoria} — R$ {maiorGasto.valor}
        </p>
      </div>

      {/* Produtos da API */}
      <div className={styles.section}>
        <h2>Produtos da API</h2>
        {produtos.slice(0, 5).map((produto) => (
          <div key={produto.id} className={styles.produto}>
            <p>{produto.title}</p>
          </div>
        ))}
      </div>

      {/* Botão voltar */}
      <Link to="/" className={styles.button}>
        Voltar para Resumo
      </Link>
    </main>
  );
}

export default Analise;

