import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faArrowLeft, faArrowRight, faFire } from '@fortawesome/free-solid-svg-icons';

import styles from './style'; // Import your updated styles
import ProgressCircle from '../components/DayDetailView/ProgressCircle'; // Adjust the path as necessary
import data from '../data.json';

const SmartwatchDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { calendarDate, dayData } = route.params || {};

    if (!dayData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available</Text>
            </View>
        );
    }

    const stepsGoal = dayData.stepsGoal || 1;
    const stepsProgress = dayData.steps / stepsGoal;

    const floorsGoal = dayData.floorsClimbedGoal || 1;
    const floorsProgress = dayData.floorsClimbed / floorsGoal;

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

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Date with Navigation Arrows */}
                <View style={styles.dateContainer}>
                    <TouchableOpacity onPress={handlePreviousDay} disabled={currentIndex === 0}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            size={24}
                            color={currentIndex === 0 ? 'gray' : 'black'}
                        />
                    </TouchableOpacity>

                    <Text style={styles.dateText}> Day: {calendarDate} </Text>

                    <TouchableOpacity onPress={handleNextDay} disabled={currentIndex === allEntries.length - 1}>
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            size={24}
                            color={currentIndex === allEntries.length - 1 ? 'gray' : 'black'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Circles Row */}
                <View style={styles.StepsFloorsContainer}>
                    <View style={styles.Frame}>
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
                    </View>

                    <View style={styles.Frame}>
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
                </View>

                {/* Average Heart Rate in a Rectangle Box */}
                <View style={styles.heartRateBox}>
                    <View style={styles.heartRateHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faHeart} size={24} color="red" />
                            <Text style={styles.heartRateTitle}> Average Heart Rate</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('HRDetailsScreen', { dayData })}>
                            <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.heartRateText}>
                        {dayData.averageHeartRateInBeatsPerMinute} bpm
                    </Text>
                </View>

                {/* BMR Kilocalories in a Styled Box */}
                <View style={styles.kcalBox}>
                    <View style={styles.kcalHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faFire} size={24} color="orange" />
                            <Text style={styles.kcalTitle}> BMR Kilocalories</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('KcalDetailsScreen', { dayData })}>
                            <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.kcalText}>
                        {dayData.bmrKilocalories} kcal
                    </Text>
                </View>
            </ScrollView>

            {/* See All Button */}
            <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('SmartwatchScreen')}
            >
                <Text style={styles.seeAllButtonText}>See All</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SmartwatchDetailsScreen;
