import React from 'react';
import { View, StyleSheet } from 'react-native';

const Frame = ({ children, style, padding = 20, marginHorizontal = 12 }) => {
    return (
        <View style={[styles.card, { padding, marginHorizontal }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 8,
    },
});

export default Frame;
