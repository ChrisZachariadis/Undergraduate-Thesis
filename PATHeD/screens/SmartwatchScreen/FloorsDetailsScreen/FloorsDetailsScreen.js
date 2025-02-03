// FloorsDetailsChart.js
import React from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const FloorsDetailsChart = () => (
    <ChartDetails
        title="Floors Summary"
        dataType="floors"
        segments={['Week', 'Month']}
        chartColor="#8BC34A"
    />
);

export default FloorsDetailsChart;
