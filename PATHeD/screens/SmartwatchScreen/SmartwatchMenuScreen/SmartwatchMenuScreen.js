import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs'; // Add this import at the top
import {Linking, Pressable, Text, View, Image, Modal, SafeAreaView, Alert, Platform} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { getReportHTML } from './reportTemplate'; // Import the HTML template function
import styles from './style';
import {useRoute} from "@react-navigation/native";

const SmartwatchMenuScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleGarminConnect = () => {
        Linking.openURL(
            'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'
        );
    };

    const handleGarminDisconnect = () => {
        // Add your disconnect logic here
        console.log('Garmin disconnected');
    };

    const handleGenerateReport = () => {
        setModalVisible(true);
    };

    const onDayPress = (day) => {
        // If no startDate or both dates are selected, start a new selection
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
        } else {
            // If the new day is before the startDate, restart the selection
            if (day.dateString < startDate) {
                setStartDate(day.dateString);
            } else {
                setEndDate(day.dateString);
            }
        }
    };

    const getMarkedDates = (start, end) => {
        let markedDates = {};
        if (start) {
            markedDates[start] = {startingDay: true, color: '#70d7c7', textColor: 'white'};
        }
        if (start && end) {
            let startDateObj = new Date(start);
            let endDateObj = new Date(end);
            // Mark the dates between start and end
            let currentDate = new Date(startDateObj);
            while (currentDate <= endDateObj) {
                const dateString = currentDate.toISOString().split('T')[0];
                if (dateString !== start && dateString !== end) {
                    markedDates[dateString] = {color: '#70d7c7', textColor: 'white'};
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            markedDates[end] = {endingDay: true, color: '#70d7c7', textColor: 'white'};
        }
        return markedDates;
    };


    const handleConfirmPeriod = async () => {
        const fromDate = startDate;
        const toDate = endDate || startDate;
        // Ensure we are filtering the correct array (payload.data if payload is an object)
        const entries = Array.isArray(payload) ? payload : payload.data || [];
        const filteredEntries = entries.filter(item => {
            return item.calendarDate >= fromDate && item.calendarDate <= toDate;
        });

        // Build the HTML report using our template function
        const htmlData = getReportHTML(fromDate, toDate, filteredEntries);

        const fileName = `report_${fromDate}_${toDate}.html`;
        const directoryPath = Platform.OS === 'android'
            ? RNFS.DownloadDirectoryPath
            : RNFS.DocumentDirectoryPath;
        const filePath = `${directoryPath}/${fileName}`;

        try {
            await RNFS.writeFile(filePath, htmlData, 'utf8');
            console.log('HTML file written at:', filePath);
            Alert.alert('Success', `Report exported downloads folder as ${fileName}`);
        } catch (error) {
            console.error('Error writing HTML file:', error);
            Alert.alert('Error', 'Failed to export report.');
        }

        setModalVisible(false);
    };



    // Data for the report.
    const route = useRoute();
    const payload = route.params?.payload || [];

    useEffect(() => {
        console.log('Received payload:', payload);
    }, [payload]);


    return (
        <SafeAreaView style={styles.container}>
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Specify period to generate report</Text>
                        <Calendar
                            onDayPress={onDayPress}
                            markingType={'period'}
                            markedDates={getMarkedDates(startDate, endDate)}
                            style={styles.calendar}
                        />
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={handleConfirmPeriod}>
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>
                <View style={styles.infoFrame}>
                    <Image
                        source={require('../assets/watch-menu.png')}
                        style={styles.watchIcon}
                    />
                    <Text style={styles.deviceName}>Garmin Vivoactive 5</Text>
                </View>

                <Pressable style={styles.generateReportButton} onPress={handleGenerateReport}>
                    <Text style={styles.connectButtonText}>Generate Report</Text>
                </Pressable>
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
        </SafeAreaView>
    );
};

export default SmartwatchMenuScreen;
