import React, {useMemo, useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Alert, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faArrowLeft, faArrowRight, faFire, faBrain, faSync, faBolt} from '@fortawesome/free-solid-svg-icons';
import styles from './style';
import ProgressCircle from '../components/DayDetailView/ProgressCircle';
import Frame from "../components/Frame";
import CalendarDays from '../components/CalendarDays/CalendarDays';
import {formatTimeFromSeconds} from '../utils/timeUtils';
import {loadGarminCachedData, syncGarminData} from '../utils/garminDataUtils';

const SmartwatchDetailsScreen = () => {
    const navigation = useNavigation();
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [allEntries, setAllEntries] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [selectedDayData, setSelectedDayData] = useState(null);
    const [currentCalendarDate, setCurrentCalendarDate] = useState();


    // Load cached data on component mount (when page loads).
    useEffect(() => {
        loadCachedData();
    }, []);

    // Function to load cached data
    const loadCachedData = async () => {
        const {entries, success, error} = await loadGarminCachedData();
        if (success) {
            setAllEntries(entries);
            setIsDataFetched(true);

            // Always display the latest entry as the current Calendar Date
            if (entries.length > 0) {
                const latestEntry = entries[0];
                setCurrentCalendarDate(latestEntry.calendarDate);
                setSelectedDayData(latestEntry.data || null);
            }
        }
    };

    // Sync Button Handler to fetch data
    const syncButtonHandler = async () => {
        const {success, entries, error, message} = await syncGarminData();

        if (!success) {
            Alert.alert('Error', error);
            return;
        }

        setAllEntries(entries);
        setIsDataFetched(true);
        Alert.alert('Success', message);

        if (entries.length > 0) {
            const latestEntry = entries[0];
            setCurrentCalendarDate(latestEntry.calendarDate);
            setSelectedDayData(latestEntry.data || null);
        }
    };



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
                    accessible={true} >
                    <FontAwesomeIcon icon={faSync} size={24} color="#ffffff"/>
                </TouchableOpacity>

                {/* Smartwatch Icon */}
                <TouchableOpacity
                    style={styles.smartwatchButton}
                    onPress={() => navigation.navigate('SmartwatchMenuScreen', { payload: allEntries })}>
                    <Image
                        source={require('../assets/images/smartwatch.png')}
                        style={styles.smartwatchIcon} />
                </TouchableOpacity>
            </View>

            {/* If no data, show message */}
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
                                color={currentIndex === allEntries.length - 1 ? 'gray' : 'black'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                            <Text style={styles.dateText}> Day: {currentCalendarDate} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handlePreviousDay} disabled={currentIndex === 0}>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                size={24}
                                color={currentIndex === 0 ? 'gray' : 'black'} />
                        </TouchableOpacity>
                    </View>

                    <CalendarDays
                        isVisible={isCalendarVisible}
                        onClose={() => setIsCalendarVisible(false)}
                        allEntries={allEntries}
                        currentCalendarDate={currentCalendarDate}
                        onDateSelect={handleDateSelect} />

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
                                    navigation.navigate('StepsDetailsScreen', {
                                        dayData: selectedDayData,
                                        selectedDate: currentCalendarDate
                                    })
                                }
                                size={120}
                                unit="steps" />
                        </Frame>

                        <Frame>
                            <ProgressCircle
                                title="Floors Climbed"
                                progress={(selectedDayData?.floorsClimbed || 0) / (selectedDayData?.floorsClimbedGoal || 1)}
                                value={selectedDayData?.floorsClimbed || 0}
                                goal={selectedDayData?.floorsClimbedGoal || 0}
                                color="#4CAF50"
                                onPress={() =>
                                    navigation.navigate('FloorsDetailsScreen', {
                                        dayData: selectedDayData,
                                        selectedDate: currentCalendarDate
                                    })
                                }
                                size={120}
                                unit="floors" />
                        </Frame>
                    </View>

                    {/* Average Heart Rate in a Rectangle Box */}
                    <Frame>
                        <View style={styles.heartRateHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesomeIcon icon={faHeart} size={24} color="red"/>
                                <Text style={styles.heartRateTitle}> Average Heart Rate</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('HRDetails', { selectedDate: currentCalendarDate })}>
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
                                onPress={() => navigation.navigate('KcalDetailsScreen', {
                                    dayData: selectedDayData,
                                    selectedDate: currentCalendarDate
                                })}>
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
                                onPress={() => navigation.navigate('IntensityDetailsScreen', {
                                    dayData: selectedDayData,
                                    selectedDate: currentCalendarDate
                                })}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.intensityDetailsContainer}>
                            <View style={styles.intensityDetail}>
                                <Text style={styles.intensityLabel}>Moderate</Text>
                                <Text style={styles.intensityText}>
                                    {selectedDayData?.moderateIntensityDurationInSeconds
                                        ? formatTimeFromSeconds(selectedDayData.moderateIntensityDurationInSeconds).value
                                        : 0} {selectedDayData?.moderateIntensityDurationInSeconds
                                    ? formatTimeFromSeconds(selectedDayData.moderateIntensityDurationInSeconds).unit
                                    : 'min'}
                                </Text>
                            </View>
                            <View style={styles.intensityDetail}>
                                <Text style={styles.intensityLabel}>Vigorous</Text>
                                <Text style={styles.intensityText}>
                                    {selectedDayData?.vigorousIntensityDurationInSeconds
                                        ? formatTimeFromSeconds(selectedDayData.vigorousIntensityDurationInSeconds).value
                                        : 0} {selectedDayData?.vigorousIntensityDurationInSeconds
                                    ? formatTimeFromSeconds(selectedDayData.vigorousIntensityDurationInSeconds).unit
                                    : 'min'}
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
                                onPress={() => navigation.navigate('StressDetailsScreen', {
                                    dayData: selectedDayData,
                                    selectedDate: currentCalendarDate
                                })}>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stressDetailsContainer}>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Average</Text>
                                {/* Try not to display negative stress level */}
                                <Text style={styles.stressText}>
                                    {selectedDayData?.averageStressLevel < 0 ? 0 : selectedDayData?.averageStressLevel}
                                </Text>
                            </View>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Maximum</Text>
                                <Text style={styles.stressText}>{selectedDayData?.maxStressLevel}</Text>
                            </View>
                            <View style={styles.stressDetail}>
                                <Text style={styles.stressLabel}>Duration</Text>
                                <Text style={styles.stressText}>
                                    {selectedDayData
                                        ? `${formatTimeFromSeconds(selectedDayData.stressDurationInSeconds).value} ${formatTimeFromSeconds(selectedDayData.stressDurationInSeconds).unit}`
                                        : '0 min'}
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

