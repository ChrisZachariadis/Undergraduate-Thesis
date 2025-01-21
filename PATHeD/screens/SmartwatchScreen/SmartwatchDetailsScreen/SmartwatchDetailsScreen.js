// SmartwatchDetailsScreen.jsx

import React, { useMemo } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

import styles from './style'; // Import your updated styles
import ProgressCircle from '../components/DayDetailView/ProgressCircle'; // Adjust the path as necessary
import data from '../data.json'; // Ensure the path is correct

const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

const SmartwatchDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { calendarDate, dayData } = route.params || {};

    // Handle the case where dayData might be undefined
    if (!dayData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
            </View>
        );
    }

    // Safely calculate steps and floors progress (0 to 1)
    const stepsGoal = dayData.stepsGoal || 1;
    const stepsProgress = dayData.steps / stepsGoal;

    const floorsGoal = dayData.floorsClimbedGoal || 1;
    const floorsProgress = dayData.floorsClimbed / floorsGoal;

    // --- Navigation for Previous and Next Days ---
    const allEntries = useMemo(() => data.data, []);
    const currentIndex = useMemo(
        () => allEntries.findIndex(entry => entry.calendarDate === calendarDate),
        [allEntries, calendarDate]
    );

    const handlePreviousDay = () => {
        if (currentIndex > 0) {
            const previousEntry = allEntries[currentIndex - 1];
            if (previousEntry) {
                navigation.navigate('SmartwatchDetailsScreen', {
                    calendarDate: previousEntry.calendarDate,
                    dayData: previousEntry.data,
                });
            }
        }
    };

    const handleNextDay = () => {
        if (currentIndex !== -1 && currentIndex < allEntries.length - 1) {
            const nextEntry = allEntries[currentIndex + 1];
            if (nextEntry) {
                navigation.navigate('SmartwatchDetailsScreen', {
                    calendarDate: nextEntry.calendarDate,
                    dayData: nextEntry.data,
                });
            }
        }
    };

    // --------------------------------------------
    //       PROCESS HEART RATE DATA FOR CHART
    // --------------------------------------------
    // Move all hook calls to the top level

    // Extract heart rate samples and related time data
    const {
        timeOffsetHeartRateSamples = {},
        startTimeInSeconds = 0,
        activeTimeInSeconds = 0, // Assuming this is a fixed offset
        startTimeOffsetInSeconds = 7200, // UTC+2 for Nicosia (adjust if necessary)
    } = dayData;

    // Convert heart rate samples object to an array and sort by offset
    const heartRateEntries = useMemo(
        () =>
            Object.entries(timeOffsetHeartRateSamples).sort(
                (a, b) => Number(a[0]) - Number(b[0])
            ),
        [timeOffsetHeartRateSamples]
    );

    // Data structure to accumulate sum/count per hour
    const hourMap = useMemo(() => {
        const map = {};
        heartRateEntries.forEach(([offsetStr, hr]) => {
            const offsetSec = Number(offsetStr);
            // Calculate the absolute UTC time of the sample
            const sampleTimeSec = startTimeInSeconds + offsetSec + activeTimeInSeconds;
            // Adjust to local timezone (Nicosia)
            const localEpochSec = sampleTimeSec + startTimeOffsetInSeconds;

            const dateObj = new Date(localEpochSec * 1000); // Convert to ms
            const hour = dateObj.getHours(); // 0 - 23

            if (!map[hour]) {
                map[hour] = { totalHR: 0, count: 0 };
            }
            map[hour].totalHR += hr;
            map[hour].count += 1;
        });
        return map;
    }, [heartRateEntries, startTimeInSeconds, activeTimeInSeconds, startTimeOffsetInSeconds]);

    // Compute the average HR for each hour and ensure all 24 hours are present
    const hourlyAverages = useMemo(() => {
        return Array.from({ length: 24 }, (_, index) => {
            const hourData = hourMap[index];
            if (hourData && hourData.count > 0) {
                return parseFloat((hourData.totalHR / hourData.count).toFixed(0)); // Rounded
            } else {
                return null; // No data
            }
        });
    }, [hourMap]);

    // Prepare labels and data for the chart
    const labels = useMemo(() => {
        return Array.from({ length: 24 }, (_, index) => {
            if (index % 3 === 0) {
                return `${index}`; // "0", "3", "6", ..., "21"
            } else {
                return ''; // Empty label to reduce clutter
            }
        });
    }, []);

    // Define chart data structure
    const heartRateChartData = useMemo(() => {
        return {
            labels,
            datasets: [
                {
                    data: hourlyAverages.map(hr => (hr !== null ? hr : 0)), // Replace null with 0 or another default
                    color: () => '#FF6347', // Tomato color for HR chart
                    strokeWidth: 2,
                },
            ],
        };
    }, [labels, hourlyAverages]);

    // Define chart configuration
    const chartConfig = useMemo(() => ({
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and label color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label text color
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

    return (
        <ScrollView style={styles.container}>
            {/* Date with Navigation Arrows */}
            <View style={styles.dateContainer}>
                {/* Left Arrow */}
                <TouchableOpacity onPress={handlePreviousDay} disabled={currentIndex === 0}>
                    <Text style={[styles.arrow, currentIndex === 0 && styles.disabledArrow]}>&lt;</Text>
                </TouchableOpacity>

                {/* Date Text */}
                <Text style={styles.dateText}>Day: {calendarDate}</Text>

                {/* Right Arrow */}
                <TouchableOpacity onPress={handleNextDay} disabled={currentIndex === allEntries.length - 1}>
                    <Text style={[styles.arrow, currentIndex === allEntries.length - 1 && styles.disabledArrow]}>&gt;</Text>
                </TouchableOpacity>
            </View>

            {/* Circles Row */}
            <View style={styles.StepsFloorsContainer}>
                {/* Steps Circle */}
                <ProgressCircle
                    title="Steps"
                    progress={stepsProgress}
                    value={dayData.steps}
                    goal={dayData.stepsGoal}
                    color="#0C6C79"
                    onPress={() =>
                        navigation.navigate('StepsDetailsScreen', { dayData })
                    }
                    size={120}
                    unit="steps"
                />

                {/* Floors Climbed Circle */}
                <ProgressCircle
                    title="Floors Climbed"
                    progress={floorsProgress}
                    value={dayData.floorsClimbed}
                    goal={dayData.floorsClimbedGoal}
                    color="#4CAF50"
                    onPress={() =>
                        navigation.navigate('FloorsDetailsScreen', { dayData })
                    }
                    size={120}
                    unit="floors"
                />
            </View>

            {/* Average Heart Rate in a Rectangle Box */}
            <View style={styles.heartRateBox}>
                <View style={styles.heartRateHeader}>
                    <Text style={styles.heartRateTitle}>Average Heart Rate</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('HRDetailsScreen', { dayData })}>
                        <Text style={styles.arrowText}>&gt;</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.heartRateText}>
                    {dayData.averageHeartRateInBeatsPerMinute} bpm
                </Text>
            </View>

            {/* Hourly Average Heart Rate Chart */}
            <Text style={styles.chartTitle}>Hourly Average Heart Rate</Text>
            {heartRateChartData.datasets[0].data.some(hr => hr !== 0) ? (
                <LineChart
                    data={heartRateChartData}
                    width={screenWidth} // Adjust based on your container's padding
                    height={220}
                    chartConfig={chartConfig}
                    yAxisSuffix=" bpm"
                    fromZero={true} // Start y-axis at 0
                    bezier // Smooth curves
                    segments={4} // Number of horizontal grid lines
                    style={{
                        borderRadius: 8,
                        marginVertical: 16,
                    }}
                    withDots={true}
                    withShadow={false}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    transparent={false}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No heart rate data available.</Text>
                </View>
            )}

            {/* Additional Metrics */}
            <Text style={styles.label}>
                BMR Kilocalories: {dayData.bmrKilocalories}
            </Text>
            <Text style={styles.label}>
                Distance (m): {dayData.distanceInMeters}
            </Text>
            <Text style={styles.label}>
                Duration (sec): {dayData.durationInSeconds}
            </Text>
        </ScrollView>
    );

};

export default SmartwatchDetailsScreen;
