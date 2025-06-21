import {TOKEN_KEY} from '@/constants/storage';
import Keychain from 'react-native-keychain';

const saveToken = async (token: string) => {
  await Keychain.setGenericPassword(TOKEN_KEY, token);
};

const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};

const removeToken = async () => {
  await Keychain.resetGenericPassword();
};

export const keychain = Object.freeze({
  saveToken,
  getToken,
  removeToken,
});
