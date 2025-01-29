// HR2Details.js
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Frame from '../components/Frame';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
            if (storedData !== null) {
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
            } else {
                // No data found
                Alert.alert('No Data', 'No heart rate data found in storage.');
                setChartData([]);
            }
        } catch (err) {
            console.error('Error fetching HR data:', err);
            setError('Failed to load data.');
            Alert.alert('Error', 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to process data for the specified day
    const processDailyData = (data, day) => {
        const formattedDay = day.format('YYYY-MM-DD');
        const hourData = [];

        for (let i = 0; i < 24; i++) {
            const hour = i;
            const hourLabel = `${hour}:00`;
            const hourEntry = data.find(
                (entry) => entry.calendarDate === formattedDay && entry.hour === hour
            );

            hourData.push({
                value: hourEntry ? hourEntry.data.averageHeartRateInBeatsPerMinute : 0,
                label: hourLabel,
                frontColor: hourEntry ? getBarColor(hourEntry.data.averageHeartRateInBeatsPerMinute) : 'lightgrey',
            });
        }

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
        if (hr <= 30) return 'grey';
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
                <ActivityIndicator size="large" color="#FF6347" />
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
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>Heart Rate Summary</Text>

                {/* Next Period Arrow */}
                <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowRight} size={24} color="#000" />
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

            {/* Bar Chart (Graph) */}
            <View style={styles.graphContainer}>
                {chartData.length > 0 ? (
                    <ScrollView horizontal={selectedIndex === 2} contentContainerStyle={selectedIndex === 2 ? styles.scrollContainer : null}>
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
                                    selectedIndex === 0
                                        ? `${item.label}`
                                        : selectedIndex === 1
                                            ? `${item.label}`
                                            : `Day ${item.label}`,
                                    `Average HR: ${item.value} bpm`,
                                    [{ text: 'OK' }],
                                    { cancelable: true }
                                );
                            }}
                        />
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

// Styles for the component
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center', // Centers everything except the graph
    },
    loadingFrame: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorFrame: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    arrowButton: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dateRangeText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    segmentedControl: {
        width: '80%',
        marginBottom: 20,
    },
    graphContainer: {
        alignSelf: 'stretch',
    },
    axisLabel: {
        fontSize: 12,
        color: 'grey',
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    noDataText: {
        fontSize: 16,
        color: 'grey',
    },
    scrollContainer: {
        paddingHorizontal: 10,
    },
});


export default HR2Details;
