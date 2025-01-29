// styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        justifyContent: 'center', // Center the button vertically
        alignItems: 'center',     // Center the button horizontally
        backgroundColor: '#f0f4f7', // Optional: Add a light background for contrast
    },
    connectButton: {
        backgroundColor: '#023457',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    connectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
