// style.js
import { StyleSheet, Dimensions } from 'react-native';

const containerPadding = 16;
const screenWidth = Dimensions.get('window').width - containerPadding * 2; // Adjusted for container padding

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
    chartWrapper: {
        position: 'relative',
        width: screenWidth,
        height: 400, // Match the chart's height
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        position: 'absolute',
        top: -60, // Fixed y position above the chart
        width: 120, // Fixed width for the tooltip
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 6,
        padding: 8,
        // Shadow on iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Elevation on Android
        elevation: 4,
        alignItems: 'center',
        zIndex: 1000, // Ensure the tooltip is above other elements
    },
    tooltipText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
    },
    tooltipPointer: {
        position: 'absolute',
        bottom: -6, // Position the pointer at the bottom of the tooltip
        left: '50%',
        marginLeft: -6, // Half of the pointer's width to center it
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#888',
    },
});
