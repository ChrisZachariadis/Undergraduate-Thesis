// HR2Details.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const HR2Details = () => {
    const [summary, setSummary] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <ChartDetails
                title="Heart Rate Summary"
                dataType="hr"
                segments={['Day', 'Week', 'Month']}
                chartColor="#FF6347"
                onSummaryUpdate={(summaryLabel) => setSummary(summaryLabel)}
            />
            <View>
                <Text>Average hr {summary}</Text>
            </View>
        </View>
    );
};

export default HR2Details;
