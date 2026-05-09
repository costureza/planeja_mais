import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function FinanceHealthChart({ saldo, totais }) {
  const isNegative = saldo < 0;
  
  const data = {
    labels: ["Saldo", "Despesas"],
    datasets: [
      {
        data: [Math.max(0, saldo), totais.totalDespesas],
        backgroundColor: [
          isNegative ? "#ff4d4d" : "#2ecc71", // Vermelho se negativo, Verde se positivo
          "#c9b714ff", // Azul escuro para despesas
        ],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#0b2040",
          font: {
            family: "Montserrat",
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "250px", height: "250px", margin: "20px auto", position: "relative" }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        pointerEvents: "none"
      }}>
        <span style={{ fontSize: "14px", color: "#7f8c8d", fontWeight: "bold" }}>SAÚDE</span>
        <br />
        <span style={{ fontSize: "20px", color: isNegative ? "#e74c3c" : "#27ae60", fontWeight: "bold" }}>
          {((saldo / (totais.totalReceitas || 1)) * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

export default FinanceHealthChart;
