// HRStyle.js

import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    // Title Style
    title: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50', // Green color to match the chart
        textAlign: 'center',
        marginBottom: 16,
    },
    // Time Range Selector Styles
    rangeSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    rangeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 5,
    },
    selectedRangeButton: {
        backgroundColor: '#2196F3',
    },
    rangeButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '600',
    },
    selectedRangeButtonText: {
        color: '#fff',
    },
    // Conditional Navigation Container (if needed)
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    // Navigation Buttons (if using navigation within HRDetailsScreen)
    navButton: {
        backgroundColor: '#2196F3', // Blue color for buttons
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    // Week Label (if applicable)
    weekLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
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
    // General Label Style (if needed)
    label: {
        fontSize: 16,
        marginVertical: 2,
    },
});
