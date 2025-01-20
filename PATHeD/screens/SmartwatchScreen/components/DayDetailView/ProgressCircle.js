// ProgressCircle.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types';

const ProgressCircle = ({
                            title,
                            progress,
                            value,
                            goal,
                            color,
                            onPress,
                            unit = '', // Optional unit (e.g., 'steps', 'floors')
                            size = 120, // Default size
                        }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <View style={[styles.circleWrapper, { width: size, height: size }]}>
                    <Progress.Circle
                        size={size}
                        progress={progress}
                        thickness={8}
                        color={color}
                        unfilledColor="#f0f0f0"
                        borderWidth={0}
                        showsText={false}
                    />
                    <View style={styles.overlayTextContainer}>
                        <Text style={styles.valueText}>{value}</Text>
                        <Text style={styles.goalText}>{`${goal} ${unit}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

ProgressCircle.propTypes = {
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired, // Should be between 0 and 1
    value: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    unit: PropTypes.string,
    size: PropTypes.number,
};

ProgressCircle.defaultProps = {
    unit: '',
    size: 120,
};

export default ProgressCircle;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    circleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTextContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    goalText: {
        fontSize: 12,
        color: '#555',
    },
});
