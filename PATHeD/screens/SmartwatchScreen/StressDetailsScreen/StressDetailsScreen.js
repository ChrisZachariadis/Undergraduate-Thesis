// StressDetailsChart.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StressDetailsChart = () => {
    const [summary, setSummary] = useState(null);

    return (
        <View style={{ flex: 1 }}>
            <ChartDetails
                title="Stress Summary"
                dataType="stress"
                segments={['Day', 'Week', 'Month']}
                chartColor="#673AB7"
                onSummaryUpdate={(value) => setSummary(value)}
            />
            <View style={{ padding: 10 }}>
                {summary && typeof summary === 'object' ? (
                    <>
                        {/*<Text style={{ fontSize: 18 }}>*/}
                        {/*    Total Stress Duration: {summary.totalStressDuration} minutes*/}
                        {/*</Text>*/}
                        <Text>Rest: {summary.restStressDurationInSeconds} seconds</Text>
                        <Text>Low: {summary.lowStressDurationInSeconds} seconds</Text>
                        <Text>Medium: {summary.mediumStressDurationInSeconds} seconds</Text>
                        <Text>High: {summary.highStressDurationInSeconds} seconds</Text>
                        <Text>Max level: {summary.maxStressLevel}</Text>
                        <Text>Avg level: {summary.averageStressLevel}</Text>

                    </>
                ) : (
                    <Text style={{ fontSize: 18 }}>
                        Average Stress: {summary}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default StressDetailsChart;
