import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'agreement';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
            return value;
        }
        return false;
    } catch (e) {
        // error reading value
    }
};