import AsyncStorage from '@react-native-async-storage/async-storage';
import {IActionLoginSuccess} from '~Root/services/login/types';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (authState: IActionLoginSuccess['payload']) => {
  try {
    AsyncStorage.setItem('token', authState?.data?.access_token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
