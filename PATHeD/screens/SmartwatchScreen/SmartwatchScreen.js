import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import heartRateDataJson from '../../assets/data/sorted_hr.json';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style'; // Importing styles from the separate file
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

const SmartwatchScreen = ({ navigation }) => {
    const [isGarminConnected, setIsGarminConnected] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [viewGraph, setViewGraph] = useState(false);

    useEffect(() => {
        const monthlyData = {};
        heartRateDataJson.forEach(item => {
            const [month, day, year] = item.Date.split('/');
            const monthYear = `${month}/${year}`;
            if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = { total: 0, count: 0 };
            }
            monthlyData[monthYear].total += item["Heart Rate"];
            monthlyData[monthYear].count += 1;
        });

        const averagedData = Object.keys(monthlyData).map(monthYear => ({
            time: monthYear.split('/')[0],
            value: monthlyData[monthYear].total / monthlyData[monthYear].count,
        }));
        setFilteredData(averagedData);
    }, []);

    const heartRateData = {
        labels: filteredData.map(item => item.time),
        datasets: [
            {
                data: filteredData.map(item => item.value),
                color: (opacity = 1) => `rgba(51, 195, 187, ${opacity})`,
                strokeWidth: 2,
            },
        ],
        legend: ['Average Heart Rate (bpm)'],
    };

    const connectGarmin = () => {
        Alert.alert('Connect', 'Connect your Garmin device to the app', [
            {
                text: 'OK',
                onPress: () => {
                    setIsGarminConnected(true);
                    setDeviceName('Garmin Forerunner 945');
                },
            },
        ]);
    };

    const toggleView = () => {
        setViewGraph(!viewGraph);
    };

    return (
        <View style={styles.container}>
            {isGarminConnected ? (
                <>
                    <Text style={styles.connectedText}>
                        Connected Device: {deviceName}
                    </Text>
                    {!viewGraph ? (
                        <TouchableOpacity style={styles.bpmBox} onPress={toggleView}>
                            <Icon name="heart" size={24} color="#fff" style={styles.heartIcon} />
                            <Text style={styles.bpmText}>
                                BPM: {filteredData.length > 0 ? filteredData[filteredData.length - 1].value.toFixed(2) : 'N/A'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <LineChart
                            data={heartRateData}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                color: (opacity = 1) => `rgba(51, 195, 187, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: { borderRadius: 16 },
                            }}
                            bezier
                            style={{
                                marginVertical: 10,
                                borderRadius: 16,
                            }}
                        />
                    )}
                </>
            ) : (
                <TouchableOpacity
                    style={globalStyle.Button}
                    onPress={connectGarmin}>
                    <Text style={globalStyle.buttonText}>Garmin Connect</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SmartwatchScreen;
