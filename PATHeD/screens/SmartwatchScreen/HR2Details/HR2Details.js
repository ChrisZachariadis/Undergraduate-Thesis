import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {LineChart, BarChart} from 'react-native-gifted-charts';
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
    const [selectedIndex, setSelectedIndex] = useState(0); // Default to 'Day'
    const [error, setError] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));
    const [currentMonthStart, setCurrentMonthStart] = useState(moment().startOf('month'));
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
                // Day View – process the detailed heart rate samples to compute an hourly average.
                processedData = processDailyData(parsedData.data, currentDay);
            }


            else if (selectedIndex === 1) {
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
                    label: h.toString(),
                    frontColor: 'lightgrey'
                });
            }
            return emptyData;
        }

        // Retrieve the heart rate samples and timing information.
        const hrSamples = dayEntry.data.timeOffsetHeartRateSamples;
        const startTime = dayEntry.data.startTimeInSeconds; // in seconds (UTC)
        const startOffset = dayEntry.data.startTimeOffsetInSeconds; // in seconds (Athends Time)

        // Group samples by hour.
        // We'll store each sample as an object { offset, hr }.
        let hourlySamples = {}; // e.g. { 11: [ { offset: 33975, hr: 90 }, ... ] }
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
                hourlySamples[sampleHour].push({ offset: sampleOffset, hr: sampleValue });
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
                label: h.toString(),
                frontColor: getBarColor(avg),
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
                label: day.format('D'), // Day number, e.g., '1', '2', ..., '31'
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
        // Reset current period based on selection
        if (index === 0) {
            setCurrentDay(moment());
        } else if (index === 1) {
            setCurrentWeekStart(moment().startOf('week'));
        } else if (index === 2) {  // Month View
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
    let chartWidth = chartData.length * dynamicSpacing * 2 + 50 ;

    if (selectedIndex === 1) {
        dynamicBarWidth = 18;
        dynamicSpacing = 20;
        chartWidth = 300;
    } else if (selectedIndex === 2) {
        dynamicBarWidth = 10;
        dynamicSpacing = 6;
        chartWidth = 650;
    }



    return (
        <Frame style={styles.container}>
            <View style={styles.headerContainer}>

                {/*HEADER TITLE WITH ARROWS*/}
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedIndex === 0 ? (
                        <LineChart
                            data={chartData}
                            width={chartWidth}
                            height={300}
                            spacing={15}
                            thickness={2}
                            color="#FF6347"
                            hideDataPoints={false}
                            dataPointsRadius={4}
                            dataPointsColor="#FF6347"
                            xAxisLabelTextStyle={styles.axisLabel}
                            yAxisLabelTextStyle={styles.axisLabel}
                            noOfSections={6}

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
                    )}
                </ScrollView>
            </View>

        </Frame>

    );
};
export default HR2Details;
