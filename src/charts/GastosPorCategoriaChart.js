
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GastosPorCategoriaChart = () => {

    const [valores, setValores] = useState([1000, 6000, 1000, 2000, 1400]);

    const categorias = ['Supermercado', 'Moradia', 'Educação', 'Transporte', 'Saúde'];


    const definirCores = (valoresArray) => {
        return valoresArray.map(valor => {
            if (valor <= 1000) return '#FFD700';
            if (valor <= 1500) return '#ADC1D9';
            if (valor <= 2000) return '#4F6C8C';
            return '#001f3f';
        });
    };

    const data = {
        labels: categorias,
        datasets: [
            {
                label: 'Gastos por Categoria (R$)',
                data: valores,
                backgroundColor: definirCores(valores),
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Gastos por Categoria', font: { size: 18 } },
        },
    };

    const handleInputChange = (index, novoValor) => {
        const novosValores = [...valores];
        novosValores[index] = Number(novoValor);
        setValores(novosValores);
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <Bar data={data} options={options} />

            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {categorias.map((cat, index) => (
                    <div key={index} style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '12px', display: 'block' }}>{cat}:</label>
                        <input
                            type="number"
                            value={valores[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GastosPorCategoriaChart;