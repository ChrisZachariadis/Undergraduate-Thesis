import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {faPersonWalking} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';

const StepsDetailsChart = ({route}) => {
    const {selectedDate, segmentType} = route.params || {};
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
                <ChartDetails
                    title="Steps Summary"
                    dataType="steps"
                    segments={segmentType === 'Month' ? ['Month'] : ['Week', 'Month']}
                    chartColor="#0B3F6B"
                    onSummaryUpdate={(value) => setSummary(value)}
                    initialDate={selectedDate}
                />
            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <View style={styles.row}>
                        <MetricCard
                            title="Average Steps"
                            value={summary}
                            unit="steps"
                            icon={faPersonWalking}
                            color="#0B3F6B"
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    metricsContainer: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
});

export default StepsDetailsChart;
