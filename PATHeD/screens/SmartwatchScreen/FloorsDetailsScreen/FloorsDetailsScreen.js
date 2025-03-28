import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';

const FloorsDetailsChart = ({ route }) => {
    // Get the selectedDate from route params if available
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Floors Summary"
                dataType="floors"
                segments={['Week', 'Month']}
                chartColor="#34511e"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate} // Pass the selected date to ChartDetails
            />

            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <View style={styles.row}>
                        <MetricCard
                            title="Average Floors climbed"
                            value={summary}
                            unit="floors"
                            icon={faBuilding}
                            color="#34511e"
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
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
});

export default FloorsDetailsChart;
