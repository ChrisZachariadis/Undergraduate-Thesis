import React, {useMemo, useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faArrowLeft, faArrowRight, faFire, faBrain, faSync, faBolt} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import ProgressCircle from '../components/DayDetailView/ProgressCircle';
import Frame from "../components/Frame";
import CalendarDays from '../components/CalendarDays/CalendarDays';

const SmartwatchDetailsScreen = () => {
    const navigation = useNavigation();
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [selectedDayData, setSelectedDayData] = useState(null);
    const [currentCalendarDate, setCurrentCalendarDate] = useState(); // Local state for calendarDate

    // Function to load cached data
    const loadCachedData = async () => {
        try {
            const cachedData = await AsyncStorage.getItem('@garminData');
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                const entries = parsedData.data || [];
                setAllEntries(entries);
                setIsDataFetched(true);
                console.log('Cached data loaded successfully.');

                // LOGGING THE WHOLE FILE TO CHECK IF THERE ARE ANY INCONSISTENCIES
                // WITH THE WAY THE DATA ARE DISPLAYED.
                // console.log("Raw Data:", JSON.stringify(JSON.parse(cachedData), null, 2));


                // Always display the latest entry as the current Calendar Date
                if (entries.length > 0) {
                    const latestEntry = entries[0]; // Use the first entry as the latest
                    setCurrentCalendarDate(latestEntry.calendarDate);
                    setSelectedDayData(latestEntry.data || null);
                }
            } else {
                console.log('No cached data found.');
            }
        } catch (error) {
            console.error('Error loading cached data:', error);
        }
    };

    // Sync Button Handler that for now is the only way to fetch data with hardcoded Cookie.
    const syncButtonHandler = async () => {
        try {
            const response = await fetch(
                'https://garmin-ucy.3ahealth.com/garmin/dailies',
                {
                    method: 'GET',
                    headers: {
                        Cookie: 'garmin-ucy-3ahealth=MTc0MTYwNDU5OXxEWDhFQVFMX2dBQUJFQUVRQUFEX2dQLUFBQUlHYzNSeWFXNW5EQmdBRm1kaGNtMXBibFJ2YTJWdVEzSmxaR1Z1ZEdsaGJITXNaMmwwYUhWaUxtTnZiUzluYjIxdlpIVnNaUzl2WVhWMGFERXZiMkYxZEdndVEzSmxaR1Z1ZEdsaGJIUF9nUU1CQVF0RGNtVmtaVzUwYVdGc2N3SF9nZ0FCQWdFRlZHOXJaVzRCREFBQkJsTmxZM0psZEFFTUFBQUFfNVhfZ2t3QkpEQm1aak13TVRFMUxXTmhNMlF0TkdSa1lTMDROalk0TFRBMVkyWTNOMk5rWldFd1l3RWpkbGxMU1RObVluQTNjRE5tVFdGUFp6Smlla0pSY2sxUmRIcGpSelJhWWpaVU9UUUFCbk4wY21sdVp3d09BQXhuWVhKdGFXNVZjMlZ5U1dRR2MzUnlhVzVuRENZQUpESmtZVFUzTldGakxUZGxOVFl0TkdFM09TMDVZbU5tTFRjNE9ESXhNekE1Tm1Fd05RPT18yso-XQyL6G37LoNZsmxR9VjVB_v0hCJlcEhd0N0CFS0=',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                Alert.alert('Error', `Failed to fetch data: ${response.status}`);
                return;
            }

            // Save the response data to AsyncStorage
            const data = await response.json();

            if (data.error) {
                Alert.alert('Error', data.error);
                return;
            }

            // Update the fetched entries
            setAllEntries(data.data || []);
            // Mark data as successfully fetched
            setIsDataFetched(true);

            // Save the new data to AsyncStorage
            await AsyncStorage.setItem('@garminData', JSON.stringify(data));
            Alert.alert('Success', 'Garmin data synced successfully!');

            if (data.data && data.data.length > 0) {
                const latestEntry = data.data[0];
                setCurrentCalendarDate(latestEntry.calendarDate);
                setSelectedDayData(latestEntry.data || null);
            }
        } catch (error) {
            console.error('Garmin fetch error:', error);
            Alert.alert('Error', error.message);
        }
    };

    // Load cached data on component mount
    useEffect(() => {
        loadCachedData();
    }, []);


    // currentIndex is used to navigate between different days
    // and is based on the currentCalendarDate.
    const currentIndex = useMemo(
        () => allEntries.findIndex(entry => entry.calendarDate === currentCalendarDate),
        [allEntries, currentCalendarDate]
    );

    const handleDateSelect = (day) => {
        const selectedEntry = allEntries.find(entry => entry.calendarDate === day.dateString);
        if (selectedEntry) {
            setSelectedDayData(selectedEntry.data); // Update selected day data
            setCurrentCalendarDate(selectedEntry.calendarDate); // Update local calendarDate state
        }
        setIsCalendarVisible(false);
    };

    const handlePreviousDay = () => {
        if (currentIndex > 0) {
            const previousEntry = allEntries[currentIndex - 1];
            if (previousEntry) {
                setSelectedDayData(previousEntry.data); // Update day data
                setCurrentCalendarDate(previousEntry.calendarDate); // Update calendarDate
            }
        }
    };

    const handleNextDay = () => {
        if (currentIndex !== -1 && currentIndex < allEntries.length - 1) {
            const nextEntry = allEntries[currentIndex + 1];
            if (nextEntry) {
                setSelectedDayData(nextEntry.data); // Update day data
                setCurrentCalendarDate(nextEntry.calendarDate); // Update calendarDate
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
                    accessibilityLabel="Sync Garmin Data"

                    accessible={true}
                >
                    <FontAwesomeIcon icon={faSync} size={24} color="#ffffff"/>
                </TouchableOpacity>

                {/* Smartwatch Icon */}
                <TouchableOpacity
                    style={styles.smartwatchButton}
                    onPress={() => navigation.navigate('SmartwatchMenuScreen', { payload: allEntries })}>
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
                        <TouchableOpacity onPress={handleNextDay} disabled={currentIndex === allEntries.length - 1}>
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                size={24}
                                color={currentIndex === allEntries.length - 1 ? 'gray' : 'black'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                            <Text style={styles.dateText}> Day: {currentCalendarDate} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handlePreviousDay} disabled={currentIndex === 0}>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                size={24}
                                color={currentIndex === 0 ? 'gray' : 'black'}
                            />
                        </TouchableOpacity>
                    </View>

                    <CalendarDays
                        isVisible={isCalendarVisible}
                        onClose={() => setIsCalendarVisible(false)}
                        allEntries={allEntries}
                        currentCalendarDate={currentCalendarDate}
                        onDateSelect={handleDateSelect}
                    />

                    {/* Circles Row */}
                    <View style={styles.StepsFloorsContainer}>
                        <Frame>
                            <ProgressCircle
                                title="Steps"
                                progress={(selectedDayData?.steps || 0) / (selectedDayData?.stepsGoal || 1)}
                                value={selectedDayData?.steps || 0}
                                goal={selectedDayData?.stepsGoal || 0}
                                color="#0C6C79"
                                onPress={() =>
                                    navigation.navigate('StepsDetailsScreen', {dayData: selectedDayData})
                                }
                                size={120}
                                unit="steps"
                            />
                        </Frame>

                        <Frame>
                            <ProgressCircle
                                title="Floors Climbed"
                                progress={(selectedDayData?.floorsClimbed || 0) / (selectedDayData?.floorsClimbedGoal || 1)}
                                value={selectedDayData?.floorsClimbed || 0}
                                goal={selectedDayData?.floorsClimbedGoal || 0}
                                color="#4CAF50"
                                onPress={() =>
                                    navigation.navigate('FloorsDetailsScreen', {dayData: selectedDayData})
                                }
                                size={120}
                                unit="floors"
                            />
                        </Frame>
                    </View>

                    {/* Average Heart Rate in a Rectangle Box */}
                    <Frame>
                        <View style={styles.heartRateHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faHeart} size={24} color="red"/>
                                <Text style={styles.heartRateTitle}> Average Heart Rate</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('HR2Details')}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.heartRateText}>
                            {selectedDayData?.averageHeartRateInBeatsPerMinute} bpm
                        </Text>
                    </Frame>

                    {/* BMR Kilocalories in a Styled Box */}
                    <Frame>
                        <View style={styles.kcalHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faFire} size={24} color="orange"/>
                                <Text style={styles.kcalTitle}> BMR Kilocalories</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('KcalDetailsScreen', {dayData: selectedDayData})}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.kcalText}>
                            {selectedDayData?.bmrKilocalories} kcal
                        </Text>
                    </Frame>

                    {/* Intensity Frame */}
                    <Frame>
                        <View style={styles.intensityHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faBolt} size={24} color="#F39C12"/>
                                <Text style={styles.intensityTitle}> Intensity</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('IntensityDetailsScreen', {dayData: selectedDayData})}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.intensityDetailsContainer}>
                            <View style={styles.intensityDetail}>
                                <Text style={styles.intensityLabel}>Moderate</Text>
                                <Text style={styles.intensityText}>
                                    {selectedDayData?.moderateIntensityDurationInSeconds
                                        ? Math.round(selectedDayData.moderateIntensityDurationInSeconds / 60)
                                        : 0} min
                                </Text>
                            </View>
                            <View style={styles.intensityDetail}>
                                <Text style={styles.intensityLabel}>Vigorous</Text>
                                <Text style={styles.intensityText}>
                                    {selectedDayData?.vigorousIntensityDurationInSeconds
                                        ? Math.round(selectedDayData.vigorousIntensityDurationInSeconds / 60)
                                        : 0} min
                                </Text>
                            </View>
                        </View>
                    </Frame>


                    {/* Stress Levels in a Styled Box */}
                    <Frame>
                        <View style={styles.stressHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faBrain} size={24} color="#8E44AD"/>
                                <Text style={styles.stressTitle}> Stress Levels</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('StressDetailsScreen', {dayData: selectedDayData})}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
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
