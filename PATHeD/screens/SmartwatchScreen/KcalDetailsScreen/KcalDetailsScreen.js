import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';

const KcalDetails = ({ route }) => {
    // Get the selectedDate from route params if available
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState('');

    return (
        <View style={styles.container}>
            <ChartDetails
                title="Kilocalories Summary"
                dataType="kcal"
                segments={['Week', 'Month']}
                chartColor="#FFA500"
                onSummaryUpdate={(summaryLabel) => setSummary(summaryLabel)}
                initialDate={selectedDate} // Pass the selected date to ChartDetails
            />
            <View style={styles.cardContainer}>
                <MetricCard
                    title="Average kilocalories burned"
                    value={summary}
                    unit="kcal"
                    icon={faFire}
                    color="#FFA500"
                    size={24}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    cardContainer: {
        padding: 16,
    }
});

export default KcalDetails;
