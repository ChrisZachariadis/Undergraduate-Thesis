// HR2Details.js
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import Frame from '../components/Frame';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {styles} from './styles';

const screenWidth = Dimensions.get('window').width;

const HR2Details = () => {
    // State variables
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(1); // Default to 'Week'
    const [error, setError] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week')); // Sunday as start
    const [currentMonthStart, setCurrentMonthStart] = useState(moment().startOf('month')); // First day of month
    const [currentDay, setCurrentDay] = useState(moment()); // For Day view

    // Fetch HR data from AsyncStorage on component mount and when relevant state changes
    useEffect(() => {
        fetchHRData();
    }, [currentWeekStart, currentMonthStart, selectedIndex, currentDay]);

    // Function to fetch HR data
    const fetchHRData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('@garminData');
            const parsedData = JSON.parse(storedData);
            let processedData = [];
            if (selectedIndex === 0) {
                // Day View
                processedData = processDailyData(parsedData.data, currentDay);
            } else if (selectedIndex === 1) {
                // Week View
                processedData = processWeeklyData(parsedData.data, currentWeekStart);
            } else if (selectedIndex === 2) {
                // Month View
                processedData = processMonthlyData(parsedData.data, currentMonthStart);
            }
            setChartData(processedData);
        } catch (err) {
            console.error('Error fetching HR data:', err);
            setError('Failed to load data.');
            Alert.alert('Error', 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to process data for the specified day
    // Function to process data for the specified day
    const processDailyData = (data, dayMoment) => {
        const formattedDay = dayMoment.format('YYYY-MM-DD');

        // Find the day's entry in 'data'
        const dayEntry = data.find((item) => item.calendarDate === formattedDay);

        // If no entry for that day, just return 24 zero-values
        if (!dayEntry) {
            return Array.from({ length: 24 }, (_, hour) => ({
                value: 0,
                label: `${hour}:00`,
                frontColor: 'lightgrey',
            }));
        }

        // Extract heart-rate samples map:
        //   keys = second offsets, values = HR at that time
        const { timeOffsetHeartRateSamples = {}, startTimeOffsetInSeconds = 0 } = dayEntry.data;

        // Prepare arrays to accumulate sums & counts for each hour
        const sums = new Array(24).fill(0);
        const counts = new Array(24).fill(0);

        // Convert each offset into an hour index (0–23)
        for (const [offsetSecStr, heartRate] of Object.entries(timeOffsetHeartRateSamples)) {
            const offsetSec = parseInt(offsetSecStr, 10);

            // Adjust if needed by subtracting any startTimeOffsetInSeconds
            // so that 0 <= hour < 24 aligns with the local day
            const localSec = offsetSec - startTimeOffsetInSeconds;
            const hour = Math.floor(localSec / 3600);

            if (hour >= 0 && hour < 24) {
                sums[hour] += heartRate;
                counts[hour] += 1;
            }
        }

        // Build the final array with averages
        const hourData = sums.map((sum, hour) => {
            const count = counts[hour];
            const avgHR = count > 0 ? sum / count : 0;

            return {
                value: avgHR,
                label: `${hour}:00`,
                // Use your getBarColor() or custom color logic
                frontColor: avgHR > 0 ? '#FF6347' : 'lightgrey',
            };
        });

        return hourData;
    };


    // Function to process data for the specified week
    const processWeeklyData = (data, weekStart) => {
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const day = moment(weekStart).add(i, 'days');
            const formattedDay = day.format('YYYY-MM-DD');
            const dayName = day.format('ddd'); // e.g., 'Sun', 'Mon'

            // Find the data for the specific day
            const dayData = data.find((entry) => entry.calendarDate === formattedDay);

            // If data exists, use it; otherwise, set value to 0 or null
            weekDays.push({
                value: dayData ? dayData.data.averageHeartRateInBeatsPerMinute : 0,
                label: dayName,
                frontColor: dayData ? getBarColor(dayData.data.averageHeartRateInBeatsPerMinute) : 'lightgrey',
            });
        }

        return weekDays;
    };

    // Function to determine bar color based on HR value
    const getBarColor = (hr) => {
        if (hr <= 20) return 'grey';
        return '#FF6347';
    };

    // Function to process data for the specified month (Display each day)
    const processMonthlyData = (data, monthStart) => {
        const daysInMonth = monthStart.daysInMonth();
        const monthData = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const day = moment(monthStart).date(i);
            const formattedDay = day.format('YYYY-MM-DD');
            const dayEntry = data.find((entry) => entry.calendarDate === formattedDay);

            monthData.push({
                value: dayEntry ? dayEntry.data.averageHeartRateInBeatsPerMinute : 0,
                label: day.format('D'), // Day number, e.g., '1', '2', ..., '31'
                frontColor: dayEntry ? getBarColor(dayEntry.data.averageHeartRateInBeatsPerMinute) : 'lightgrey',
            });
        }

        return monthData;
    };

    // Handlers for navigating periods (day, week, or month)
    const handlePrevious = () => {
        if (selectedIndex === 0) {
            // Day View
            const previousDay = moment(currentDay).subtract(1, 'day');
            setCurrentDay(previousDay);
        } else if (selectedIndex === 1) {
            // Week View
            const previousWeek = moment(currentWeekStart).subtract(1, 'week');
            setCurrentWeekStart(previousWeek);
        } else if (selectedIndex === 2) {
            // Month View
            const previousMonth = moment(currentMonthStart).subtract(1, 'month');
            setCurrentMonthStart(previousMonth);
        }
    };

    const handleNext = () => {
        if (selectedIndex === 0) {
            // Day View
            const nextDay = moment(currentDay).add(1, 'day');
            // Prevent navigating to future days beyond today
            if (nextDay.isAfter(moment())) {
                Alert.alert('Invalid Action', 'Cannot navigate to future days.');
                return;
            }
            setCurrentDay(nextDay);
        } else if (selectedIndex === 1) {
            // Week View
            const nextWeek = moment(currentWeekStart).add(1, 'week');
            // Prevent navigating to future weeks beyond the current week
            if (nextWeek.isAfter(moment().startOf('week'))) {
                Alert.alert('Invalid Action', 'Cannot navigate to future weeks.');
                return;
            }
            setCurrentWeekStart(nextWeek);
        } else if (selectedIndex === 2) {
            // Month View
            const nextMonth = moment(currentMonthStart).add(1, 'month');
            // Prevent navigating to future months beyond the current month
            if (nextMonth.isAfter(moment().startOf('month'))) {
                Alert.alert('Invalid Action', 'Cannot navigate to future months.');
                return;
            }
            setCurrentMonthStart(nextMonth);
        }
    };

    // Handler for SegmentedControl changes
    const handleSegmentChange = (index) => {
        setSelectedIndex(index);
        // Reset loading state to fetch new data
        setIsLoading(true);
        // Reset currentWeekStart, currentMonthStart, or currentDay based on selection
        if (index === 0) {
            // Day View
            const today = moment();
            setCurrentDay(today);
        } else if (index === 1) {
            // Week View
            setCurrentWeekStart(moment().startOf('week'));
        } else if (index === 2) {
            // Month View
            setCurrentMonthStart(moment().startOf('month'));
        }
        // Fetch data for the selected view
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Simulate loading delay
    };

    // Format current date range for display based on selection
    const getDateRange = () => {
        if (selectedIndex === 0) {
            // Day View
            return moment(currentDay).format('MMMM D, YYYY');
        } else if (selectedIndex === 1) {
            // Week View
            const start = moment(currentWeekStart).format('MMM D');
            const end = moment(currentWeekStart).add(6, 'days').format('MMM D, YYYY');
            return `${start} - ${end}`;
        } else if (selectedIndex === 2) {
            // Month View
            const monthName = moment(currentMonthStart).format('MMMM YYYY');
            return `${monthName}`;
        }
        return '';
    };

    // Render loading indicator
    if (isLoading) {
        return (
            <Frame style={styles.loadingFrame}>
                <ActivityIndicator size="large" color="#FF6347"/>
                <Text style={styles.loadingText}>Loading...</Text>
            </Frame>
        );
    }

    // Render error message
    if (error) {
        return (
            <Frame style={styles.errorFrame}>
                <Text style={styles.errorText}>{error}</Text>
            </Frame>
        );
    }

    // Define dynamic bar width and spacing based on selectedIndex
    let dynamicBarWidth = 18;
    let dynamicSpacing = 20;
    let chartWidth = 270; // Default width

    if (selectedIndex === 0) {
        // Day View
        dynamicBarWidth = 20;
        dynamicSpacing = 10;
        chartWidth = screenWidth - 40; // Adjust based on screen size
    } else if (selectedIndex === 1) {
        // Week View
        dynamicBarWidth = 18;
        dynamicSpacing = 20;
        chartWidth = 270;
    } else if (selectedIndex === 2) {
        // Month View
        dynamicBarWidth = 10;
        dynamicSpacing = 10;
        chartWidth = chartData.length * (dynamicBarWidth + dynamicSpacing) + 50; // Dynamic width based on data points
        if (chartWidth < screenWidth - 40) {
            chartWidth = screenWidth - 40; // Ensure minimum width
        }
    }

    return (
        <Frame style={styles.container}>
            <View style={styles.headerContainer}>
                {/* Previous Period Arrow */}
                <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000"/>
                </TouchableOpacity>

                <Text style={styles.title}>Heart Rate Summary</Text>

                {/* Next Period Arrow */}
                <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color="#000"/>
                </TouchableOpacity>
            </View>

            {/* Date Range Display */}
            <Text style={styles.dateRangeText}>{getDateRange()}</Text>

            {/* Segmented Control */}
            <SegmentedControl
                style={styles.segmentedControl}
                values={['Day', 'Week', 'Month']}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    handleSegmentChange(event.nativeEvent.selectedSegmentIndex);
                }}
                tintColor="#FF6347"
                activeTextColor="#fff"
                inactiveTextColor="#000"
            />

            <View style={styles.graphContainer}>
                {chartData.length > 0 ? (
                    <ScrollView
                        horizontal={selectedIndex === 2} // Keep horizontal scrolling for Month only
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={selectedIndex === 2 ? styles.scrollContainer : null}
                    >
                        {
                            // If Day, show a LineChart; otherwise, show a BarChart
                            selectedIndex === 0 ? (
                                <LineChart
                                    data={chartData}
                                    width={chartWidth}
                                    height={200}
                                    spacing={dynamicSpacing}
                                    // Provide a thickness and color for the line
                                    thickness={2}
                                    color="#FF6347"
                                    // Show or hide data points:
                                    hideDataPoints={false}
                                    dataPointsColor="#FF6347"
                                    // Optional: how large you want the data point circles
                                    dataPointsRadius={3}
                                    // Optional: handle press on a specific point
                                    onPressPoint={(item, index) => {
                                        Alert.alert(
                                            `Time: ${item.label}`,
                                            `Average HR: ${item.value} bpm`,
                                            [{ text: 'OK' }],
                                            { cancelable: true }
                                        );
                                    }}
                                    // X and Y Axis Label style
                                    xAxisLabelTextStyle={styles.axisLabel}
                                    yAxisLabelTextStyle={styles.axisLabel}
                                    // You can also add more props, e.g. showXAxisIndices, showYAxisIndices, etc.
                                />
                            ) : (
                                <BarChart
                                    data={chartData}
                                    width={chartWidth}
                                    height={200}
                                    barWidth={dynamicBarWidth}
                                    spacing={dynamicSpacing}
                                    minHeight={3}
                                    barBorderRadius={3}
                                    noOfSections={4}
                                    yAxisThickness={0}
                                    xAxisThickness={1}
                                    xAxisLabelTextStyle={styles.axisLabel}
                                    yAxisLabelTextStyle={styles.axisLabel}
                                    isAnimated={false}
                                    dashGap={10}
                                    onPress={(item, index) => {
                                        Alert.alert(
                                            selectedIndex === 1
                                                ? `${item.label}`
                                                : `Day ${item.label}`,
                                            `Average HR: ${item.value} bpm`,
                                            [{ text: 'OK' }],
                                            { cancelable: true }
                                        );
                                    }}
                                />
                            )
                        }
                    </ScrollView>
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No heart rate data available for this period.</Text>
                    </View>
                )}
            </View>

        </Frame>

    );
};
export default HR2Details;
