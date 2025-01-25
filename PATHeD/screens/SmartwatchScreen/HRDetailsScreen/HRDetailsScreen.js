// HRDetailsScreen.js
import React, { useMemo, useState, useCallback } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';

// Import your external styles
import styles from './style';

// Import your data
import data from '../data.json';

const containerPadding = 16;
const screenWidth = Dimensions.get('window').width - containerPadding * 2; // Adjust for container padding

const HRDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { dayData } = route.params || {};

    const [selectedRange, setSelectedRange] = useState('7d');
    const [currentDate, setCurrentDate] = useState(
        moment(dayData?.calendarDate || new Date())
    );

    // ------------------------------------
    // State for the tooltip
    // ------------------------------------
    const [tooltipPos, setTooltipPos] = useState({
        x: 0, // Dynamic x position
        visible: false,
        value: 0,
        label: '',
    });

    const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

    // Animated value for tooltip opacity
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity value

    // Animation for tooltip (fade-in or fade-out)
    const handleFadeAnimation = (visible) => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 300, // Duration of animation
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    };

    // ==========================================
    // 1) Navigation handlers for previous/next
    // ==========================================
    const handlePrevious = useCallback(() => {
        setCurrentDate((prev) => {
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
        setCurrentDate((prev) => {
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

    // ==========================================
    // 2) Calculate the date range array
    // ==========================================
    const dateRange = useMemo(() => {
        switch (selectedRange) {
            case '1d':
                return [currentDate.format('YYYY-MM-DD')];
            case '7d':
                // Array of 7 days
                return Array.from({ length: 7 }, (_, i) =>
                    currentDate.clone().subtract(6 - i, 'days').format('YYYY-MM-DD')
                );
            case '1m':
                // Array of 30 days
                return Array.from({ length: 30 }, (_, i) =>
                    currentDate.clone().subtract(29 - i, 'days').format('YYYY-MM-DD')
                );
            default:
                return [currentDate.format('YYYY-MM-DD')];
        }
    }, [selectedRange, currentDate]);

    // ==========================================
    // 3) Filter data for those dates
    // ==========================================
    const filteredData = useMemo(() => {
        return data.data.filter((entry) => dateRange.includes(entry.calendarDate));
    }, [data.data, dateRange]);

    // ==========================================
    // 4) Build chart labels & data
    // ==========================================
    const { labels, heartRates, isLineChart, fullHours } = useMemo(() => {
        if (selectedRange === '1d') {
            // Full hours array
            const fullHours = Array.from({ length: 24 }, (_, i) => i.toString());

            // Display labels every 4 hours
            const displayLabels = fullHours.map((hour, i) => (i % 4 === 0 ? hour : ''));

            const hourlyData = Array.from({ length: 24 }, () => []);

            // Collect HR data by hour
            filteredData.forEach((entry) => {
                const {
                    timeOffsetHeartRateSamples = {},
                    startTimeInSeconds = 0,
                    activeTimeInSeconds = 0,
                    startTimeOffsetInSeconds = 7200, // UTC+2 for Nicosia (adjust if necessary)
                } = entry.data;

                Object.entries(timeOffsetHeartRateSamples).forEach(([offsetStr, hr]) => {
                    const offsetSec = Number(offsetStr);
                    const sampleTimeSec = startTimeInSeconds + offsetSec + activeTimeInSeconds;
                    // Convert to local epoch
                    const localEpochSec = sampleTimeSec + startTimeOffsetInSeconds;

                    const dateObj = new Date(localEpochSec * 1000);
                    const hour = dateObj.getHours();

                    if (hour >= 0 && hour < 24) {
                        hourlyData[hour].push(hr);
                    }
                });
            });

            // Average out hourly data
            const averagedHourly = hourlyData.map((arr) => {
                if (arr.length > 0) {
                    const sum = arr.reduce((a, b) => a + b, 0);
                    return parseFloat((sum / arr.length).toFixed(0));
                }
                return 0;
            });

            return {
                labels: displayLabels,
                heartRates: averagedHourly,
                isLineChart: true,
                fullHours, // Include fullHours for tooltip
            };
        } else {
            // For 7-day or 1-month ranges: daily average
            const formattedLabels = dateRange.map((date) => moment(date).format('MMM D'));
            const dailyRates = dateRange.map((date) => {
                const entry = filteredData.find((e) => e.calendarDate === date);
                return entry ? entry.data.averageHeartRateInBeatsPerMinute : 0;
            });

            return {
                labels: formattedLabels,
                heartRates: dailyRates,
                isLineChart: false,
            };
        }
    }, [selectedRange, filteredData, dateRange]);

    // Prepare chart data for either line or bar chart
    const heartRateChartData = useMemo(() => {
        // If 1d, use displayLabels; else, use formattedLabels
        const dataLabels = selectedRange === '1d' ? labels : labels;
        return {
            labels: dataLabels,
            datasets: [
                {
                    data: heartRates,
                    color: () => '#FF6347', // color override for the dataset
                    strokeWidth: 2,
                },
            ],
        };
    }, [labels, heartRates, selectedRange]);

    // ChartKit config
    const chartConfig = useMemo(
        () => ({
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
                r: '4',
                strokeWidth: '2',
                stroke: '#FF6347',
            },
        }),
        []
    );

    // ==========================================
    // 5) Tooltip click handler
    // ==========================================
    const handleDataPointClick = ({ value, index, x }) => {
        const tooltipWidth = 120; // Adjusted width for better display
        const fixedY = -60; // Fixed y position above the chart

        let adjustedX = x - tooltipWidth / 2;

        // Ensure the tooltip doesn't go off the left edge
        if (adjustedX < 0) adjustedX = 0;

        // Ensure the tooltip doesn't go off the right edge
        if (adjustedX + tooltipWidth > screenWidth) adjustedX = screenWidth - tooltipWidth;

        // Set tooltip position with fixed y and dynamic x
        setTooltipPos({
            x: adjustedX,
            visible: true,
            value,
            label: selectedRange === '1d' ? `Hour ${fullHours[index]}:00` : labels[index],
        });

        // Trigger fade-in animation
        handleFadeAnimation(true);
    };

    // ==========================================
    // 6) Render a small header with date nav
    // ==========================================
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

                <TouchableOpacity>
                    <View style={styles.dateWrapper}>
                        <FontAwesomeIcon
                            icon={faCalendar}
                            size={20}
                            color="#2196F3"
                            style={styles.calendarIcon}
                        />
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
        // Wrap the entire screen in TouchableWithoutFeedback to handle outside taps
        <TouchableWithoutFeedback
            onPress={() => {
                handleFadeAnimation(false);
                setTooltipPos((prev) => ({ ...prev, visible: false }));
            }}
        >
            <View style={{ flex: 1, position: 'relative', padding: containerPadding }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Heart Rate</Text>
                    </View>

                    {renderNavigationHeader()}

                    <View style={styles.rangeSelector}>
                        {['1d', '7d', '1m'].map((range) => (
                            <TouchableOpacity
                                key={range}
                                style={[
                                    styles.rangeButton,
                                    selectedRange === range && styles.selectedRangeButton,
                                ]}
                                onPress={() => setSelectedRange(range)}
                            >
                                <Text
                                    style={[
                                        styles.rangeButtonText,
                                        selectedRange === range && styles.selectedRangeButtonText,
                                    ]}
                                >
                                    {range === '1d' ? 'Day' : range === '7d' ? 'Week' : 'Month'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* =====================================
                        7) Chart Wrapper with Tooltip
                    ===================================== */}
                    <View style={styles.chartWrapper}>
                        {tooltipPos.visible && (
                            <Animated.View
                                style={[
                                    styles.tooltipContainer,
                                    {
                                        left: tooltipPos.x,
                                        // top is fixed in styles.tooltipContainer
                                        opacity: fadeAnim, // Bind opacity to animated value
                                    },
                                ]}
                                onLayout={(event) => {
                                    const { width, height } = event.nativeEvent.layout;
                                    setTooltipSize({ width, height });
                                }}
                            >
                                <Text style={styles.tooltipText}>
                                    {tooltipPos.label}: {tooltipPos.value} bpm
                                </Text>
                                <View style={styles.tooltipPointer} />
                            </Animated.View>
                        )}
                        {heartRateChartData.datasets[0].data.some((hr) => hr !== 0) ? (
                            isLineChart ? (
                                <LineChart
                                    data={heartRateChartData}
                                    width={screenWidth}
                                    height={400} // Increased height for better visibility
                                    chartConfig={chartConfig}
                                    fromZero={true}
                                    bezier
                                    segments={4}
                                    style={styles.chartContainer}
                                    onDataPointClick={handleDataPointClick}
                                />
                            ) : (
                                <BarChart
                                    data={heartRateChartData}
                                    width={screenWidth}
                                    height={300} // Increased height for better visibility
                                    fromZero={true}
                                    showValuesOnTopOfBars={true}
                                    chartConfig={chartConfig}
                                    style={styles.chartContainer}
                                    onDataPointClick={handleDataPointClick}
                                />
                            )
                        ) : (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    No heart rate data available for this period.
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Tooltip is now inside the chartWrapper, so no need to render it here */}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HRDetailsScreen;
