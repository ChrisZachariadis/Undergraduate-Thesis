// KcalDetails.js
import React from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const KcalDetails = () => {
    // For kilocalories, only Week and Month views are supported.
    return (
        <ChartDetails
            title="Kilocalories Summary"
            dataType="kcal"
            segments={['Week', 'Month']}
            chartColor="#FFA500"
        />
    );
};

export default KcalDetails;
