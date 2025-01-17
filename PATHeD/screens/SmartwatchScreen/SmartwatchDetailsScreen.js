import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import styles from './style';

const SmartwatchDetailsScreen = () => {
    const route = useRoute();
    const { calendarDate, dayData } = route.params || {};

    // Handle the case where dayData might be undefined
    if (!dayData) {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>No data available</Text>
            </View>
        );
    }

    // ------------------------
    //   Circle for Steps
    // ------------------------
    // Safely calculate steps progress (0 to 1)
    const stepsGoal = dayData.stepsGoal || 1; // fallback to avoid division by zero
    const stepsProgress = dayData.steps / stepsGoal;

    // ------------------------
    //   Circle for Stress
    // ------------------------
    // We’ll assume averageStressLevel goes from 0–10 (adjust if your scale is different)
    const averageStress = dayData.averageStressLevel || 0;
    const maxStress = 10; // define the upper limit for your stress scale
    const stressProgress = averageStress / maxStress; // yields a value between 0 and 1

    // Function to determine circle color based on stress level
    const getStressColor = (stressLevel) => {
        if (stressLevel >= 7) return 'red';    // high stress
        if (stressLevel >= 4) return 'orange'; // medium stress
        return 'green';                        // low stress
    };

    return (
        <ScrollView style={styles.container}>
            {/* Show the calendar date at the top */}
            <Text style={styles.dateText}>Day: {calendarDate}</Text>

            {/* ------------------------- */}
            {/* Circular Progress: Steps */}
            {/* ------------------------- */}
            <View style={styles.circleContainer}>
                <Progress.Circle
                    size={120}
                    progress={stepsProgress}   // between 0 and 1
                    thickness={8}
                    showsText={true}
                    color="#0C6C79"            // steps circle color
                    unfilledColor="#e0e0e0"
                    borderWidth={0}
                    formatText={() => `${dayData.steps}/${dayData.stepsGoal} steps`}
                />
            </View>

            {/* -------------------------- */}
            {/* Circular Progress: Stress */}
            {/* -------------------------- */}
            <View style={styles.circleContainer}>
                <Progress.Circle
                    size={120}
                    progress={stressProgress}          // between 0 and 1
                    thickness={8}
                    showsText={true}
                    color={getStressColor(averageStress)} // dynamically change color
                    unfilledColor="#e0e0e0"
                    borderWidth={0}
                    formatText={() => `Stress: ${averageStress}`}
                />
            </View>

            {/* ------------------ */}
            {/* Other Data Fields */}
            {/* ------------------ */}
            <Text style={styles.label}>Floors Climbed: {dayData.floorsClimbed}</Text>
            <Text style={styles.label}>Floors Goal: {dayData.floorsClimbedGoal}</Text>
            <Text style={styles.label}>BMR Kilocalories: {dayData.bmrKilocalories}</Text>
            <Text style={styles.label}>Distance (m): {dayData.distanceInMeters}</Text>
            <Text style={styles.label}>Duration (sec): {dayData.durationInSeconds}</Text>
            <Text style={styles.label}>
                Avg Heart Rate: {dayData.averageHeartRateInBeatsPerMinute}
            </Text>
        </ScrollView>
    );
};

export default SmartwatchDetailsScreen;
