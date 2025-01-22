// GarminDataScreen.js

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import data from './data.json';
import styles from './style';

const GarminDataScreen = () => {
    const navigation = useNavigation();
    const [isConnected, setIsConnected] = useState(false);

    const garminEntries = data.data;

    const todayStr = new Date().toISOString().split('T')[0];

    const todayEntry = garminEntries.find(entry => entry.calendarDate === todayStr);
    const otherEntries = garminEntries.filter(entry => entry.calendarDate !== todayStr);

    const handleGarminConnect = () => {
        Linking.openURL('https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310');
        setIsConnected(true);
    };

    return (
        <View style={styles.container}>
            {!isConnected && (
                <View style={styles.topSection}>
                    <Pressable style={styles.connectButton} onPress={handleGarminConnect}>
                        <Text style={styles.connectButtonText}>Garmin Connect</Text>
                    </Pressable>
                </View>
            )}

            {isConnected && (
                <ScrollView>
                    {todayEntry ? (
                        <View style={[styles.entryBox, styles.todayMargin]}>
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryTitle}>Today: {todayEntry.calendarDate}</Text>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('SmartwatchDetailsScreen', {
                                            calendarDate: todayEntry.calendarDate,
                                            dayData: todayEntry.data,
                                        })
                                    }
                                >
                                    <Text style={styles.viewDetailsText}>View Details</Text>
                                </Pressable>
                            </View>
                            <Text style={styles.entryLabel}>
                                Steps: {todayEntry.data.steps} / Goal: {todayEntry.data.stepsGoal}
                            </Text>
                            <Text style={styles.entryLabel}>
                                Floors Climbed: {todayEntry.data.floorsClimbed} / Goal: {todayEntry.data.floorsClimbedGoal}
                            </Text>
                            <Text style={styles.entryLabel}>
                                Average Heart Rate: {todayEntry.data.averageHeartRateInBeatsPerMinute || 'N/A'}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.noTodayContainer}>
                            <Text style={styles.title}>No data for today</Text>
                        </View>
                    )}

                    {otherEntries.map((entry, index) => (
                        <View key={index} style={styles.entryBox}>
                            <View style={styles.entryHeader}>
                                <Text style={styles.entryTitle}>{entry.calendarDate}</Text>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('SmartwatchDetailsScreen', {
                                            calendarDate: entry.calendarDate,
                                            dayData: entry.data,
                                        })
                                    }
                                >
                                    <Text style={styles.viewDetailsText}>View Details</Text>
                                </Pressable>
                            </View>
                            <Text style={styles.entryLabel}>
                                Steps: {entry.data.steps} / Goal: {entry.data.stepsGoal}
                            </Text>
                            <Text style={styles.entryLabel}>
                                Floors Climbed: {entry.data.floorsClimbed} / Goal: {entry.data.floorsClimbedGoal}
                            </Text>
                            <Text style={styles.entryLabel}>
                                Avg Heart Rate: {entry.data.averageHeartRateInBeatsPerMinute || 'N/A'}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default GarminDataScreen;
