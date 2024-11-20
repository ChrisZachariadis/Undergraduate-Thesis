import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content towards the top
        alignItems: 'center', // Center horizontally
        paddingTop: '30%', // Push the button to the center of the top half
        backgroundColor: '#f9f9f9',

    },
    buttonText: {
        color: '#fff', // White text color
        fontSize: 18, // Larger text
        fontWeight: 'bold', // Bold text
        textAlign: 'center', // Center align text
    },
    barText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bpmBox: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center content horizontally
        backgroundColor: '#0C6C79', // Match the globalStyle button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        width: '80%', // Adjust width to fit design
    },
    heartIcon: {
        marginRight: 10, // Space between icon and text
    },
    bpmText: {
        color: '#fff', // White text color
        fontSize: 18,
        fontWeight: 'bold',
    },

    connectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },


});

export default styles;
