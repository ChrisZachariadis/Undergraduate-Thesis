import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#333',
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    infoBox: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
});
