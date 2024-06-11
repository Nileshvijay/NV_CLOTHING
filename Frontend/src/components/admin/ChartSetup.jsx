import { Chart } from 'react-chartjs-2';

// Check if Chart is defined before accessing its defaults
if (Chart && Chart.defaults) {
    // Setting up default options for all charts
    Chart.defaults.font.family = "'Roboto', sans-serif";
    Chart.defaults.font.color = '#495057';
    Chart.defaults.font.size = 14;
    Chart.defaults.elements.point.radius = 5;
    Chart.defaults.elements.line.borderWidth = 2;
}

// Sample options for the charts
export const chartOptions = {
    // Your chart options here
};
