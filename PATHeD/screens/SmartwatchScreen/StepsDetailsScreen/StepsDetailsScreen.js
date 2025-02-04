// StepsDetailsChart.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StepsDetailsChart = () => {
    const [summary, setSummary] = useState(null);

    // Render a single metric box with a title above and the value below.
    const renderMetric = (title, value, unit = '') => (
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
                title="Steps Summary"
                dataType="steps"
                segments={['Week', 'Month']}
                chartColor="#0B3F6B"
                onSummaryUpdate={(value) => setSummary(value)}
            />
            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <View style={styles.metricRow}>
                        {renderMetric('Average Steps', summary, '')}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    metricsContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 40,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    metricBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24,
        marginHorizontal: 12,
        borderWidth: 1.5,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
    },
    metricTitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
        fontWeight: '500',
    },
    metricValue: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default StepsDetailsChart;
