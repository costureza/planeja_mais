import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Resumo.module.scss";

function Resumo() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [mostrarAnalise, setMostrarAnalise] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const gastosSalvos = JSON.parse(localStorage.getItem("gastos")) || [];
    setGastos(gastosSalvos);

    const soma = gastosSalvos.reduce((acc, g) => acc + (parseFloat(g.valor) || 0), 0);
    setTotal(soma);
  }, []);

  return (
    <div className={styles.container}>
      {/* Caixa de boas-vindas */}
      <div className={styles.box}>
        {/* Lado esquerdo */}
        <div className={styles.left}>
          <h2 className={styles.highlight}>Confira seus gastos</h2>
          <p>Seus gastos subiram</p>
          <div className={styles.percent}>
            <span>0,5%</span>
            <svg
              className={styles.arrow}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 17 9 11 15 15 21 9" />
              <polyline points="21 9 21 15 15 15" />
            </svg>
            <span className={styles.month}>este mês</span>
          </div>
        </div>

        {/* Lado direito */}
        <div className={styles.right}>
          <p className={styles.welcome}>
            <strong>
              Bem-vinda, <span className={styles.name}>{usuarioLogado?.nome}</span>
            </strong>
          </p>
          {/* ❌ Removido o bloco de total de gastos daqui */}
          <button
            className={styles.analiseButton}
            onClick={() => setMostrarAnalise(!mostrarAnalise)}
          >
            ANÁLISE
          </button>
        </div>
      </div>

      {/* Cards de gastos mensais só aparecem ao clicar */}
      {mostrarAnalise && (
        <div className={styles.cardsSection}>
          <h2 className={styles.cardsTitle}>Gastos cadastrados</h2>
          <div className={styles.cards}>
            {gastos.length > 0 ? (
              gastos.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.iconCircle}>
                    <span className={styles.icon}>{item.categoria || "💸"}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.descricao || "Sem descrição"}</h3>
                    <p>R$ {parseFloat(item.valor).toFixed(2)}</p>
                    <Link to={`/detalhes/${index}`} className={styles.saibaMais}>
                      Saiba mais
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Você ainda não cadastrou nenhum gasto.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resumo;


