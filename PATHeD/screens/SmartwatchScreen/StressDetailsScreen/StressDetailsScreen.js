import React from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import { styles } from './style';

const StressDetailsScreen = ({ route }) => {
    const { dayData } = route.params || {};


    // instead of daydata need to have access to all data so that when I place a calendar
    // I can select a day and see the data for that day
        if (!dayData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No stress data available</Text>
            </View>
        );
    }

    // Convert stress durations from seconds to minutes
    const restStress = Math.round(dayData.restStressDurationInSeconds / 60);
    const lowStress = Math.round(dayData.lowStressDurationInSeconds / 60);
    const mediumStress = Math.round(dayData.mediumStressDurationInSeconds / 60);
    const highStress = Math.round(dayData.highStressDurationInSeconds / 60);

    // Data for Pie Chart
    const pieData = [
        { value: restStress, label: 'Rest', color: '#1976D2' },   // Blue
        { value: lowStress, label: 'Low', color: '#FFB74D' },    // Light Orange
        { value: mediumStress, label: 'Medium', color: '#FB8C00' }, // Orange
        { value: highStress, label: 'High', color: '#E65100' },  // Dark Orange
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Stress Details</Text>

            {/* Pie Chart for Stress Levels */}
            <View style={styles.chartContainer}>
                <PieChart
                    donut
                    innerRadius={60}
                    radius={80}
                    data={pieData}
                    showText
                    textColor="white"
                    textSize={14}
                    width={Dimensions.get('window').width - 40}
                />
            </View>

            {/* Stress Levels Breakdown */}
            {pieData.map((item, index) => (
                <View key={index} style={styles.infoBox}>
                    <Text style={styles.label}>{item.label} Stress Duration</Text>
                    <Text style={styles.value}>{item.value} minutes</Text>
                </View>
            ))}
        </ScrollView>
    );
};


export default StressDetailsScreen;
