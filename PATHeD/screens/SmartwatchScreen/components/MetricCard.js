import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const MetricCard = ({ 
    title, 
    value, 
    unit, 
    icon, 
    color, 
    size = 22,
    titleContainer = null 
}) => (
    <View style={styles.metricCard}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                {titleContainer ? (
                    titleContainer
                ) : (
                    <Text style={styles.label}>{title}</Text>
                )}
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                <FontAwesomeIcon icon={icon} size={size} color={color} />
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    metricCard: {
        flex: 1,
        marginHorizontal: 4,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MetricCard;
