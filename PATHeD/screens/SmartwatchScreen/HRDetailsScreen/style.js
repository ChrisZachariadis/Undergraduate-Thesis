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
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    modalText: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
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
});
