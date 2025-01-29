import React, { useMemo, useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faArrowLeft, faArrowRight, faFire, faBrain, faSync } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import styles from './style';
import ProgressCircle from '../components/DayDetailView/ProgressCircle';
import Frame from "../components/Frame";

const SmartwatchDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { calendarDate } = route.params || {};
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [selectedDayData, setSelectedDayData] = useState(null);

    // Function to load cached data
    const loadCachedData = async () => {
        try {
            const cachedData = await AsyncStorage.getItem('@garminData');
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setAllEntries(parsedData.data || []);
                setIsDataFetched(true);
                console.log('Cached data loaded successfully.');

                // Set the initial day data based on the calendarDate
                if (calendarDate) {
                    const initialDayData = parsedData.data.find(
                        (entry) => entry.calendarDate === calendarDate
                    );
                    setSelectedDayData(initialDayData?.data || null);
                }
            } else {
                console.log('No cached data found.');
            }
        } catch (error) {
            console.error('Error loading cached data:', error);
        }
    };

    // Sync Button Handler to fetch new data and update the cache
    const syncButtonHandler = async () => {
        try {
            const response = await fetch(
                'https://garmin-ucy.3ahealth.com/garmin/dailies?garminUserId=3cdf364a-da5b-453f-b0e7-6983f2f1e310',
                {
                    method: 'GET',
                    headers: {
                        Cookie: 'garmin-ucy-3ahealth=MTczNzQ3MjUwNXxEWDhFQVFMX2dBQUJFQUVRQUFEX2dQLUFBQUlHYzNSeWFXNW5EQmdBRm1kaGNtMXBibFJ2YTJWdVEzSmxaR1Z1ZEdsaGJITXNaMmwwYUhWaUxtTnZiUzluYjIxdlpIVnNaUzl2WVhWMGFERXZiMkYxZEdndVEzSmxaR1Z1ZEdsaGJIUF9nUU1CQVF0RGNtVmtaVzUwYVdGc2N3SF9nZ0FCQWdFRlZHOXJaVzRCREFBQkJsTmxZM0psZEFFTUFBQUFfNVhfZ2t3QkpEQm1aak13TVRFMUxXTmhNMlF0TkdSa1lTMDROalk0TFRBMVkyWTNOMk5rWldFd1l3RWpkbGxMU1RObVluQTNjRE5tVFdGUFp6Smlla0pSY2sxUmRIcGpSelJhWWpaVU9UUUFCbk4wY21sdVp3d09BQXhuWVhKdGFXNVZjMlZ5U1dRR2MzUnlhVzVuRENZQUpESmtZVFUzTldGakxUZGxOVFl0TkdFM09TMDVZbU5tTFRjNE9ESXhNekE1Tm1Fd05RPT18Q4_2DsOo6upcxw-wAzxfsEyqj38A3pYs7y27CmMQ85Y=',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                Alert.alert('Error', `Failed to fetch data: ${response.status}`);
                return;
            }

            const data = await response.json();

            if (data.error) {
                Alert.alert('Error', data.error);
                return;
            }

            setAllEntries(data.data || []); // Update the fetched entries
            setIsDataFetched(true); // Mark data as successfully fetched

            // Save the new data to AsyncStorage
            await AsyncStorage.setItem('@garminData', JSON.stringify(data));
            Alert.alert('Success', 'Garmin data synced and cached successfully!');

            // Update selectedDayData if current calendarDate exists in new data
            const updatedDayData = data.data.find(entry => entry.calendarDate === calendarDate);
            setSelectedDayData(updatedDayData?.data || null);
        } catch (error) {
            console.error('Garmin fetch error:', error);
            Alert.alert('Error', error.message);
        }
    };

    // Load cached data on component mount
    useEffect(() => {
        loadCachedData();
    }, []);

    // Find current index based on calendarDate
    const currentIndex = useMemo(
        () => allEntries.findIndex(entry => entry.calendarDate === calendarDate),
        [allEntries, calendarDate]
    );

    // Create an object of marked dates for the calendar
    const markedDates = useMemo(() => {
        const dates = {};
        allEntries.forEach(entry => {
            dates[entry.calendarDate] = {
                marked: true,
                dotColor: '#2196F3',
            };
        });
        if (calendarDate) {
            dates[calendarDate] = {
                ...dates[calendarDate],
                selected: true,
                selectedColor: '#2196F3',
            };
        }
        return dates;
    }, [allEntries, calendarDate]);

    const handleDateSelect = (day) => {
        const selectedEntry = allEntries.find(entry => entry.calendarDate === day.dateString);
        if (selectedEntry) {
            setSelectedDayData(selectedEntry.data); // Update selected day data
            navigation.setParams({ calendarDate: selectedEntry.calendarDate }); // Update navigation params if needed
        }
        setIsCalendarVisible(false);
    };

    const handlePreviousDay = () => {
        if (currentIndex > 0) {
            const previousEntry = allEntries[currentIndex - 1];
            if (previousEntry) {
                setSelectedDayData(previousEntry.data); // Update day data
                navigation.setParams({ calendarDate: previousEntry.calendarDate });
            }
        }
    };

    const handleNextDay = () => {
        if (currentIndex !== -1 && currentIndex < allEntries.length - 1) {
            const nextEntry = allEntries[currentIndex + 1];
            if (nextEntry) {
                setSelectedDayData(nextEntry.data); // Update day data
                navigation.setParams({ calendarDate: nextEntry.calendarDate });
            }
        }
    };

    return (

        <View style={styles.container}>
            {/* Top-Right Buttons Container */}
            <View style={styles.topRightButtons}>
                {/* Sync Button */}
                <TouchableOpacity
                    style={styles.syncButton}
                    onPress={syncButtonHandler}
                >
                    <FontAwesomeIcon icon={faSync} size={24} color="#ffffff" />
                </TouchableOpacity>

                {/* Smartwatch Icon */}
                <TouchableOpacity
                    style={styles.smartwatchButton}
                    onPress={() => navigation.navigate('SmartwatchMenuScreen')}
                >
                    <Image
                        source={require('../assets/smartwatch.png')}
                        style={styles.smartwatchIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* If data has not been fetched yet, show message */}
            {!isDataFetched ? (
                <Text style={styles.noDataText}>No data available. Please sync to load data.</Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Date with Navigation Arrows */}
                    <View style={styles.dateContainer}>
                        <TouchableOpacity onPress={handlePreviousDay} disabled={currentIndex === 0}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                size={24}
                                color={currentIndex === 0 ? 'gray' : 'black'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                            <Text style={styles.dateText}> Day: {calendarDate} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleNextDay} disabled={currentIndex === allEntries.length - 1}>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                size={24}
                                color={currentIndex === allEntries.length - 1 ? 'gray' : 'black'}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Calendar Modal */}
                    <Modal
                        visible={isCalendarVisible}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setIsCalendarVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.calendarContainer}>
                                <Calendar
                                    markedDates={markedDates}
                                    onDayPress={handleDateSelect}
                                    theme={{
                                        backgroundColor: '#ffffff',
                                        calendarBackground: '#ffffff',
                                        textSectionTitleColor: '#b6c1cd',
                                        selectedDayBackgroundColor: '#2196F3',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#2196F3',
                                        dayTextColor: '#2d4150',
                                        textDisabledColor: '#d9e1e8',
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setIsCalendarVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Circles Row */}
                    <View style={styles.StepsFloorsContainer}>
                        <View style={styles.Frame}>
                            <ProgressCircle
                                title="Steps"
                                progress={selectedDayData?.steps / selectedDayData?.stepsGoal || 0}
                                value={selectedDayData?.steps || 0}
                                goal={selectedDayData?.stepsGoal || 0}
                                color="#0C6C79"
                                onPress={() =>
                                    navigation.navigate('StepsDetailsScreen', { dayData: selectedDayData })
                                }
                                size={120}
                                unit="steps"
                            />
                        </View>

                        <View style={styles.Frame}>
                            <ProgressCircle
                                title="Floors Climbed"
                                progress={selectedDayData?.floorsClimbed / selectedDayData?.floorsClimbedGoal || 0}
                                value={selectedDayData?.floorsClimbed || 0}
                                goal={selectedDayData?.floorsClimbedGoal || 0}
                                color="#4CAF50"
                                onPress={() =>
                                    navigation.navigate('FloorsDetailsScreen', { dayData: selectedDayData })
                                }
                                size={120}
                                unit="floors"
                            />
                        </View>
                    </View>

                    {/* Average Heart Rate in a Rectangle Box */}
                    <Frame>
                        <View style={styles.heartRateHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faHeart} size={24} color="red" />
                                <Text style={styles.heartRateTitle}> Average Heart Rate</Text>
                            </View>
                            {/*<TouchableOpacity onPress={() => navigation.navigate('HRDetailsScreen', { dayData: selectedDayData })}>*/}
                            <TouchableOpacity onPress={() => navigation.navigate('HR2Details')}>
                                {/*<TouchableOpacity onPress={() => navigation.navigate('DailyChart')}>*/}
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.heartRateText}>
                            {selectedDayData?.averageHeartRateInBeatsPerMinute} bpm
                        </Text>
                    </Frame>

                    {/* BMR Kilocalories in a Styled Box */}
                    <Frame>
                        <View style={styles.kcalHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faFire} size={24} color="orange" />
                                <Text style={styles.kcalTitle}> BMR Kilocalories</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('KcalDetailsScreen', { dayData: selectedDayData })}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.kcalText}>
                            {selectedDayData?.bmrKilocalories} kcal
                        </Text>
                    </Frame>

                    {/* Stress Levels in a Styled Box */}
                    <Frame>
                        <View style={styles.stressHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faBrain} size={24} color="#8E44AD" />
                                <Text style={styles.stressTitle}> Stress Levels</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('StressDetailsScreen', { dayData: selectedDayData })}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stressDetailsContainer}>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Average</Text>
                                <Text style={styles.stressText}>{selectedDayData?.averageStressLevel}</Text>
                            </View>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Maximum</Text>
                                <Text style={styles.stressText}>{selectedDayData?.maxStressLevel}</Text>
                            </View>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Duration</Text>
                                <Text style={styles.stressText}>
                                    {selectedDayData ? Math.round(selectedDayData.stressDurationInSeconds / 60) : 0} min
                                </Text>
                            </View>
                        </View>
                    </Frame>
                </ScrollView>
            )}
        </View>
    );

};

export default SmartwatchDetailsScreen;
