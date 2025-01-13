import React, { useState } from 'react';
import {View, TouchableOpacity, Text, Alert, Linking} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';

const SmartwatchScreen = ({ navigation }) => {

    // Function to open the Garmin Connect link in the browser
    const connectGarmin = () => {
        const garminUcyUrl = 'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310';
        Linking.openURL(garminUcyUrl).catch((err) => {
            console.error("Failed to open URL: ", err);
            Alert.alert('Error', 'Unable to open the Garmin Connect link. Please try again.');
        });
    };

    const fetchGarminData = async () => {
        const dataUrl = 'https://garmin-ucy.3ahealth.com/garmin/dailies?garminUserId=3cdf364a-da5b-453f-b0e7-6983f2f1e310';
        try {
            const response = await fetch(dataUrl);
            const data = await response.text(); // Get raw response as text
            console.log('Fetched Garmin Data:', data);
            Alert.alert('Garmin Data', data); // Display raw JSON or text response
        } catch (error) {
            console.error('Error fetching Garmin data:', error);
            Alert.alert('Error', 'Failed to fetch Garmin data. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={globalStyle.Button}
                onPress={connectGarmin}>
                <Text style={globalStyle.buttonText}>Garmin Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[globalStyle.Button, { marginTop: 20 }]}
                onPress={fetchGarminData}>
                <Text style={globalStyle.buttonText}>Fetch Garmin Data</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SmartwatchScreen;
