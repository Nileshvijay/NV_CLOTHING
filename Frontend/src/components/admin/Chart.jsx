import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { chartOptions } from './ChartSetup';

// Sample data for the charts
const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

// Chart component to display top selling products
export const TopSellingProductChart = () => {
    return <Bar data={chartData} options={chartOptions} />;
};

// Chart component to display shopping status
export const ShoppingStatusChart = () => {
    return <Line data={chartData} options={chartOptions} />;
};

// Chart component to display average expense cost
export const AvgExpenseCostChart = () => {
    return <Bar data={chartData} options={chartOptions} />;
};
