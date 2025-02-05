import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import ChartDetails from '../components/ChartDetails/ChartDetails';

const KcalSummaryCard = ({ value }) => (
    <View style={styles.card}>
        <View style={styles.mainContent}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>Average kilocalories burned</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.unit}>kcal</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon icon={faFire} size={24} color="#FFA500" />
            </View>
        </View>

        <View style={styles.divider} />

    </View>
);

const KcalDetails = () => {
    const [summary, setSummary] = useState('');

    return (
        <View style={styles.container}>
            <ChartDetails
                title="Kilocalories Summary"
                dataType="kcal"
                segments={['Week', 'Month']}
                chartColor="#FFA500"
                onSummaryUpdate={(summaryLabel) => setSummary(summaryLabel)}
            />
            <KcalSummaryCard value={summary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    unit: {
        fontSize: 16,
        color: '#666',
        marginLeft: 4,
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recommendedLabel: {
        fontSize: 14,
        color: '#666',
    },
    recommendedValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default KcalDetails;
