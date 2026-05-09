import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Planejamento.module.scss";

function Planejamento() {
  const categoriasIniciais = [
    { nome: "🍽️ Alimentação", valor: "" },
    { nome: "🧍 Despesas pessoais", valor: "" },
    { nome: "🚗 Transporte", valor: "" },
  ];

  const [categorias, setCategorias] = useState(categoriasIniciais);
  const metaMensal = 2500;

  const handleValorChange = (index, novoValor) => {
    const novasCategorias = [...categorias];
    novasCategorias[index].valor = novoValor;
    setCategorias(novasCategorias);
  };

  const handleNomeChange = (index, novoNome) => {
    const novasCategorias = [...categorias];
    novasCategorias[index].nome = novoNome;
    setCategorias(novasCategorias);
  };

  const adicionarCategoria = () => {
    if (categorias.length < 10) {
      setCategorias([...categorias, { nome: "", valor: "" }]); // nova categoria começa vazia
    } else {
      alert("Você só pode adicionar até 10 categorias.");
    }
  };

  const removerCategoria = () => {
    if (categorias.length > categoriasIniciais.length) {
      setCategorias(categorias.slice(0, -1));
    }
  };

  const concluirSimulacao = () => {
    setCategorias(categoriasIniciais);
  };

  const total = categorias.reduce((acc, cat) => acc + (parseFloat(cat.valor) || 0), 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Planejar minhas finanças</h1>
      <p className={styles.subtitle}>
        <strong>Defina os limites de gastos para cada categoria.</strong>
      </p>
      <p className={styles.description}>
        Selecione uma categoria e defina os valores das subcategorias relacionadas
      </p>

      {categorias.map((cat, index) => (
        <div key={index} className={styles.item}>
          {/* Categorias iniciais → nome fixo */}
          {index < categoriasIniciais.length ? (
            <span className={styles.label}>{cat.nome}</span>
          ) : (
            /* Nova categoria → nome editável */
            <input
              type="text"
              value={cat.nome}
              onChange={(e) => handleNomeChange(index, e.target.value)}
              className={styles.inputNome}
              placeholder="Nome da categoria"
            />
          )}

          {/* Campo de valor (sempre editável) */}
          <input
            type="number"
            value={cat.valor}
            onChange={(e) => handleValorChange(index, e.target.value)}
            className={styles.inputValor}
            placeholder="Digite o valor"
          />
        </div>
      ))}

      <div className={styles.item}>
        <span className={styles.label}>💰 Total</span>
        <span className={styles.value}>R$ {total.toFixed(2)}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>🎯 Meta mensal de gastos</span>
        <span className={styles.value}>R$ {metaMensal.toFixed(2)}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={adicionarCategoria} className={styles.addButton}>
          Adicionar categoria
        </button>
        <button onClick={removerCategoria} className={styles.removeButton}>
          Excluir categoria
        </button>
        <button onClick={concluirSimulacao} className={styles.concluir}>
          Concluir
        </button>
      </div>

      <Link to="/" className={styles.voltar}>
        Voltar para Resumo
      </Link>
    </div>
  );
}

export default Planejamento;





