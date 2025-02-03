// StressDetailsChart.js
import React from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StressDetailsChart = () => (
    <ChartDetails
        title="Stress Summary"
        dataType="stress"
        segments={['Day', 'Week', 'Month']}  // Day shows pie chart; Week/Month show bar charts.
        chartColor="#673AB7"
    />
);

export default StressDetailsChart;
