import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';
import styles from '../assets/styles/smartwatchStyle';

const FloorsDetailsChart = ({route}) => {
    // Get the selectedDate from route params to pass it to ChartDetails
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
                initialDate={selectedDate}
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
export default FloorsDetailsChart;
