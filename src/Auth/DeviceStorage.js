import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.log(error);
    }
};

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log(error);
    }
};

const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log(error);
    }
};

const checkAuth = async () => {
    const token = await getToken();
    if (token) {
        return true;
    } else {
        return false;
    }
};

export default { storeToken, getToken, deleteToken, checkAuth };