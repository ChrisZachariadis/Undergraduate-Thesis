import React, { useMemo, useState, useCallback } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import styles from './style';
import data from '../data.json';

const screenWidth = Dimensions.get('window').width - 32;

const HRDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { dayData } = route.params || {};

    const [selectedRange, setSelectedRange] = useState('7d');
    const [currentDate, setCurrentDate] = useState(moment(dayData?.calendarDate || new Date()));
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedElement, setSelectedElement] = useState({ label: '', value: 0 });

    // Navigation handlers
    const handlePrevious = useCallback(() => {
        setCurrentDate(prev => {
            switch (selectedRange) {
                case '1d':
                    return prev.clone().subtract(1, 'day');
                case '7d':
                    return prev.clone().subtract(7, 'days');
                case '1m':
                    return prev.clone().subtract(1, 'month');
                default:
                    return prev;
            }
        });
    }, [selectedRange]);

    const handleNext = useCallback(() => {
        setCurrentDate(prev => {
            switch (selectedRange) {
                case '1d':
                    return prev.clone().add(1, 'day');
                case '7d':
                    return prev.clone().add(7, 'days');
                case '1m':
                    return prev.clone().add(1, 'month');
                default:
                    return prev;
            }
        });
    }, [selectedRange]);

    const dateRange = useMemo(() => {
        switch (selectedRange) {
            case '1d':
                return [currentDate.format('YYYY-MM-DD')];
            case '7d':
                return Array.from({ length: 7 }, (_, i) =>
                    currentDate.clone().subtract(6 - i, 'days').format('YYYY-MM-DD')
                );
            case '1m':
                return Array.from({ length: 30 }, (_, i) =>
                    currentDate.clone().subtract(29 - i, 'days').format('YYYY-MM-DD')
                );
            default:
                return [currentDate.format('YYYY-MM-DD')];
        }
    }, [selectedRange, currentDate]);

    const filteredData = useMemo(
        () => data.data.filter(entry => dateRange.includes(entry.calendarDate)),
        [data.data, dateRange]
    );

    const { labels, heartRates, isLineChart } = useMemo(() => {
        if (selectedRange === '1d') {
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

                    const dateObj = new Date(localEpochSec * 1000);
                    const hour = dateObj.getHours();

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
                return 0;
            });

            return {
                labels: hours,
                heartRates: averagedHourly,
                isLineChart: true,
            };
        } else {
            const labels = dateRange.map(date => moment(date).format('MMM D'));
            const heartRates = dateRange.map(date => {
                const entry = filteredData.find(e => e.calendarDate === date);
                return entry ? entry.data.averageHeartRateInBeatsPerMinute : 0;
            });

            return {
                labels,
                heartRates,
                isLineChart: false,
            };
        }
    }, [selectedRange, filteredData, dateRange]);

    const heartRateChartData = useMemo(() => ({
        labels,
        datasets: [
            {
                data: heartRates,
                color: () => '#FF6347',
                strokeWidth: 2,
            },
        ],
    }), [labels, heartRates]);

    const chartConfig = useMemo(() => ({
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 0,
        yAxisInterval: 10,
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#e0e0e0',
        },
        propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#FF6347',
        },
    }), []);

    const handleChartTap = (value, index) => {
        const label = labels[index];
        setSelectedElement({ label, value });
        setModalVisible(true);
    };

    const renderNavigationHeader = () => {
        const getHeaderTitle = () => {
            switch (selectedRange) {
                case '1d':
                    return currentDate.format('MMMM D, YYYY');
                case '7d':
                    return `Week of ${currentDate.format('MMM D, YYYY')}`;
                case '1m':
                    return currentDate.format('MMMM YYYY');
                default:
                    return '';
            }
        };

        return (
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={handlePrevious} style={styles.navigationButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.dateWrapper}>
                        <FontAwesomeIcon icon={faCalendar} size={20} color="#2196F3" style={styles.calendarIcon} />
                        <Text style={styles.dateText}>{getHeaderTitle()}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} style={styles.navigationButton}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color="#000" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Heart Rate</Text>
            </View>

            {renderNavigationHeader()}

            <View style={styles.rangeSelector}>
                {['1d', '7d', '1m'].map(range => (
                    <TouchableOpacity
                        key={range}
                        style={[styles.rangeButton, selectedRange === range && styles.selectedRangeButton]}
                        onPress={() => setSelectedRange(range)}
                    >
                        <Text style={[styles.rangeButtonText, selectedRange === range && styles.selectedRangeButtonText]}>
                            {range === '1d' ? 'Day' : range === '7d' ? 'Week' : 'Month'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {heartRateChartData.datasets[0].data.some(hr => hr !== 0) ? (
                isLineChart ? (
                    <LineChart
                        data={heartRateChartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        yAxisSuffix=" bpm"
                        fromZero={true}
                        bezier
                        segments={4}
                        style={{ borderRadius: 8, marginVertical: 16 }}
                        onDataPointClick={({ value, index }) => handleChartTap(value, index)}
                    />
                ) : (
                    <BarChart
                        data={heartRateChartData}
                        width={screenWidth}
                        height={220}
                        yAxisSuffix=" bpm"
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        chartConfig={chartConfig}
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        onDataPointClick={({ value, index }) => handleChartTap(value, index)}
                    />
                )
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No heart rate data available for this period.</Text>
                </View>
            )}

            <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                {/*<FontAwesomeIcon icon={faHeart} size={24} color="#FF4081" />*/}
                                <Text style={styles.modalTitle}>Heart Rate Details</Text>
                            </View>
                            <Text style={styles.modalText}>Time: {selectedElement.label}</Text>
                            <Text style={styles.modalText}>Heart Rate: {selectedElement.value} BPM</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
};

export default HRDetailsScreen;
