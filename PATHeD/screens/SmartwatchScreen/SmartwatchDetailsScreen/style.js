// style.js

import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    // Container for Date and Navigation Arrows
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 40,
    },
    // Style for the Arrows
    arrow: {
        fontSize: 24,
        color: '#2196F3',
        paddingHorizontal: 20,
    },
    // Style when Arrows are Disabled
    disabledArrow: {
        color: '#ccc',
    },
    // Style for the Date Text
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Container for Steps and Floors Circles
    StepsFloorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    // Frame for the Steps and Floors Circles
    Frame: {
        borderWidth: 0.5,
        borderColor: '#eae9e9',
        borderRadius: 8,
        padding: 18,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    // Container when No Data is Available
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    // Text when No Data is Available
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
    // Style for the Detail Button
    detailButton: {
        marginTop: 12,
        backgroundColor: '#2196F3',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignSelf: 'flex-start',
    },
    // Text inside the Detail Button
    detailButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    // Container for Each Day in the List
    dayContainer: {
        backgroundColor: '#fafafa',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    // General Label Style
    label: {
        fontSize: 16,
        marginVertical: 2,
    },
    // Style for the Average Heart Rate Box
    heartRateBox: {
        borderWidth: 1,
        borderColor: '#eae9e9',
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: 16,
    },
    heartRateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    heartRateTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    heartRateText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrowText: {
        fontSize: 18,
        color: '#2196F3',
    },
    // Style for the Chart Title
    chartTitle: {
        marginTop: 24,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
