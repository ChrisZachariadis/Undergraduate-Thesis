// style.js
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // Removed padding here to manage it in HRDetailsScreen.js
    },
    // Title Style
    headerContainer: {
        alignItems: 'center',
    },
    title: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#023457', // Green color to match the chart
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
    // Navigation Container
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distributes arrows and title evenly
        marginVertical: 16,
    },
    navigationButton: {
        padding: 10, // Space around the arrow icons
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginLeft: 8,
    },
    calendarIcon: {
        marginRight: 8,
    },
    // Chart Styles
    chartContainer: {
        marginVertical: 16,
        borderRadius: 8,
    },
    // No Data Section
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
    // Tooltip Styles
    tooltipContainer: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#888',

        // Shadow (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        // Elevation (Android)
        elevation: 4,

        // Align items to center for pointer
        alignItems: 'center',
    },
    tooltipText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
    },
    tooltipPointer: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        // borderTopWidth or borderBottomWidth will be set dynamically
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    pointerUp: {
        borderBottomWidth: 10,
        borderBottomColor: '#888',
        marginTop: 2,
    },
    pointerDown: {
        borderTopWidth: 10,
        borderTopColor: '#888',
        marginTop: 2,
    },
});
