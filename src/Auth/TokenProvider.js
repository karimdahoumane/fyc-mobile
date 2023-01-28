import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from '../Utils/Constants';

export const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, value)
    } catch (e) {
        console.log(error);
    }
  }

export const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem(TOKEN_KEY)
      if(value !== null) {
        return value;
      }
    } catch(e) {
        console.log(error);
    }
  }

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.log(error);
    }
};