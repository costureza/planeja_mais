
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GastosPorCategoriaChart() {

    const data = {
        labels: ['Abril', 'Maio', 'Junho', 'Agosto', 'Setembro'],
        datasets: [
            {
                label: 'Total de Gastos (R$)',
                data: [1000, 6000, 1000, 2000, 1400],
                backgroundColor: '#001f3f',
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