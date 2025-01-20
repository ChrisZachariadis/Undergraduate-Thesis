import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { LineChart } from 'react-native-chart-kit';

import styles from './style'; // Import styles from style.js

const SmartwatchDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation(); // <--- Add this
    const { calendarDate, dayData } = route.params || {};

    // Handle the case where dayData might be undefined
    if (!dayData) {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>No data available</Text>
            </View>
        );
    }

    // Define circle size
    const screenWidth = Dimensions.get('window').width;
    const circleSize = screenWidth / 3; // Adjust the divisor to fit your design

    // Safely calculate steps progress (0 to 1)
    const stepsGoal = dayData.stepsGoal || 1;
    const stepsProgress = dayData.steps / stepsGoal;

    // Floors Climbed Circle
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
            return `${index}`; // Show "0", "3", "6", ...
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
    const chartConfig = {
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis/label color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: '#ADD8E6',
        },
        decimalPlaces: 0,
        yAxisInterval: 10,
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: '#e0e0e0',
        },
    };

    return (
        <ScrollView style={styles.container}>
            {/* Show the calendar date at the top */}
            <Text style={styles.dateText}>Day: {calendarDate}</Text>

            {/* Circles Row */}
            <View style={styles.StepsFloorsContainer}>
                {/* Steps Circle with Title */}
                <View style={styles.Frame}>
                    <View style={styles.circleWithTitle}>
                        <Text style={styles.circleTitle}>Steps</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // Navigate to StepsDetails and pass dayData or any other params
                                navigation.navigate('StepsDetailsScreen', { dayData });
                            }}
                        >
                            <View style={[styles.stepsCircleWrapper, { width: circleSize, height: circleSize }]}>
                                <Progress.Circle
                                    size={circleSize}
                                    progress={stepsProgress}
                                    thickness={8}
                                    color="#0C6C79"
                                    unfilledColor="#f0f0f0"
                                    borderWidth={0}
                                    showsText={false}
                                />
                                <View style={styles.stepsOverlayTextContainer}>
                                    <Text style={styles.stepsText}>
                                        {dayData.steps}
                                    </Text>
                                    <Text style={styles.stepsGoalText}>
                                        {`${dayData.stepsGoal} steps`}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Floors Climbed Circle with Title */}
                <View style={styles.Frame}>
                    <View style={styles.circleWithTitle}>
                        <Text style={styles.circleTitle}>Floors Climbed</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // Navigate to FloorsDetails and pass dayData or any other params
                                navigation.navigate('FloorsDetailsScreen', { dayData });
                            }}
                        >
                            <View style={[styles.floorsCircleWrapper, { width: circleSize, height: circleSize }]}>
                                <Progress.Circle
                                    size={circleSize}
                                    progress={floorsProgress}
                                    thickness={8}
                                    color="#4CAF50"
                                    unfilledColor="#f0f0f0"
                                    borderWidth={0}
                                    showsText={false}
                                />
                                <View style={styles.floorsOverlayTextContainer}>
                                    <Text style={styles.floorsText}>
                                        {dayData.floorsClimbed}
                                    </Text>
                                    <Text style={styles.floorsGoalText}>
                                        {`${dayData.floorsClimbedGoal} floors`}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Hourly Average Heart Rate Chart */}
            <Text style={[styles.label, { marginTop: 24, fontWeight: 'bold', fontSize: 18 }]}>
                Hourly Average Heart Rate
            </Text>
            {hourlyAverages.some((hr) => hr !== null) ? (
                <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    yAxisSuffix=" bpm"
                    fromZero
                    bezier
                    segments={4}
                    style={{
                        borderRadius: 8,
                        marginVertical: 16,
                    }}
                    withDots
                    withShadow={false}
                    withVerticalLabels
                    withHorizontalLabels
                    transparent={false}

                />
            ) : (
                <Text style={styles.label}>No heart rate data available.</Text>
            )}

            {/* Other Data Fields */}
            <Text style={styles.label}>Avg Heart Rate: {dayData.averageHeartRateInBeatsPerMinute}</Text>
            <Text style={styles.label}>BMR Kilocalories: {dayData.bmrKilocalories}</Text>
            <Text style={styles.label}>Distance (m): {dayData.distanceInMeters}</Text>
            <Text style={styles.label}>Duration (sec): {dayData.durationInSeconds}</Text>
            <Text style={styles.label}>Floors Climbed: {dayData.floorsClimbed}</Text>
            <Text style={styles.label}>Floors Goal: {dayData.floorsClimbedGoal}</Text>
        </ScrollView>
    );
};

export default SmartwatchDetailsScreen;
