// KcalDetailsScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const KcalDetailsScreen = () => {
    const route = useRoute();
    const { dayData } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔥 BMR Kilocalories Details</Text>
            {dayData ? (
                <>
                    <Text style={styles.text}>BMR Kilocalories: {dayData.bmrKilocalories} kcal</Text>
                </>
            ) : (
                <Text style={styles.text}>No kilocalories data passed.</Text>
            )}
        </View>
    );
};

export default KcalDetailsScreen;

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
        color: '#FF5722', // Matching the fire theme
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        color: '#424242',
    },
});
