// style.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 16,
        paddingTop: 20,
        marginTop: 50,
    },
    dayContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 10, // spacing top & bottom
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0C6C79',
        textAlign: 'center', // Center align the date text
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
    },
    circleContainer: { // Added to match component
        alignItems: 'center',
        marginVertical: 16,
    },
    singleCircleContainer: { // Added to match component
        alignItems: 'center',
        marginVertical: 16,
    },
    chartContainer: { // New style for the chart
        marginTop: 16,
        alignItems: 'center',
    },
});

export default styles;
