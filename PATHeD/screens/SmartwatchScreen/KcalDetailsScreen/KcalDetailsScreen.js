// KcalDetails.js
import React, {useState} from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {Text, View} from "react-native";

const KcalDetails = () => {
    const [summary, setSummary] = useState('');

    return (
        <View style={{flex: 1}}>
            <ChartDetails
                title="Kilocalories Summary"
                dataType="kcal"
                segments={['Week', 'Month']}
                chartColor="#FFA500"
                onSummaryUpdate={(summaryLabel) => setSummary(summaryLabel)}
            />
            <View>
                <Text>Average kcal {summary}</Text>
            </View>
        </View>
    );
};

export default KcalDetails;
