
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GastosPorCategoriaChart() {
    const [valoresGrafico, setValoresGrafico] = useState([1000, 6000, 1000, 2000, 1400]);


    const labels = ['Abril', 'Maio', 'Junho', 'Agosto', 'Setembro'];
    const cores = ['#FFD700', '#001f3f', '#4F6C8C', '#ADC1D9', '#FFD700'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Gastos R$',
                data: valoresGrafico,
                backgroundColor: cores,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };


    const lidarComMudancaNoValor = (indice, novoValor) => {

        const valorNumerico = parseFloat(novoValor) || 0;


        const novosValores = [...valoresGrafico];

        novosValores[indice] = valorNumerico;


        setValoresGrafico(novosValores);
    };


    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            { }
            <div style={{ marginBottom: '40px' }}>
                <Bar options={options} data={data} />
            </div>

            { }
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                <h3>Simular Gastos</h3>
                {labels.map((mes, index) => (
                    <div key={mes} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                        <label htmlFor={`input-${mes}`} style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{mes}</label>
                        <input
                            id={`input-${mes}`}
                            type="number"
                            value={valoresGrafico[index]}
                            onChange={(e) => lidarComMudancaNoValor(index, e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GastosPorCategoriaChart;