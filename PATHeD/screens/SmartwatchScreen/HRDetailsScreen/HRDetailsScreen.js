// HRDetailsScreen.jsx

import React, { useMemo, useState } from 'react';
import { Dimensions, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

import styles from './style'; // Import your HRDetailsScreen styles
import data from '../data.json'; // Ensure the path is correct

const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

const HRDetailsScreen = () => {
    const route = useRoute();
    const { dayData } = route.params || {};

    // State to manage the current week start date
    const [weekStart, setWeekStart] = useState(moment(dayData?.calendarDate || new Date()).startOf('week'));

    // Function to format date to YYYY-MM-DD
    const formatDate = (date) => moment(date).format('YYYY-MM-DD');

    // Function to generate list of dates within the week
    const generateDateRange = (start) => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            dates.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
        }
        return dates;
    };

    const dateRange = useMemo(() => generateDateRange(weekStart), [weekStart]);

    // Filter data for the date range
    const filteredData = useMemo(
        () => data.data.filter(entry => dateRange.includes(entry.calendarDate)),
        [data.data, dateRange]
    );

    // Map heart rates to corresponding days, filling missing days with null or a default value
    const heartRates = dateRange.map(date => {
        const entry = filteredData.find(entry => entry.calendarDate === date);
        return entry ? entry.data.averageHeartRateInBeatsPerMinute : null;
    });

    // Extract labels with day of the week
    const labels = dateRange.map(date => moment(date).format('ddd D'));

    // Handle Previous and Next Week Navigation
    const handlePreviousWeek = () => {
        setWeekStart(prev => moment(prev).subtract(1, 'weeks'));
    };

    const handleNextWeek = () => {
        setWeekStart(prev => moment(prev).add(1, 'weeks'));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Weekly Average Heart Rate</Text>

            {/* Week Navigation */}
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={handlePreviousWeek} style={styles.navButton}>
                    <Text style={styles.navButtonText}>Previous Week</Text>
                </TouchableOpacity>
                <Text style={styles.weekLabel}>
                    {moment(weekStart).format('MMM D')} - {moment(weekStart).add(6, 'days').format('MMM D, YYYY')}
                </Text>
                <TouchableOpacity onPress={handleNextWeek} style={styles.navButton}>
                    <Text style={styles.navButtonText}>Next Week</Text>
                </TouchableOpacity>
            </View>

            {/* Bar Chart */}
            {heartRates.some(rate => rate !== null) ? (
                <BarChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: heartRates.map(rate => (rate !== null ? rate : 0)), // Replace null with 0 or another default
                            },
                        ],
                    }}
                    width={screenWidth}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=" bpm"
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    chartConfig={{
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0, // No decimals
                        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Bar color (Green)
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForBackgroundLines: {
                            strokeDasharray: '', // Solid lines
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    verticalLabelRotation={30}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No heart rate data available for this week.</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default HRDetailsScreen;
