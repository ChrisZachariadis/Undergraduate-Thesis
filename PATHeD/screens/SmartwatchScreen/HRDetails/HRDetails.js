import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {faHeartPulse, faHeart, faHeartCircleMinus, faHeartCirclePlus} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import MetricCard from '../components/MetricCard';
import styles from '../assets/styles/smartwatchStyle';

const HRDetails = ({route}) => {
    const {selectedDate, segmentType} = route.params || {};

    // useSTate for the heart rate details below the graph
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
            <ChartDetails
                title="Heart Rate Summary"
                dataType="hr"
                segments={segmentType === 'Month' ? ['Month'] : ['Day', 'Week', 'Month']}
                chartColor="#FF6347"
                onSummaryUpdate={(value) => setSummary(value)}
                initialDate={selectedDate}
            />

            <View style={styles.metricsContainer}>
                {summary && typeof summary === 'object' ? (
                    <>
                        <View style={styles.row}>
                            <MetricCard
                                title="Average Heart Rate"
                                value={summary.averageHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeartPulse}
                                color="#FF6347"
                            />
                            <MetricCard
                                title="Resting Heart Rate"
                                value={summary.restingHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeart}
                                color="#FF6347"
                            />
                        </View>
                        <View style={styles.row}>
                            <MetricCard
                                title="Min Heart Rate"
                                value={summary.minHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeartCircleMinus}
                                color="#FF6347"
                            />
                            <MetricCard
                                title="Max Heart Rate"
                                value={summary.maxHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeartCirclePlus}
                                color="#FF6347"
                            />
                        </View>
                    </>
                ) : (
                    <View style={styles.row}>
                        <MetricCard
                            title="Average Heart Rate"
                            value={summary}
                            unit="bpm"
                            icon={faHeartPulse}
                            color="#FF6347"
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};
export default HRDetails;
