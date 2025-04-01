import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadGarminCachedData = async () => {
    try {
        const cachedData = await AsyncStorage.getItem('@garminData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            return {
                entries: parsedData.data || [],
                success: true
            };
        }
        console.log('No cached data found.');
        return {
            entries: [],
            success: false
        };
    } catch (error) {
        console.error('Error loading cached data:', error);
        return {
            entries: [],
            success: false,
            error
        };
    }
};

export const syncGarminData = async () => {
    try {
        const response = await fetch(
            'https://garmin-ucy.3ahealth.com/garmin/dailies',
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            return {
                success: false,
                error: 'Please connect to Garmin through the menu first.'
            };
        }

        const data = await response.json();

        if (data.error) {
            return {
                success: false,
                error: data.error
            };
        }

        // Save the new data to AsyncStorage
        await AsyncStorage.setItem('@garminData', JSON.stringify(data));

        return {
            success: true,
            entries: data.data || [],
            message: 'Garmin data synced successfully!'
        };
    } catch (error) {
        console.error('Garmin fetch error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const retrieveLastSyncTime = async () => {
    const savedSyncTime = await AsyncStorage.getItem('lastSyncTime');
    return savedSyncTime ? new Date(savedSyncTime) : null;
};

export const saveLastSyncTime = async (time) => {
    await AsyncStorage.setItem('lastSyncTime', time.toISOString());
};

export const retrieveConnectionStatus = async () => {
    const savedConnectionStatus = await AsyncStorage.getItem('connectionStatus');
    return savedConnectionStatus ? JSON.parse(savedConnectionStatus) : false;
};

export const saveConnectionStatus = async (status) => {
    await AsyncStorage.setItem('connectionStatus', JSON.stringify(status));
};
