import React from 'react';
import { Linking, Pressable, Text, View, Image } from 'react-native';
import styles from './style';

const SmartwatchMenuScreen = () => {
    const handleGarminConnect = () => {
        Linking.openURL(
            'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'
        );
    };

    const handleGarminDisconnect = () => {
        // Add your disconnect logic here
        console.log('Garmin disconnected');
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.infoFrame}>
                    <Image
                        source={require('../assets/watch-menu.png')}
                        style={styles.watchIcon}
                    />
                    <Text style={styles.deviceName}>Garmin Vivoactive 5</Text>
                </View>
            </View>

            {/* Bottom Section: Buttons Row */}
            <View style={styles.buttonsRow}>
                <Pressable style={styles.connectButton} onPress={handleGarminConnect}>
                    <Text style={styles.connectButtonText}>Connect</Text>
                </Pressable>
                <Pressable style={styles.disconnectButton} onPress={handleGarminDisconnect}>
                    <Text style={styles.disconnectButtonText}>Disconnect</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SmartwatchMenuScreen;
