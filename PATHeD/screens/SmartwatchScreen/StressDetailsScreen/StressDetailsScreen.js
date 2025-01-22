import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const StressDetailsScreen = ({ route }) => {
    const { dayData } = route.params || {};

    if (!dayData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No stress data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Stress Details</Text>

            {/* Average Stress Level */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>Average Stress Level</Text>
                <Text style={styles.value}>{dayData.averageStressLevel}</Text>
            </View>

            {/* Maximum Stress Level */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>Maximum Stress Level</Text>
                <Text style={styles.value}>{dayData.maxStressLevel}</Text>
            </View>

            {/* Stress Duration */}
            <View style={styles.infoBox}>
                <Text style={styles.label}>Stress Duration</Text>
                <Text style={styles.value}>
                    {Math.round(dayData.stressDurationInSeconds / 60)} minutes
                </Text>
            </View>

            {/* Stress Level Chart Placeholder */}
            <View style={styles.chartPlaceholder}>
                <Text style={styles.chartText}>Stress Level Chart</Text>
            </View>
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
    chartPlaceholder: {
        height: 200,
        backgroundColor: '#eaeaea',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartText: {
        fontSize: 16,
        color: '#777',
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
