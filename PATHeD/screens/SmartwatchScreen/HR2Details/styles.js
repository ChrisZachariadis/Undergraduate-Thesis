import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center', // Centers everything except the graph
        backgroundColor: 'white',
    },
    loadingFrame: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorFrame: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
        marginTop: 20,
    },
    arrowButton: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dateRangeText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    segmentedControl: {
        width: '80%',
        marginBottom: 20,
    },
    graphContainer: {
        alignSelf: 'stretch',
        marginBottom: 10,
    },
    axisLabel: {
        fontSize: 9,
        color: 'grey',
    },
    yaxisLabel: {
        fontSize: 11,
        color: 'grey',
    },

});
