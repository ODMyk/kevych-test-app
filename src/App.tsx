import {OpenAPI} from '@api/core/OpenAPI';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Constants from 'expo-constants';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {LOCALHOST_URL} from './constants/localhost';
import {Router} from './navigation/Router';
import {disconnectWebSocket} from './services/websocket';
import {useTheme} from './theme';

const queryClient = new QueryClient();

OpenAPI.BASE = Constants.expoConfig?.extra?.BACKEND_API_URL ?? LOCALHOST_URL;

export const App = () => {
  const {Fonts} = useTheme();
  const [fontsLoaded] = useFonts({
    [Fonts.regular]: require('./assets/fonts/Inter_Regular.ttf'),
    [Fonts.medium]: require('./assets/fonts/Inter_Medium.ttf'),
    [Fonts.semiBold]: require('./assets/fonts/Inter_SemiBold.ttf'),
    [Fonts.bold]: require('./assets/fonts/Inter_Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toast />
    </QueryClientProvider>
  );
};
