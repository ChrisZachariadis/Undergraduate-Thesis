// GarminDataScreen.jsx

import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import data from './data.json';
import styles from './style';
import ProgressCircle from './components/DayDetailView/ProgressCircle'; // Adjust path if needed

const GarminDataScreen = () => {
    const navigation = useNavigation();

    // The JSON has a "data" key which is an array:
    const garminEntries = data.data; // e.g., [ { calendarDate: '2025-01-20', data: {...} }, ...]

    // --- Determine today's date in YYYY-MM-DD format ---
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`; // e.g., "2025-01-20"

    // --- Find the "today" entry if it exists ---
    const todayEntry = garminEntries.find(entry => entry.calendarDate === todayStr);
    const otherEntries = garminEntries.filter(entry => entry.calendarDate !== todayStr);

    return (
        <ScrollView style={styles.container}>

            {/* 1) Show "Today" details (if found) */}
            {todayEntry ? (
                <View style={styles.todayContainer}>
                    <Text style={styles.title}>Today's Details ({todayEntry.calendarDate})</Text>

                    {/* Reuse ProgressCircle components */}
                    <View style={styles.StepsFloorsContainer}>
                        {/* Steps Circle */}
                        <ProgressCircle
                            title="Steps"
                            progress={todayEntry.data.steps / (todayEntry.data.stepsGoal || 1)}
                            value={todayEntry.data.steps}
                            goal={todayEntry.data.stepsGoal}
                            color="#0C6C79"
                            onPress={() =>
                                navigation.navigate('StepsDetailsScreen', { dayData: todayEntry.data })
                            }
                            size={100} // Slightly smaller for summary
                            unit="steps"
                        />

                        {/* Floors Climbed Circle */}
                        <ProgressCircle
                            title="Floors Climbed"
                            progress={todayEntry.data.floorsClimbed / (todayEntry.data.floorsClimbedGoal || 1)}
                            value={todayEntry.data.floorsClimbed}
                            goal={todayEntry.data.floorsClimbedGoal}
                            color="#4CAF50"
                            onPress={() =>
                                navigation.navigate('FloorsDetailsScreen', { dayData: todayEntry.data })
                            }
                            size={100} // Slightly smaller for summary
                            unit="floors"
                        />
                    </View>

                    {/* Optionally, add more summary details here */}
                    <Pressable
                        style={styles.detailButton}
                        onPress={() =>
                            navigation.navigate('SmartwatchDetailsScreen', {
                                calendarDate: todayEntry.calendarDate,
                                dayData: todayEntry.data,
                            })
                        }
                    >
                        <Text style={styles.detailButtonText}>View Full Graph & Detail</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.noTodayContainer}>
                    <Text style={styles.title}>No data for today</Text>
                </View>
            )}

            {/* 2) Display the other days below in a pressable list */}
            {otherEntries.map((entry, index) => {
                const { calendarDate, data: dayData } = entry;
                return (
                    <Pressable
                        key={index}
                        style={styles.dayContainer}
                        onPress={() =>
                            navigation.navigate('SmartwatchDetailsScreen', {
                                calendarDate: calendarDate,
                                dayData: dayData,
                            })
                        }
                    >
                        <Text style={styles.dateText}>{calendarDate}</Text>
                        <Text style={styles.label}>
                            Steps: {dayData.steps} / Goal: {dayData.stepsGoal}
                        </Text>
                        <Text style={styles.label}>
                            Avg Heart Rate: {dayData.averageHeartRateInBeatsPerMinute || 'N/A'}
                        </Text>
                    </Pressable>
                );
            })}

        </ScrollView>
    );
};

export default GarminDataScreen;
