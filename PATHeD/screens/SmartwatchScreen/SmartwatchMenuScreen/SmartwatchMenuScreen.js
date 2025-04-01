import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Image, Modal, SafeAreaView, Alert, ActivityIndicator} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {getReportHTML} from './reportTemplate'; // Import the HTML template function
import styles from './style';
import {useRoute, useNavigation} from "@react-navigation/native";
import ChartCapture from "../components/ChartCapture";

const SmartwatchMenuScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [renderChart, setRenderChart] = useState(false);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [capturedCharts, setCapturedCharts] = useState({});
    const [chartImages, setChartImages] = useState({
        hr: {},
        steps: {},
        floors: {},
        stress: {},
        intensity: {},
        kcal: {}
    });

    // Track total charts to capture and completed charts
    const [totalChartsToCapture, setTotalChartsToCapture] = useState(0);
    const [completedCharts, setCompletedCharts] = useState(0);

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
            markedDates[start] = {startingDay: true, color: '#023050', textColor: 'white'};
        }
        if (start && end) {
            let startDateObj = new Date(start);
            let endDateObj = new Date(end);
            // Mark the dates between start and end
            let currentDate = new Date(startDateObj);
            while (currentDate <= endDateObj) {
                const dateString = currentDate.toISOString().split('T')[0];
                if (dateString !== start && dateString !== end) {
                    markedDates[dateString] = {color: '#023457', textColor: 'white'};
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            markedDates[end] = {endingDay: true, color: '#023457', textColor: 'white'};
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

        // Show loading indicator
        setLoadingVisible(true);

        // Get all months between the selected dates
        const months = getMonthsBetweenDates(fromDate, toDate);
        console.log('Months between selected dates:', months);
        setSelectedMonths(months);

        // Rest of your existing code...
        const entries = Array.isArray(payload) ? payload : payload.data || [];

        const filteredEntries = entries.filter(item =>
            item.calendarDate >= fromDate && item.calendarDate <= toDate
        );

        setModalVisible(false);

        // Reset charts and prepare for capture
        let initialCapturedState = {};
        months.forEach(month => {
            initialCapturedState[month] = {
                hr: false,
                steps: false,
                floors: false,
                stress: false,
                intensity: false,
                kcal: false
            };
        });

        setCapturedCharts(initialCapturedState);
        setChartImages({
            hr: {},
            steps: {},
            floors: {},
            stress: {},
            intensity: {},
            kcal: {}
        });

        // Calculate total charts to capture (6 chart types × number of months)
        setTotalChartsToCapture(6 * months.length);
        setCompletedCharts(0);

        setRenderChart(true);
        setFilteredEntries(filteredEntries);
    };

    // Check if all charts have been captured
    useEffect(() => {
        if (renderChart && completedCharts === totalChartsToCapture && totalChartsToCapture > 0) {
            setRenderChart(false);
            generatePdfReport();
        }
    }, [completedCharts, totalChartsToCapture, renderChart]);

    const handleChartCapture = (success, chartType, uri, month) => {
        console.log(`${chartType} chart captured for ${month}:`, success);

        // Update completed charts count
        setCompletedCharts(prevCount => prevCount + 1);

        // Update captured status
        setCapturedCharts(prev => ({
            ...prev,
            [month]: {
                ...(prev[month] || {}),
                [chartType]: true
            }
        }));

        if (success && uri) {
            // Store chart image with month information
            setChartImages(prev => ({
                ...prev,
                [chartType]: {
                    ...prev[chartType],
                    [month]: uri
                }
            }));
        }
    };

    const generatePdfReport = async () => {
        try {
            const htmlData = getReportHTML(
                startDate,
                endDate || startDate,
                filteredEntries,
                chartImages,
                selectedMonths
            );

            // 1. Generate PDF in internal storage
            const options = {
                html: htmlData,
                fileName: `report_${startDate}_${endDate || startDate}`,
                base64: false,
            };

            const file = await RNHTMLtoPDF.convert(options);
            const internalPath = file.filePath;
            console.log('PDF generated at:', internalPath);

            // 2. Get public Downloads path
            const downloadDir = RNFS.DownloadDirectoryPath;
            const fileName = `report_${startDate}_${endDate || startDate}.pdf`;
            const downloadPath = `${downloadDir}/${fileName}`;

            // 3. Ask for permission (only Android < 10)
            if (Platform.OS === 'android' && Platform.Version < 29) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'App needs access to your storage to save reports.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    throw new Error('Storage permission denied');
                }
            }

            // 4. Move PDF to Downloads
            await RNFS.moveFile(internalPath, downloadPath);
            console.log('PDF moved to:', downloadPath);

            setLoadingVisible(false);
            Alert.alert('Success', `Report exported to: ${downloadPath}`);
        } catch (error) {
            setLoadingVisible(false);
            console.error('Error exporting PDF:', error);
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

            {/* Loading Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={loadingVisible}
                onRequestClose={() => {
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size="large" color="#023457"/>
                        <Text style={styles.loadingText}>Generating PDF report...</Text>
                    </View>
                </View>
            </Modal>

            <View>
                <View>
                    <Text>Device Connected:</Text>
                </View>
                <View style={styles.infoFrame}>
                    <Image
                        source={require('../assets/images/watch-menu.png')}
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
            {renderChart && selectedMonths.map(month => (
                <React.Fragment key={month}>
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="hr"
                        title="Heart Rate Summary"
                        chartColor="#FF6347"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="steps"
                        title="Steps Summary"
                        chartColor="#0B3F6B"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="floors"
                        title="Floors Summary"
                        chartColor="#34511e"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="stress"
                        title="Stress Summary"
                        chartColor="#673AB7"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="intensity"
                        title="Intensity Summary"
                        chartColor="#0B3F6B"
                        onDone={handleChartCapture}
                    />
                    <ChartCapture
                        selectedDate={startDate}
                        selectedMonth={month}
                        segmentType="Month"
                        dataType="kcal"
                        title="Kilocalories Summary"
                        chartColor="#FFA500"
                        onDone={handleChartCapture}
                    />
                </React.Fragment>
            ))}
        </SafeAreaView>
    );

};

export default SmartwatchMenuScreen;

