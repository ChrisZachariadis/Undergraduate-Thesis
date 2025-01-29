import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const StressDetailsScreen = ({ route }) => {
    const { dayData } = route.params || {};

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#333',
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    infoBox: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default StressDetailsScreen;
