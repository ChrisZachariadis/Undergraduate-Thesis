// SmartwatchDetailsScreen.jsx

import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';

import styles from './style'; // Ensure this is correct
import ProgressCircle from '../components/DayDetailView/ProgressCircle'; // Adjust path if needed

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

    // --------------------------------------------
    //       GROUP HEART RATE DATA BY HOUR
    // --------------------------------------------
    const {
        timeOffsetHeartRateSamples = {},
        startTimeInSeconds = 0,
        activeTimeInSeconds = 0, // Assuming this is a fixed offset
        startTimeOffsetInSeconds = 7200, // UTC+2 for Nicosia (adjust if necessary)
    } = dayData;

    // Convert heart rate samples object to an array and sort by offset
    const heartRateEntries = Object.entries(timeOffsetHeartRateSamples).sort(
        (a, b) => Number(a[0]) - Number(b[0])
    );

    // Data structure to accumulate sum/count per hour
    const hourMap = {}; // { [hour: number]: { totalHR: number, count: number } }

    heartRateEntries.forEach(([offsetStr, hr]) => {
        const offsetSec = Number(offsetStr);
        // Calculate the absolute UTC time of the sample
        const sampleTimeSec = startTimeInSeconds + offsetSec + activeTimeInSeconds;
        // Adjust to local timezone (Nicosia)
        const localEpochSec = sampleTimeSec + startTimeOffsetInSeconds;

        const dateObj = new Date(localEpochSec * 1000); // Convert to ms
        const hour = dateObj.getHours(); // 0 - 23

        if (!hourMap[hour]) {
            hourMap[hour] = { totalHR: 0, count: 0 };
        }
        hourMap[hour].totalHR += hr;
        hourMap[hour].count += 1;
    });

    // Compute the average HR for each hour and ensure all 24 hours are present
    const hourlyAverages = Array.from({ length: 24 }, (_, index) => {
        const hourData = hourMap[index];
        if (hourData && hourData.count > 0) {
            return parseFloat((hourData.totalHR / hourData.count).toFixed(0)); // Rounded
        } else {
            return null; // No data
        }
    });

    // Prepare labels and data for the chart
    const labels = Array.from({ length: 24 }, (_, index) => {
        if (index % 3 === 0) {
            return `${index}`; // "0", "3", "6", ..., "21"
        } else {
            return ''; // Empty label
        }
    });

    const dataValues = hourlyAverages;

    // Define chart data structure
    const chartData = {
        labels,
        datasets: [
            {
                data: dataValues,
                color: () => '#ADD8E6', // Light Blue
                strokeWidth: 2,
            },
        ],
    };

    // Define chart configuration
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis and label color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label text color
        propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#ADD8E6', // Light Blue stroke for dots
        },
        decimalPlaces: 0, // No decimals
        yAxisInterval: 10, // Optional: adjust based on your data range
        propsForBackgroundLines: {
            strokeDasharray: '', // Solid lines
            stroke: '#e0e0e0', // Light grey grid lines
        },
    };

    return (
        <ScrollView style={styles.container}>
            {/* Show the calendar date at the top */}
            <Text style={styles.dateText}>Day: {calendarDate}</Text>

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

            {/* Hourly Average Heart Rate Chart */}
            <Text style={styles.chartTitle}>
                Hourly Average Heart Rate
            </Text>
            {hourlyAverages.some((hr) => hr !== null) ? (
                <LineChart
                    data={chartData}
                    width={screenWidth - 32} // Adjust based on your container's padding
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
                <Text style={styles.label}>No heart rate data available.</Text>
            )}

            {/* Other Data Fields */}
            <Text style={styles.label}>
                Avg Heart Rate: {dayData.averageHeartRateInBeatsPerMinute}
            </Text>
            <Text style={styles.label}>
                Floors Climbed: {dayData.floorsClimbed}
            </Text>
            <Text style={styles.label}>
                Floors Goal: {dayData.floorsClimbedGoal}
            </Text>
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
