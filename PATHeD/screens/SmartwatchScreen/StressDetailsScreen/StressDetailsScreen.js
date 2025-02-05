import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBrain, faPersonRunning, faFaceMeh, faFaceAngry } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const StressMetricCard = ({ title, value, unit, icon, color }) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <View style={[styles.colorIndicator, { backgroundColor: color }]} />
                    <Text style={styles.label}>{title}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                <FontAwesomeIcon icon={icon} size={22} color={color} />
            </View>
        </View>
    </View>
);

const StressDetailsChart = () => {
    const [summary, setSummary] = useState(null);

    const getTimeInMinutes = (seconds) => Math.round(seconds / 60);

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
                        <View style={styles.row}>
                            <StressMetricCard
                                title="Rest"
                                value={getTimeInMinutes(summary.restStressDurationInSeconds)}
                                unit="min"
                                icon={faBrain}
                                color="#1976D2"
                            />
                            <StressMetricCard
                                title="Low"
                                value={getTimeInMinutes(summary.lowStressDurationInSeconds)}
                                unit="min"
                                icon={faPersonRunning}
                                color="#FFB74D"
                            />
                        </View>
                        <View style={styles.row}>
                            <StressMetricCard
                                title="Medium"
                                value={getTimeInMinutes(summary.mediumStressDurationInSeconds)}
                                unit="min"
                                icon={faFaceMeh}
                                color="#FB8C00"
                            />
                            <StressMetricCard
                                title="High"
                                value={getTimeInMinutes(summary.highStressDurationInSeconds)}
                                unit="min"
                                icon={faFaceAngry}
                                color="#E65100"
                            />
                        </View>
                        <View style={styles.row}>
                            <StressMetricCard
                                title="Max Level"
                                value={summary.maxStressLevel}
                                unit=""
                                icon={faFaceAngry}
                                color="#673AB7"
                            />
                            <StressMetricCard
                                title="Average Level"
                                value={summary.averageStressLevel}
                                unit=""
                                icon={faFaceMeh}
                                color="#673AB7"
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.row}>
                        <StressMetricCard
                            title="Average Stress"
                            value={summary}
                            unit=""
                            icon={faBrain}
                            color="#673AB7"
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
        padding: 4,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    metricCard: {
        flex: 1,
        marginHorizontal: 4,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    colorIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StressDetailsChart;
