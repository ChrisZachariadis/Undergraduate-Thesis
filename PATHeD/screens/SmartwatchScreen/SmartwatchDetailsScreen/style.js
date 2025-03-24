import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginBottom: 15,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        marginTop: 70,
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
        marginHorizontal: 8,

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
    intensityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    intensityTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F39C12',
    },
    intensityDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    intensityDetail: {
        alignItems: 'center',
        flex: 1,
    },
    intensityLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    intensityText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#424242',
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

    topRightButtons: {
        position: 'absolute',
        top: 15,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
    },
    syncButton: {
        backgroundColor: '#0B3F6B',
        padding: 8,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginRight: 12,
    },
    smartwatchButton: {
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    smartwatchIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
});
