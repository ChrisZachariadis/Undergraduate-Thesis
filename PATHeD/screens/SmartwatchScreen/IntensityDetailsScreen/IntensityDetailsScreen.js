import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt, faPersonRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const IntensityMetricCard = ({ title, value, icon }) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{title}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{Math.round(value / 60)}</Text>
                    <Text style={styles.unit}>min</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={22} color="#0B3F6B" />
            </View>
        </View>
    </View>
);

const IntensityDetailsScreen = ({ route }) => {
    // Get the selectedDate from route params if available
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Intensity Summary"
                dataType="intensity"
                segments={['Week', 'Month']}
                chartColor="#0B3F6B"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate} // Pass the selected date to ChartDetails
            />

            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={styles.row}>
                            <IntensityMetricCard
                                title="Vigorous Intensity"
                                value={summary.vigorousIntensityDurationInSeconds}
                                icon={faDumbbell}
                            />
                            <IntensityMetricCard
                                title="Moderate Intensity"
                                value={summary.moderateIntensityDurationInSeconds}
                                icon={faPersonRunning}
                            />
                        </View>
                        <View style={styles.row}>
                            <IntensityMetricCard
                                title="Total Intensity"
                                value={summary.moderateIntensityDurationInSeconds + summary.vigorousIntensityDurationInSeconds}
                                icon={faBolt}
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.row}>
                        <IntensityMetricCard
                            title="Intensity"
                            value={summary || 0}
                            icon={faBolt}
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
        marginBottom: 8,
    },
    metricCard: {
        flex: 1,
        marginHorizontal: 6,
        padding: 12,
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
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(11, 63, 107, 0.1)',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default IntensityDetailsScreen;
