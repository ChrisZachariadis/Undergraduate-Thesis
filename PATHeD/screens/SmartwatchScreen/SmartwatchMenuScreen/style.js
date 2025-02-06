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
    disconnectButton: {
        backgroundColor: '#fff',
        borderColor: '#023457',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 40,
    },
    disconnectButtonText: {
        color: '#023457',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
