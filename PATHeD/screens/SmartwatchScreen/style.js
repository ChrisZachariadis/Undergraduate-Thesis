// style.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    todayContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#e6faff',
        borderRadius: 8,
        marginTop: 40,
    },
    noTodayContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#ffe6e6',
        borderRadius: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        marginVertical: 2,
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
    dayContainer: {
        backgroundColor: '#fafafa',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    StepsFloorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
});
