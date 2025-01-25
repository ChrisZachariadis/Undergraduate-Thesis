import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your styles, etc.
import styles from './style';

const GarminDataScreen = () => {
    const navigation = useNavigation();
    // Track if the user is "connected" (meaning they've logged in or at least attempted)
    const [isConnected, setIsConnected] = useState(false);
    // Store fetched data here
    const [garminData, setGarminData] = useState(null);

    // STEP 1: Open Garmin login page
    const handleGarminConnect = () => {
        Linking.openURL(
            'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'
        );
        // Suppose we set isConnected to true after user clicks (or after successful OAuth callback)
        setIsConnected(true);
    };

    // STEP 2: Fetch data from Garmin's endpoint (if user is "connected")
    const handleFetchGarminData = async () => {
        try {
            // You can guard against not being connected:
            if (!isConnected) {
                Alert.alert('Not connected', 'Please connect Garmin first.');
                return;
            }

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

            // Handle error responses
            if (!response.ok) {
                const msg = `Failed to fetch Garmin data: ${response.status}`;
                console.error(msg);
                Alert.alert('Error', msg);
                return;
            }

            const data = await response.json();

            // Check if there's an error in the JSON response
            if (data.error === 'missing garminUserId') {
                Alert.alert('Error', 'Garmin User ID is missing or invalid.');
                return;
            }

            // If successful, store in state
            setGarminData(data);
            Alert.alert('Success', 'Garmin data loaded successfully!');
        } catch (error) {
            console.error('Garmin fetch error:', error);
            Alert.alert('Error', error.message);
        }
    };

    // Example: parse the 'garminData' and display it in your UI
    const renderGarminData = () => {
        if (!garminData) {
            return <Text style={styles.entryLabel}>No data loaded yet.</Text>;
        }

        // This depends on the structure of the returned JSON
        // For example, if the JSON has a `.data` array:
        const entries = garminData.data || [];

        return (
            <ScrollView>
                {entries.map((entry, index) => (
                    <View key={index} style={styles.entryBox}>
                        <View style={styles.entryHeader}>
                            <Text style={styles.entryTitle}>{entry.calendarDate}</Text>
                            {/* Example "View Details" button */}
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('SmartwatchDetailsScreen', {
                                        calendarDate: entry.calendarDate,
                                        dayData: entry.data,
                                    })
                                }
                            >
                                <Text style={styles.viewDetailsText}>View Details</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.entryLabel}>
                            Steps: {entry.data.steps} / Goal: {entry.data.stepsGoal}
                        </Text>
                        <Text style={styles.entryLabel}>
                            Floors Climbed: {entry.data.floorsClimbed} / Goal: {entry.data.floorsClimbedGoal}
                        </Text>
                        <Text style={styles.entryLabel}>
                            Avg Heart Rate: {entry.data.averageHeartRateInBeatsPerMinute || 'N/A'}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {/* Show Garmin Connect button if not connected */}
            {!isConnected && (
                <View style={styles.topSection}>
                    <Pressable style={styles.connectButton} onPress={handleGarminConnect}>
                        <Text style={styles.connectButtonText}>Garmin Connect</Text>
                    </Pressable>
                </View>
            )}

            {/* Add a button to fetch Garmin data once "connected" */}
            {isConnected && (
                <View style={styles.topSection}>
                    <Pressable style={styles.connectButton} onPress={handleFetchGarminData}>
                        <Text style={styles.connectButtonText}>Fetch Garmin Data</Text>
                    </Pressable>
                </View>
            )}

            {/* Render the fetched data */}
            {renderGarminData()}
        </View>
    );
};

export default GarminDataScreen;
