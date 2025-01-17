import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import data from './data.json';
import styles from './style';

const GarminDataScreen = () => {
    const navigation = useNavigation();

    // The JSON has a "data" key which is an array:
    const garminEntries = data.data;

    return (
        <ScrollView style={styles.container}>
            {garminEntries.map((entry, index) => {
                const { calendarDate, data: dayData } = entry;

                // Each day is wrapped in a Pressable to navigate to the detail screen
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
                        {/* Show date and a brief summary */}
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
