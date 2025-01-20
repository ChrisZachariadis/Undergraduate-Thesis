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
    StepsFloorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 16,
    },
    circleWithTitle: {
        alignItems: 'center',
    },
    circleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
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
    stepsCircleWrapper: {
        position: 'relative',
    },
    stepsOverlayTextContainer: {
        position: 'absolute',
        top: '30%', // Adjust as needed
        width: '100%',
        alignItems: 'center',
    },
    stepsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0C6C79',
    },
    stepsGoalText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    },
    floorsCircleWrapper: {
        position: 'relative',
    },
    floorsOverlayTextContainer: {
        position: 'absolute',
        top: '30%', // Adjust as needed
        width: '100%',
        alignItems: 'center',
    },
    floorsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4CAF50',
    },
    floorsGoalText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    },
    chartContainer: { // New style for the chart
        marginTop: 16,
        alignItems: 'center',
    },
});

export default styles;
