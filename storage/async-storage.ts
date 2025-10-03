import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_KEY } from "./async-storage-keys";
/**
 * Stores data in async storage
 */
export const storeData = async (value: string, key: string = DEFAULT_KEY) => {
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
export const getData = async (key: string = DEFAULT_KEY) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Error reading data", e);
    return null;
  }
};

/**
 * Removes data from async storage
 */
export const removeData = async (key: string = DEFAULT_KEY) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error("Error removing data", e);
    return false;
  }
};

/**
 * Clears all data from async storage
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error("Error clearing data", e);
    return false;
  }
};

/**
 * Gets all keys from async storage
 */
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.error("Error getting keys", e);
    return [];
  }
};

/**
 * Stores object data in async storage
 */
export const storeObjectData = async (value: object, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error("Error saving object data", e);
    return false;
  }
};

/**
 * Gets object data from async storage
 */
export const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading object data", e);
    return null;
  }
};
