import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DailyChart = () => {
    const [selectedDataPoint, setSelectedDataPoint] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const data = [
        { value: 20, label: 'Jan' },
        { value: 45, label: 'Feb' },
        { value: 28, label: 'Mar' },
        { value: 80, label: 'Apr' },
        { value: 99, label: 'May' },
        { value: 43, label: 'Jun' },
    ];

    const handleDataPointClick = (dataPoint, index) => {
        const chartWidth = Dimensions.get('window').width - 40; // Adjust based on your layout
        const chartHeight = 220; // Chart height
        const xPosition = (index / (data.length - 1)) * chartWidth;
        const yPosition = chartHeight - (dataPoint.value / 100) * chartHeight;

        setSelectedDataPoint(dataPoint);
        setModalPosition({ x: xPosition, y: yPosition - 50 }); // Adjust yPosition to place modal above the point
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 40}
                height={220}
                color="#8641F4"
                thickness={2}
                onPress={handleDataPointClick}
            />
            {selectedDataPoint && (
                <View style={[styles.modalContent, { top: modalPosition.y, left: modalPosition.x }]}>
                    <Text style={styles.modalText}>Value: {selectedDataPoint.value}</Text>
                    <Text style={styles.modalText}>Label: {selectedDataPoint.label}</Text>
                    <FontAwesomeIcon icon={faChevronDown} size={16} color="black" style={styles.chevron} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        zIndex: 1,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    chevron: {
        marginTop: 5,
    },
});

export default DailyChart;
