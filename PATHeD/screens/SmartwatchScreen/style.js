// style.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    topSection: {
        alignItems: 'center',
        paddingTop: '20%',
    },
    connectButton: {
        backgroundColor: '#023457',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    entryBox: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginVertical: 12,
    },
    todayMargin: {
        marginTop: 40,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    entryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    viewDetailsText: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    entryLabel: {
        fontSize: 16,
        color: '#555',
        marginVertical: 2,
    },
    noTodayContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#ffe6e6',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
