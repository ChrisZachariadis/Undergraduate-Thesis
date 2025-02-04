// HR2Details.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const HR2Details = () => {
    const [summary, setSummary] = useState(null);

    // Render a single metric box with a title above and value below.
    const renderMetric = (title, value, unit) => (
        <View style={styles.metricBox} key={title}>
            <Text style={styles.metricTitle}>{title}</Text>
            <Text style={styles.metricValue}>
                {value} {unit}
            </Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Heart Rate Summary"
                dataType="hr"
                segments={['Day', 'Week', 'Month']}
                chartColor="#FF6347"
                onSummaryUpdate={(value) => setSummary(value)}
            />
            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={styles.metricRow}>
                            {renderMetric('Average Heart Rate', summary.averageHeartRateInBeatsPerMinute, 'bpm')}
                            {renderMetric('Resting Heart Rate', summary.restingHeartRateInBeatsPerMinute, 'bpm')}
                        </View>
                        <View style={styles.metricRow}>
                            {renderMetric('Min Hear Rate', summary.minHeartRateInBeatsPerMinute, 'bpm')}
                            {renderMetric('Max Heart Rate', summary.maxHeartRateInBeatsPerMinute, 'bpm')}
                        </View>
                    </>
                ) : (
                    <View style={styles.metricRow}>
                        {renderMetric('Average Heart Rate', summary, 'bpm')}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    metricsContainer: {
        marginTop: 6,
        marginHorizontal: 16,
        marginBottom: 36,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
        marginHorizontal: 0,
    },
    metricBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 4,
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
    },
    metricTitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
        fontWeight: '500',
    },
    metricValue: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default HR2Details;
