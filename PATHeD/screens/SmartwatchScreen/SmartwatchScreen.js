import React from 'react';
import { View, Button, Alert, Stylesheet } from 'react-native';
import styles from './style';
// import globalStyle from '../../assets/styles/globalStyle';

const SmartwatchScreen = () => {
    const sayHello = () => {
        Alert.alert('Hello');
    };

    return (
        <View style={styles.container}>
            <Button title="Say Hello" onPress={sayHello} />
        </View>
    );
};

export default SmartwatchScreen;
