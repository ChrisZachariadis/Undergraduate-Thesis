import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    metricsContainer: {
        padding: 6,
    },

    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },

    metricCard: {
        flex: 1,
        marginHorizontal: 4,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },

    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textContainer: {
        flex: 1,
    },

    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },

    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    unit: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },

    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
