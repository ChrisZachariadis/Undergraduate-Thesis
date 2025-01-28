import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 40,
    },
    arrow: {
        fontSize: 24,
        color: '#023457',
        paddingHorizontal: 20,
    },
    disabledArrow: {
        color: '#ccc',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        textDecorationLine: 'underline',
        textDecorationColor: '#023457',
    },
    StepsFloorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8,
    },
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
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 90,
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
        color: '#D32F2F',
    },
    heartRateText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#424242',
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
        color: '#FF5722',
    },
    kcalText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#424242',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        marginTop: 16,
        backgroundColor: '#023457',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    stressTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8E44AD',
    },
    stressDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    stressDetail: {
        alignItems: 'center',
        flex: 1,
    },
    stressLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    stressText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#424242',
    },

    syncButton: {
        position: 'absolute', // Make it float on top
        top: 10, // Distance from the top of the screen
        right: 10, // Distance from the right of the screen
        backgroundColor: '#023457',
        padding: 8, // Adjust size of the button
        borderRadius: 16, // Round button
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, // Shadow on Android
        zIndex: 1000, // Ensure it appears on top of all other elements
    },


});
