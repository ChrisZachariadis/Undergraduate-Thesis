// HR2Details.js
import React from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const HR2Details = () => {
    return (
        <ChartDetails
            title="Heart Rate Summary"
            dataType="hr"
            segments={['Day', 'Week', 'Month']}
            chartColor="#FF6347"
        />
    );
};

export default HR2Details;
