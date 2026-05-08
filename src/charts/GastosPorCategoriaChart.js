
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GastosPorCategoriaChart() {

    const cores = [
        '#FFD700',
        '#001f3f',
        '#4F6C8C',
        '#ADC1D9',
        '#FFD700',
    ];

    const data = {
        labels: ['Abril', 'Maio', 'Junho', 'Agosto', 'Setembro'],
        datasets: [
            {
                label: 'Total de Gastos (R$)',
                data: [1000, 6000, 1000, 2000, 1400],
                backgroundColor: cores,
                borderRadius: 5,
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default GastosPorCategoriaChart;