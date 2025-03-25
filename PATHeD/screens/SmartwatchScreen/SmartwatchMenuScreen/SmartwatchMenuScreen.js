import React, {useEffect, useState} from 'react';
import {Linking, Pressable, Text, View, Image, Modal, SafeAreaView, Alert, Platform} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf'; // PDF conversion library
import {Calendar} from 'react-native-calendars';
import {getReportHTML} from './reportTemplate'; // Import the HTML template function
import styles from './style';
import {useRoute, useNavigation} from "@react-navigation/native";

const SmartwatchMenuScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigation = useNavigation();

    const handleGarminConnect = () => {
        navigation.navigate('Webview');

        // Linking.openURL(
        //     'https://garmin-ucy.3ahealth.com/garmin/login?userId=3cdf364a-da5b-453f-b0e7-6983f2f1e310'
        // );
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

        try {
            if (!RNHTMLtoPDF || typeof RNHTMLtoPDF.convert !== 'function') {
                throw new Error('RNHTMLtoPDF is not properly initialized');
            }
            // Modify the options so that the PDF is saved to the "Download" folder.
            let options = {
                html: htmlData,
                fileName: `report_${fromDate}_${toDate}`,
                // Force saving to the Download folder.
                // For Android, "Download" is used; on iOS, if you need a similar behavior, further configuration may be required.
                directory: 'Documents',
            };
            let file = await RNHTMLtoPDF.convert(options);
            console.log('PDF file created at:', file.filePath);
            Alert.alert('Success', `Report exported to folder as ${file.filePath}`);
        } catch (error) {
            console.error('Error creating PDF file:', error);
            Alert.alert('Error', 'Failed to export report.');
        }

        setModalVisible(false);
    };


    // Data for the report.
    const route = useRoute();
    const payload = route.params?.payload || [];

    useEffect(() => {
        // Check if the json file is properly sent.
        // console.log('Received payload:', payload);
    }, [payload]);


    return (
        <SafeAreaView style={styles.container}>
            {/* Modal for selecting report period */}
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
                <View>
                    <Text>Device Connected:</Text>
                </View>
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
                <Pressable style={styles.generateReportButton} onPress={handleGenerateReport}>
                    <Text style={styles.disconnectButtonText}>Generate Report</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default SmartwatchMenuScreen;
