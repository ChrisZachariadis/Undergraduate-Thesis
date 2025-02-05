// FloorsDetailsChart.js
import React, {useState} from 'react';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {Text, View} from "react-native";

const FloorsDetailsChart = () => {
    const [summary, setSummary] = useState(null);


    return (
        <><ChartDetails
            title="Floors Summary"
            dataType="floors"
            segments={['Week', 'Month']}
            chartColor="#34511e"
            onSummaryUpdate={(value) => setSummary(value)}/><View>
            <Text>
                Average floors climbed {summary}
            </Text>
        </View></>
    )
};

export default FloorsDetailsChart;
