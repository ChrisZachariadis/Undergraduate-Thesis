import React from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import styles from "./style";

const SmartwatchMenuScreen = () => {

    const handleGarminConnect = () => {
        Linking.openURL(
            'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20, fontSize: 20 }}>Garmin Vivoactive 5</Text>
            {/* Garmin Connect Button */}
            <Pressable style={styles.connectButton} onPress={handleGarminConnect}>
                <Text style={styles.connectButtonText}>Garmin Connect</Text>
            </Pressable>
        </View>
    );
};

export default SmartwatchMenuScreen;
