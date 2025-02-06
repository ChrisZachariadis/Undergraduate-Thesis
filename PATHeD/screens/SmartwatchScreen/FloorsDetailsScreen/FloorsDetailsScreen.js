import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const FloorsMetricCard = ({ title, value, unit, icon }) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{title}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value !== null ? value.toLocaleString() : '-'}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={22} color="#34511e" />
            </View>
        </View>
    </View>
);

const FloorsDetailsChart = () => {
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Floors Summary"
                dataType="floors"
                segments={['Week', 'Month']}
                chartColor="#34511e"
                onSummaryUpdate={(value) => setSummary(value)}
            />

            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <View style={styles.row}>
                        <FloorsMetricCard
                            title="Average Floors climbed"
                            value={summary}
                            unit="floors"
                            icon={faBuilding}
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
    metricCard: {
        flex: 1,
        marginHorizontal: 0,
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
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
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
        backgroundColor: 'rgba(52, 81, 30, 0.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FloorsDetailsChart;
