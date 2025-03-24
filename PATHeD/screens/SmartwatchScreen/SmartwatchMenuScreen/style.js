import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        padding: 20,
        justifyContent: 'space-between',
        marginTop: 55,
    },
    infoFrame: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    watchIcon: {
        width: 55,
        height: 55,
    },
    deviceName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    // Container for buttons in the same row
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    connectButton: {
        backgroundColor: '#023457',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 40,
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    generateReportButton: {
        backgroundColor: '#fff',
        borderColor: '#023457',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 40,
    },
    disconnectButtonText: {
        color: '#023457',
        fontSize: 18,
        fontWeight: 'bold',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calendar: {
        borderRadius: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginHorizontal: 5,
    },
    buttonClose: {
        backgroundColor: '#4a6373',
    },
    buttonConfirm: {
        backgroundColor: '#031c2e',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
