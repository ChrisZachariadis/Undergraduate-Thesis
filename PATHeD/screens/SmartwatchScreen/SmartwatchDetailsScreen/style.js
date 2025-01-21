// style.js

import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Slightly off-white for better contrast
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
        color: '#333',
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
        color: '#333',
    },
    // Style for the Average Heart Rate Box
    heartRateBox: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 16,
    },
    heartRateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    heartRateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#D32F2F', // A rich red color for emphasis
    },
    heartRateText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#424242',
    },
    arrowText: {
        fontSize: 20,
        color: '#2196F3',
    },
    // Style for the BMR Kilocalories Box
    kcalBox: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 16,
    },
    kcalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    kcalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF5722', // A vibrant orange color for the fire theme
    },
    kcalText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#424242',
    },
    // Style for the Chart Title
    chartTitle: {
        marginTop: 24,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },

    seeAllButton: {
        position: 'absolute', // Ensures the button stays at the bottom-right
        bottom: 16, // Adjusts distance from the bottom edge
        right: 16, // Adjusts distance from the right edge
        backgroundColor: '#2196F3', // Primary blue color
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    seeAllButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },


});
