import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Stores data in async storage
 */
export const storeData = async (value: string, key: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error("Error saving data", e);
    return false;
  }
};

/**
 * Gets data from async storage
 */
export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error("Error reading data", e);
    return null;
  }
};
