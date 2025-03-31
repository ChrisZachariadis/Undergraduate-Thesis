import React, {useState} from 'react';
import {View} from 'react-native';
import {faFire} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';
import styles from '../assets/styles/smartwatchStyle'

const KcalDetails = ({route}) => {
    const selectedDate = route.params?.selectedDate;
    const [summary, setSummary] = useState(null);

    return (
        <View style={styles.container}>
            <ChartDetails
                title="Kilocalories Summary"
                dataType="kcal"
                segments={['Week', 'Month']}
                chartColor="#FFA500"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate}
            />
            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <View style={styles.row}>
                        <MetricCard
                            title="Average kilocalories burned"
                            value={summary}
                            unit="kcal"
                            icon={faFire}
                            color="#FFA500"
                            size={24}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};
export default KcalDetails;
