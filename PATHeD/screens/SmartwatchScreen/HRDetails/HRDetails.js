import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeartPulse, faHeart, faHeartCircleMinus, faHeartCirclePlus} from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import {styles} from './styles';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

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

const HRDetails = ({ route, navigation }) => {
    const { selectedDate, segmentType, captureOnGenerate, headless } = route.params || {};

    // useSTate for the heart rate details below the graph
    const [summary, setSummary] = useState(null);

    const chartRef = useRef(null);

    const captureChart = async () => {
        if (chartRef.current) {
            const uri = await chartRef.current.capture();
            console.log('Chart captured at:', uri);
            // Save file if needed (e.g., using react-native-fs)
            // The captured chart is saved at the URI specified in the console log.
            try {
                const destPath = '/storage/emulated/0/Android/data/com.pathed/files/Documents/monthly_segment.jpg';
                await RNFS.copyFile(uri, destPath);
                console.log('Monthly segment chart saved at:', destPath);
            } catch (err) {
                console.error('Error saving monthly segment chart:', err);
            }
        }
    };

    useEffect(() => {
        if (captureOnGenerate) {
            captureChart().then(() => {
                if (headless) {
                    navigation.goBack();
                }
            });
        }
    }, [captureOnGenerate]);

    if (headless) {
        return null; // Hide entire UI if headless
    }

    return (
        <ScrollView style={styles.container}>
            <ViewShot ref={chartRef} options={{ format: 'png', quality: 0.9 }}>
                <ChartDetails
                    title="Heart Rate Summary"
                    dataType="hr"
                    segments={segmentType === 'Month' ? ['Month'] : ['Day', 'Week', 'Month']}
                    chartColor="#FF6347"
                    onSummaryUpdate={(value) => setSummary(value)}
                    initialDate={selectedDate}
                />
            </ViewShot>

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

