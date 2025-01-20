// style.js

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 40,
    },
    StepsFloorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    label: {
        fontSize: 16,
        marginVertical: 2,
    },
    chartTitle: {
        marginTop: 24,
        fontWeight: 'bold',
        fontSize: 18,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailButton: {
        marginTop: 12,
        backgroundColor: '#2196F3',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignSelf: 'flex-start',
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});
