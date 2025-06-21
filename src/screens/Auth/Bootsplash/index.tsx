import {AuthParamList} from '@/navigation/Auth';
import {keychain} from '@/services/keychain';
import {useAuthStore} from '@/store/auth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View} from 'react-native';

export const BootsplashScreen = () => {
  const {navigate} = useNavigation<NavigationProp<AuthParamList>>();

  const {login} = useAuthStore();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedToken = await keychain.getToken();
        if (!savedToken) {
          navigate('Login');
          return;
        }

        login(savedToken);
      } catch (error) {
        console.error(error);
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View />;
};
