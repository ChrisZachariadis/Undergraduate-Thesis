import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeartPulse, faHeart, faHeartCircleMinus, faHeartCirclePlus} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {styles} from './styles';


// Display the metrics in a card format
const MetricCard = ({title, value, unit, icon}) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{title}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={22} color="#FF6347"/>
            </View>
        </View>
    </View>
);

const HRDetails = () => {
    // useSTate for the heart rate details below the graph
    const [summary, setSummary] = useState(null);

    return (
        <ScrollView style={styles.container}>
            {/* graph with the heart data*/}
            <ChartDetails
                title="Heart Rate Summary"
                dataType="hr"
                segments={['Day', 'Week', 'Month']}
                chartColor="#FF6347"
                onSummaryUpdate={(value) => setSummary(value)}
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
                            />
                            <MetricCard
                                title="Resting Heart Rate"
                                value={summary.restingHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeart}
                            />
                        </View>
                        <View style={styles.row}>
                            <MetricCard
                                title="Min Heart Rate"
                                value={summary.minHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeartCircleMinus}
                            />
                            <MetricCard
                                title="Max Heart Rate"
                                value={summary.maxHeartRateInBeatsPerMinute}
                                unit="bpm"
                                icon={faHeartCirclePlus}
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
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default HRDetails;
