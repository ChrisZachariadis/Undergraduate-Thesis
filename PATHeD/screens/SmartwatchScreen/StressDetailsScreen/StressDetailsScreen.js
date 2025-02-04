// StressDetailsChart.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StressDetailsChart = () => {
    const [summary, setSummary] = useState(null);

    // Render a single metric box with a colored indicator next to the title.
    const renderMetric = (title, value, unit = '', indicatorColor) => (
        <View style={styles.metricBox} key={title}>
            <View style={styles.metricHeader}>
                {indicatorColor && (
                    <View style={[styles.colorIndicator, { backgroundColor: indicatorColor }]} />
                )}
                <Text style={styles.metricTitle}>{title}</Text>
            </View>
            <Text style={styles.metricValue}>
                {value} {unit}
            </Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Stress Summary"
                dataType="stress"
                segments={['Day', 'Week', 'Month']}
                chartColor="#673AB7"
                onSummaryUpdate={(value) => setSummary(value)}
            />
            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={styles.metricRow}>
                            {renderMetric(
                                'Rest Stress',
                                Math.round(summary.restStressDurationInSeconds / 60),
                                'min',
                                '#1976D2'
                            )}
                            {renderMetric(
                                'Low Stress',
                                Math.round(summary.lowStressDurationInSeconds / 60),
                                'min',
                                '#FFB74D'
                            )}
                        </View>
                        <View style={styles.metricRow}>
                            {renderMetric(
                                'Medium Stress',
                                Math.round(summary.mediumStressDurationInSeconds / 60),
                                'min',
                                '#FB8C00'
                            )}
                            {renderMetric(
                                'High Stress',
                                Math.round(summary.highStressDurationInSeconds / 60),
                                'min',
                                '#E65100'
                            )}
                        </View>
                        <View style={styles.metricRow}>
                            {renderMetric('Max Level', summary.maxStressLevel, '', '#673AB7')}
                            {renderMetric('Avg Level', summary.averageStressLevel, '', '#673AB7')}
                        </View>
                    </>
                ) : (
                    <View style={styles.metricRow}>
                        {renderMetric('Average Stress', summary, '', '#673AB7')}
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
        justifyContent: 'space-between',
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
    metricHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
    metricTitle: {
        fontSize: 16,
        color: '#888',
        fontWeight: '500',
    },
    metricValue: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default StressDetailsChart;
