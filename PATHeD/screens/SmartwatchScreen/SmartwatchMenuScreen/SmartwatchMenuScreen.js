import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Image, Modal, SafeAreaView, Alert} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf'; // PDF conversion library
import {Calendar} from 'react-native-calendars';
import {getReportHTML} from './reportTemplate'; // Import the HTML template function
import styles from './style';
import {useRoute, useNavigation} from "@react-navigation/native";
import ChartCapture from "../components/ChartCapture";

const SmartwatchMenuScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [renderChart, setRenderChart] = useState(false);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [capturedCharts, setCapturedCharts] = useState({
        hr: false,
        steps: false,
        floors: false,
        stress: false,
        intensity: false,
        kcal: false
    });
    const [chartImages, setChartImages] = useState({
        hr: null,
        steps: null,
        floors: null,
        stress: null,
        intensity: null,
        kcal: null
    });

    const navigation = useNavigation();

    const handleGarminConnect = () => {
        navigation.navigate('Webview');
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

    const getMonthsBetweenDates = (startDate, endDate) => {
        // If endDate is not provided, use startDate
        const end = endDate || startDate;

        // Create date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(end);

        // Initialize array to hold month strings
        const months = [];

        // Start with the first month
        let currentDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1);

        // Loop until we reach or exceed the end date
        while (currentDate <= endDateObj) {
            // Format as YYYY-MM
            const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            months.push(monthStr);

            // Move to next month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return months;
    };


    const handleConfirmPeriod = async () => {
        const fromDate = startDate;
        const toDate = endDate || startDate;

        // Get all months between the selected dates
        const months = getMonthsBetweenDates(fromDate, toDate);
        console.log('Months between selected dates:', months);

        // Rest of your existing code...
        const entries = Array.isArray(payload) ? payload : payload.data || [];

        const filteredEntries = entries.filter(item =>
            item.calendarDate >= fromDate && item.calendarDate <= toDate
        );

        setModalVisible(false);
        setRenderChart(true);
        setCapturedCharts({
            hr: false,
            steps: false,
            floors: false,
            stress: false,
            intensity: false,
            kcal: false
        });

        setFilteredEntries(filteredEntries);
    };

    // Check if all charts have been captured
    useEffect(() => {
        if (renderChart &&
            capturedCharts.hr &&
            capturedCharts.steps &&
            capturedCharts.floors &&
            capturedCharts.stress &&
            capturedCharts.intensity &&
            capturedCharts.kcal) {
            setRenderChart(false);
            generatePdfReport();
        }
    }, [capturedCharts]);

    const handleChartCapture = (success, chartType, uri) => {
        // console.log(`${chartType} chart captured:`, success);
        setCapturedCharts(prev => ({
            ...prev,
            [chartType]: true
        }));

        if (success && uri) {
            setChartImages(prev => ({
                ...prev,
                [chartType]: uri
            }));
        }
    };

    const generatePdfReport = async () => {
        try {
            const htmlData = getReportHTML(startDate, endDate || startDate, filteredEntries, chartImages);
            let options = {
                html: htmlData,
                fileName: `report_${startDate}_${endDate || startDate}`,
                directory: 'Documents',
                base64: false,
                filePath: `/storage/emulated/0/Android/data/com.pathed/files/Documents/report_${startDate}_${endDate || startDate}.pdf`
            };

            const file = await RNHTMLtoPDF.convert(options);
            console.log('PDF file created at:', file.filePath);
            Alert.alert('Success', `Report exported to: ${file.filePath}`);
        } catch (error) {
            console.error('Error creating PDF file:', error);
            Alert.alert('Error', 'Failed to export report.');
        }
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

            {/* Background Capture Renderer for all chart types */}
            {renderChart && (
                <>
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="hr"
                        title="Heart Rate Summary"
                        chartColor="#FF6347"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="steps"
                        title="Steps Summary"
                        chartColor="#0B3F6B"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="floors"
                        title="Floors Summary"
                        chartColor="#34511e"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="stress"
                        title="Stress Summary"
                        chartColor="#673AB7"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="intensity"
                        title="Intensity Summary"
                        chartColor="#0B3F6B"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        segmentType="Month"
                        dataType="kcal"
                        title="Kilocalories Summary"
                        chartColor="#FFA500"
                        onDone={handleChartCapture}
                    />
                </>
            )}
        </SafeAreaView>
    );

};

export default SmartwatchMenuScreen;

