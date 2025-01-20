// StepsDetailsScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const StepsDetailsScreen = () => {
    const route = useRoute();
    const { dayData } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello Steps!</Text>
            {dayData ? (
                <>
                    <Text style={styles.text}>Steps: {dayData.steps}</Text>
                    <Text style={styles.text}>Steps Goal: {dayData.stepsGoal}</Text>
                    {/* Add more detailed information or charts as needed */}
                </>
            ) : (
                <Text style={styles.text}>No steps data passed.</Text>
            )}
        </View>
    );
};

export default StepsDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
    },
});
