import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBuilding} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {styles} from './style';

const FloorsMetricCard = ({title, value, unit, icon}) => (
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
                <FontAwesomeIcon icon={icon} size={22} color="#34511e"/>
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
export default FloorsDetailsChart;
