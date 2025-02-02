import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal
} from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import Frame from '../components/Frame';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { styles } from './styles';

const HR2Details = () => {
    // State variables
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0); // 0: Day, 1: Week, 2: Month
    const [error, setError] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));
    const [currentMonthStart, setCurrentMonthStart] = useState(moment().startOf('month'));
    const [currentDay, setCurrentDay] = useState(moment()); // For Day view

    // New state for tooltip modal
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipLeft, setTooltipLeft] = useState(0);
    const [tooltipIndex, setTooltipIndex] = useState(null);

    // Chart settings (used for computing tooltip left offset)
    let dynamicBarWidth = 18;
    let dynamicSpacing = 20;
    let initialSpacing = 1; // default for day view
    let chartWidth = 355;
    // For line chart (Day view) we use different spacing values:
    const lineSpacing = 14;
    const lineInitialSpacing = 6;

    if (selectedIndex === 1) {
        dynamicBarWidth = 28;
        dynamicSpacing = 20;
        chartWidth = 350;
        initialSpacing = 10;
    } else if (selectedIndex === 2) {
        dynamicBarWidth = 10;
        dynamicSpacing = 1;
        chartWidth = 380;
    }

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
                // Day View – process the detailed heart rate samples to compute an hourly average.
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
            setError('Failed to load data.');
            Alert.alert('Error', 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };


    // Function to process data for the specified day:
    // This groups the 15-second HR samples into 24 hourly buckets.
    const processDailyData = (data, dayMoment) => {
        const dayStr = dayMoment.format("YYYY-MM-DD");
        const dayEntry = data.find((entry) => entry.calendarDate === dayStr);

        if (!dayEntry) {
            console.log(`No data for ${dayStr}`);
            // Return an array with 24 hours set to 0 if no data is found.
            let emptyData = [];
            for (let h = 0; h < 24; h++) {
                emptyData.push({
                    value: 0,
                    label: h % 3 === 0 ? h.toString() : '',
                    frontColor: 'lightgrey'
                });
            }
            return emptyData;
        }

        // Retrieve the heart rate samples and timing information.
        const hrSamples = dayEntry.data.timeOffsetHeartRateSamples;
        const startTime = dayEntry.data.startTimeInSeconds; // in seconds (UTC)
        const startOffset = dayEntry.data.startTimeOffsetInSeconds; // in seconds (Local)

        // Group samples by hour.
        // Using Moment in UTC mode to get the intended hour.
        let hourlySamples = {};
        for (const offsetStr in hrSamples) {
            if (hrSamples.hasOwnProperty(offsetStr)) {
                const sampleValue = hrSamples[offsetStr];
                const sampleOffset = parseInt(offsetStr, 10);

                // time = startTimeInSeconds (UTC) + startTimeOffsetInSeconds (Local) + sampleOffset)
                const totalSeconds = startTime + startOffset + sampleOffset;
                const sampleHour = moment.unix(totalSeconds).utc().hour();

                // Initialize the bucket if needed.
                if (!hourlySamples[sampleHour]) {
                    hourlySamples[sampleHour] = [];
                }
                // Push an object with both the raw offset and HR value.
                hourlySamples[sampleHour].push({offset: sampleOffset, hr: sampleValue});
            }
        }

        // DEBUG: For each hour, log all the samples (raw offset and HR).
        console.log(dayEntry.calendarDate);
        for (let h = 0; h < 24; h++) {
            if (hourlySamples[h] && hourlySamples[h].length > 0) {
                console.log(`Samples for hour ${h} (from ${h}:00 to ${h + 1}:00):`);
                hourlySamples[h].forEach(sample => {
                    console.log(`   Raw Offset: ${sample.offset} sec, HR: ${sample.hr}`);
                });
            } else {
                console.log(`Hour ${h} (from ${h}:00 to ${h + 1}:00): No samples`);
            }
        }

        // Now, compute the hourly average for each hour.
        // Using indices 0 to 23 (so the first data point is at index 0)
        let hourData = [];
        for (let h = 0; h < 24; h++) {
            let samples = hourlySamples[h] || [];
            let avg = 0;
            if (samples.length > 0) {
                // Extract only the heart rate values.
                const hrValues = samples.map(sample => sample.hr);
                const sum = hrValues.reduce((acc, val) => acc + val, 0);
                avg = Math.round(sum / hrValues.length);

            }
            hourData.push({
                value: avg,
                // Only display the label for every 3rd hour
                label: (h %  3 === 0) ? h.toString() : '',
                frontColor: getBarColor(avg)
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
                // Show label only if it is the first day or (day number - 1) is divisible by 3 or last day
                label: (i === 1 || (i - 1) % 3 === 0 || i === daysInMonth) ? day.format('D') : '',
                frontColor: dayEntry ? getBarColor(dayEntry.data.averageHeartRateInBeatsPerMinute) : 'lightgrey',
            });
        }

        return monthData;
    };

    // Function to determine the bar (or point) color based on HR value.
    // You can adjust the thresholds as needed.
    const getBarColor = (hr) => {
        if (hr <= 20) return 'grey';
        return '#FF6347';
    };

    // Handlers for navigating periods (day, week, or month)
    const handlePrevious = () => {
        if (selectedIndex === 0) {
            setCurrentDay(moment(currentDay).subtract(1, 'day'));
        } else if (selectedIndex === 1) {
            setCurrentWeekStart(moment(currentWeekStart).subtract(1, 'week'));
        } else if (selectedIndex === 2) {
            setCurrentMonthStart(moment(currentMonthStart).subtract(1, 'month'));
        }
    };

    const handleNext = () => {
        if (selectedIndex === 0) {
            const nextDay = moment(currentDay).add(1, 'day');
            if (nextDay.isAfter(moment())) {
                Alert.alert('Invalid Action', 'Cannot navigate to future days.');
                return;
            }
            setCurrentDay(nextDay);
        } else if (selectedIndex === 1) {
            const nextWeek = moment(currentWeekStart).add(1, 'week');
            if (nextWeek.isAfter(moment().startOf('week'))) {
                Alert.alert('Invalid Action', 'Cannot navigate to future weeks.');
                return;
            }
            setCurrentWeekStart(nextWeek);
        } else if (selectedIndex === 2) {
            const nextMonth = moment(currentMonthStart).add(1, 'month');
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
        // Reset current period based on selection
        if (index === 0) {
            setCurrentDay(moment());
        } else if (index === 1) {
            setCurrentWeekStart(moment().startOf('week'));
        } else if (index === 2) {
            setCurrentMonthStart(moment().startOf('month'));
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // loading delay so the graph data can properly load
    };

    // Format current date range for display based on selection
    const getDateRange = () => {
        if (selectedIndex === 0) {
            return moment(currentDay).format('MMMM D, YYYY');
        } else if (selectedIndex === 1) {
            const start = moment(currentWeekStart).format('MMM D');
            const end = moment(currentWeekStart).add(6, 'days').format('MMM D, YYYY');
            return `${start} - ${end}`;
        } else if (selectedIndex === 2) {
            return moment(currentMonthStart).format('MMMM YYYY');
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

    return (
        <Frame padding={1} marginHorizontal={3} style={styles.container}>
            <View style={styles.headerContainer}>

                {/*HEADER TITLE WITH ARROWS*/}
                <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#000" />
                </TouchableOpacity>

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

            <View style={styles.graphContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedIndex === 0 ? (
                        <LineChart
                            data={chartData}
                            width={chartWidth}
                            height={250}
                            spacing={14}
                            initialSpacing={lineInitialSpacing}
                            thickness={2}
                            color="#FF6347"
                            disableScroll={true}
                            hideDataPoints={false}
                            dataPointsRadius={4}
                            dataPointsColor="#FF6347"
                            xAxisLabelTextStyle={styles.axisLabel}
                            noOfSections={6}
                            // onDataPointPress added for linear chart (same as for bar chart)
                            onPress={(item, index) => {
                                // For LineChart use line chart spacing values
                                const left = lineInitialSpacing + index * lineSpacing - 20; // subtract 20 to center tooltip
                                setTooltipLeft(left);
                                setTooltipData(item);
                                setTooltipIndex(index);
                                setTooltipVisible(true);
                            }}
                        />
                    ) : (
                        <BarChart
                            data={chartData}
                            width={chartWidth}
                            height={250}
                            disableScroll={true}
                            barWidth={dynamicBarWidth}
                            spacing={dynamicSpacing}
                            initialSpacing={initialSpacing}
                            minHeight={3}
                            barBorderRadius={3}
                            noOfSections={4}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            xAxisLabelTextStyle={styles.axisLabel}
                            yAxisTextStyle={styles.yaxisLabel}
                            isAnimated={false}
                            dashGap={35}
                            onPress={(item, index) => {
                                // Compute left offset based on index for BarChart
                                const left = initialSpacing + index * (dynamicBarWidth + dynamicSpacing) - 20; // subtract 20 to center tooltip
                                setTooltipLeft(left);
                                setTooltipData(item);
                                setTooltipIndex(index);
                                setTooltipVisible(true);
                            }}
                        />
                    )}
                </ScrollView>
            </View>

            {/* Tooltip Modal */}
            {tooltipVisible && tooltipData && (
                <Modal transparent animationType="fade">
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => setTooltipVisible(false)}
                    >
                        {/*
              Adjust "bottom" as needed to position the tooltip above the bar/data point.
              Here we use a fixed value (e.g. bottom: 300) for demonstration.
            */}
                        <View
                            style={{
                                position: 'absolute',
                                left: tooltipLeft,
                                bottom: 300,
                                backgroundColor: 'white',
                                padding: 8,
                                borderRadius: 4,
                                borderWidth: 1,
                                borderColor: '#e0e0e0',
                                shadowColor: '#000',
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 4,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                {selectedIndex === 0
                                    ? `Hour ${tooltipData.label || tooltipIndex}`
                                    : selectedIndex === 1
                                        ? `${tooltipData.label}`  // weekly labels are day names
                                        : `Day ${tooltipData.label || tooltipIndex + 1}`}
                            </Text>
                            <Text>{`Average HR: ${tooltipData.value} bpm`}</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </Frame>

    );
};
export default HR2Details;
