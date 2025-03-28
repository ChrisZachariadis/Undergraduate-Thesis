import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';

const StepsMetricCard = ({ title, value, unit, icon }) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{title}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value.toLocaleString()}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={icon} size={22} color="#0B3F6B" />
            </View>
        </View>
    </View>
);

const StepsDetailsChart = ({ route, navigation }) => {
    const { selectedDate, segmentType, captureOnGenerate, headless, onCaptureDone } = route.params || {};
    const chartRef = useRef(null);
    const [summary, setSummary] = useState(null);

    const captureChart = async () => {
        if (chartRef.current) {
            try {
                const uri = await chartRef.current.capture();
                console.log('Steps chart captured at:', uri);

                // Ensure directory exists
                const dirPath = '/storage/emulated/0/Android/data/com.pathed/files/Documents';
                const dirExists = await RNFS.exists(dirPath);
                if (!dirExists) {
                    await RNFS.mkdir(dirPath);
                }

                const destPath = `${dirPath}/monthly_steps_segment.jpg`;
                await RNFS.copyFile(uri, destPath);
                console.log('Monthly steps segment chart saved at:', destPath);
                return true;
            } catch (err) {
                console.error('Error saving monthly steps segment chart:', err);
                return false;
            }
        }
        return false;
    };

    useEffect(() => {
        if (captureOnGenerate) {
            const handleCapture = async () => {
                const success = await captureChart();

                if (headless) {
                    if (onCaptureDone && typeof onCaptureDone === 'function') {
                        // Call the callback function if provided
                        onCaptureDone(success);
                    }
                    navigation.goBack();
                }
            };

            handleCapture();
        }
    }, [captureOnGenerate, headless, navigation, onCaptureDone]);

    if (headless) {
        // Return a minimal view that can still be captured
        return (
            <View style={{position: 'absolute', opacity: 0, width: '100%', height: '100%'}}>
                <ViewShot ref={chartRef} options={{ format: 'jpg', quality: 0.9 }}>
                    <ChartDetails
                        title="Steps Summary"
                        dataType="steps"
                        segments={segmentType === 'Month' ? ['Month'] : ['Week', 'Month']}
                        chartColor="#0B3F6B"
                        onSummaryUpdate={(value) => setSummary(value)}
                        initialDate={selectedDate}
                    />
                </ViewShot>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <ViewShot ref={chartRef} options={{ format: 'jpg', quality: 0.9 }}>
                <ChartDetails
                    title="Steps Summary"
                    dataType="steps"
                    segments={segmentType === 'Month' ? ['Month'] : ['Week', 'Month']}
                    chartColor="#0B3F6B"
                    onSummaryUpdate={(value) => setSummary(value)}
                    initialDate={selectedDate}
                />
            </ViewShot>

            <View style={styles.metricsContainer}>
                {summary !== null && (
                    <>
                        <View style={styles.row}>
                            <StepsMetricCard
                                title="Average Steps"
                                value={summary}
                                unit="steps"
                                icon={faPersonWalking}
                            />
                        </View>
                    </>
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
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    metricCard: {
        flex: 1,
        marginHorizontal: 0,
        padding: 16,
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
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(11, 63, 107, 0.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StepsDetailsChart;
