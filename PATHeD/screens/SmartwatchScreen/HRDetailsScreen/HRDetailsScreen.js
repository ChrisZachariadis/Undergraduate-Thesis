// HRDetailsScreen.jsx

import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import moment from 'moment';

import styles from './style'; // Import your HRDetailsScreen styles
import data from '../data.json'; // Ensure the path is correct

const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

const HRDetailsScreen = () => {
    const route = useRoute();
    const { dayData } = route.params || {};

    // Handle the case where dayData might be undefined
    if (!dayData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
            </View>
        );
    }

    // State to manage the selected time range ('1d', '7d', '1m')
    const [selectedRange, setSelectedRange] = useState('7d');

    // State for Modal visibility and selected chart element data
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedElement, setSelectedElement] = useState({ label: '', value: 0 });

    // Function to handle time range selection
    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    // Determine the date range based on selectedRange
    const dateRange = useMemo(() => {
        const start = moment(dayData.calendarDate);
        switch (selectedRange) {
            case '1d':
                // For 1 day, we'll display hourly data
                return [start.format('YYYY-MM-DD')];
            case '7d':
                // For 7 days
                return Array.from({ length: 7 }, (_, i) =>
                    start.clone().subtract(6 - i, 'days').format('YYYY-MM-DD')
                );
            case '1m':
                // For 1 month (30 days)
                return Array.from({ length: 30 }, (_, i) =>
                    start.clone().subtract(29 - i, 'days').format('YYYY-MM-DD')
                );
            default:
                return [start.format('YYYY-MM-DD')];
        }
    }, [selectedRange, dayData.calendarDate]);

    // Filter data for the date range
    const filteredData = useMemo(
        () => data.data.filter(entry => dateRange.includes(entry.calendarDate)),
        [data.data, dateRange]
    );

    // Process heart rates based on selectedRange
    const { labels, heartRates, isLineChart } = useMemo(() => {
        if (selectedRange === '1d') {
            // For 1d, display hourly data
            const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
            const hourlyData = Array.from({ length: 24 }, () => []);

            filteredData.forEach(entry => {
                const {
                    timeOffsetHeartRateSamples = {},
                    startTimeInSeconds = 0,
                    activeTimeInSeconds = 0,
                    startTimeOffsetInSeconds = 7200, // UTC+2 for Nicosia (adjust if necessary)
                } = entry.data;

                Object.entries(timeOffsetHeartRateSamples).forEach(([offsetStr, hr]) => {
                    const offsetSec = Number(offsetStr);
                    const sampleTimeSec = startTimeInSeconds + offsetSec + activeTimeInSeconds;
                    const localEpochSec = sampleTimeSec + startTimeOffsetInSeconds;

                    const dateObj = new Date(localEpochSec * 1000); // Convert to ms
                    const hour = dateObj.getHours(); // 0 - 23

                    if (hour >= 0 && hour < 24) {
                        hourlyData[hour].push(hr);
                    }
                });
            });

            const averagedHourly = hourlyData.map(arr => {
                if (arr.length > 0) {
                    const sum = arr.reduce((a, b) => a + b, 0);
                    return parseFloat((sum / arr.length).toFixed(0));
                }
                return 0; // Or null if you prefer
            });

            return {
                labels: hours, // These labels will be hidden in the chart
                heartRates: averagedHourly,
                isLineChart: true,
            };
        } else {
            // For '7d' and '1m', display daily averages
            const labels = dateRange.map(date => moment(date).format('MMM D'));
            const heartRates = dateRange.map(date => {
                const entry = filteredData.find(e => e.calendarDate === date);
                return entry ? entry.data.averageHeartRateInBeatsPerMinute : 0; // Or null
            });

            return {
                labels, // These labels will be hidden in the chart
                heartRates,
                isLineChart: false,
            };
        }
    }, [selectedRange, filteredData, dateRange]);

    // Define chart data structure
    const heartRateChartData = useMemo(() => {
        return {
            labels, // Labels are still needed for tap functionality
            datasets: [
                {
                    data: heartRates,
                    color: () => '#FF6347', // Tomato color for HR chart
                    strokeWidth: 2,
                },
            ],
        };
    }, [labels, heartRates]);

    // Define chart configuration
    const chartConfig = useMemo(() => ({
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and label color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Y-axis label text color
        decimalPlaces: 0, // No decimals
        yAxisInterval: 10, // Optional: adjust based on your data range
        propsForBackgroundLines: {
            strokeDasharray: '', // Solid lines
            stroke: '#e0e0e0', // Light grey grid lines
        },
        propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#FF6347', // Tomato stroke for dots
        },
    }), []);

    // Handler for chart element tap
    const handleChartTap = (value, index) => {
        const label = labels[index]; // Get the corresponding label (date or hour)
        setSelectedElement({ label, value });
        setModalVisible(true);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Heart Rate Details</Text>

            {/* Time Range Selection */}
            <View style={styles.rangeSelector}>
                {['1d', '7d', '1m'].map((range) => (
                    <TouchableOpacity
                        key={range}
                        style={[
                            styles.rangeButton,
                            selectedRange === range && styles.selectedRangeButton,
                        ]}
                        onPress={() => handleRangeChange(range)}
                    >
                        <Text
                            style={[
                                styles.rangeButtonText,
                                selectedRange === range && styles.selectedRangeButtonText,
                            ]}
                        >
                            {range}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Conditional Chart Rendering */}
            {heartRateChartData.datasets[0].data.some(hr => hr !== 0) ? (
                isLineChart ? (
                    <LineChart
                        data={heartRateChartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        yAxisSuffix=" bpm"
                        fromZero={true}
                        bezier // Smooth curves
                        segments={4} // Number of horizontal grid lines
                        style={{
                            borderRadius: 8,
                            marginVertical: 16,
                        }}
                        withDots={true}
                        withShadow={false}
                        withVerticalLabels={false} // Hide x-axis labels
                        withHorizontalLabels={true} // Keep y-axis labels
                        transparent={false}
                        onDataPointClick={({ value, index }) => handleChartTap(value, index)}
                    />
                ) : (
                    <BarChart
                        data={heartRateChartData}
                        width={screenWidth}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=" bpm"
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        chartConfig={chartConfig}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        verticalLabelRotation={selectedRange === '1d' ? 0 : 30}
                        withVerticalLabels={false} // Hide x-axis labels
                        onDataPointClick={({ value, index }) => handleChartTap(value, index)}
                    />
                )
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No heart rate data available for this period.</Text>
                </View>
            )}

            {/* Modal for Displaying Selected Chart Element Info */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={modalStyles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={modalStyles.modalContainer}>
                                <Text style={modalStyles.modalTitle}>Heart Rate Details</Text>
                                <Text style={modalStyles.modalText}>{selectedElement.label}</Text>
                                <Text style={modalStyles.modalText}>BPM: {selectedElement.value}</Text>
                                <TouchableOpacity
                                    style={modalStyles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={modalStyles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
};

// Styles for Modal
const modalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HRDetailsScreen;
