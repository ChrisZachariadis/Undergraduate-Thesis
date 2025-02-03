// StepsDetailsChart.js
import React from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StepsDetailsChart = () => {
    // For steps, use only Week and Month views.
    return (
        <ChartDetails
            title="Steps Summary"
            dataType="steps"
            segments={['Week', 'Month']}
            chartColor="#00BFFF"
        />
    );
};

export default StepsDetailsChart;
