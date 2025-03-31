import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {faBolt, faPersonRunning, faDumbbell} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';
import styles from '../assets/styles/smartwatchStyle.js';

const IntensityDetailsScreen = ({route}) => {
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState(null);

    // Convert seconds to minutes for display
    const formatMinutes = (seconds) => Math.round(seconds / 60);

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Intensity Summary"
                dataType="intensity"
                segments={['Week', 'Month']}
                chartColor="#0B3F6B"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate}
            />

            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={styles.row}>
                            <MetricCard
                                title="Vigorous Intensity"
                                value={formatMinutes(summary.vigorousIntensityDurationInSeconds)}
                                unit="min"
                                icon={faDumbbell}
                                color="#0B3F6B"
                            />
                            <MetricCard
                                title="Moderate Intensity"
                                value={formatMinutes(summary.moderateIntensityDurationInSeconds)}
                                unit="min"
                                icon={faPersonRunning}
                                color="#0B3F6B"
                            />
                        </View>
                        <View style={styles.row}>
                            <MetricCard
                                title="Total Intensity"
                                value={formatMinutes(summary.moderateIntensityDurationInSeconds + summary.vigorousIntensityDurationInSeconds)}
                                unit="min"
                                icon={faBolt}
                                color="#0B3F6B"
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.row}>
                        <MetricCard
                            title="Intensity"
                            value={formatMinutes(summary || 0)}
                            unit="min"
                            icon={faBolt}
                            color="#0B3F6B"
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
export default IntensityDetailsScreen;
