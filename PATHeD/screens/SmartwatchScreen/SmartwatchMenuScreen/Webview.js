import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebComponent = () => {
    return (
        <SafeAreaView style={styles.container}>
            <WebView
                source={{uri: 'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'}}
                style={{flex: 1}}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
});

export default MyWebComponent;
