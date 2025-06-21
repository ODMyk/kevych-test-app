import {BootsplashScreen} from '@/screens/Auth/Bootsplash';
import {LoginScreen} from '@/screens/Auth/Login';
import {RegisterScreen} from '@/screens/Auth/Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type AuthParamList = {
  Bootsplash: undefined;
  Login: undefined;
  Register: undefined;
};

const AuthStackNavigator = createNativeStackNavigator<AuthParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNavigator.Screen
        name="Bootsplash"
        component={BootsplashScreen}
      />
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="Register" component={RegisterScreen} />
    </AuthStackNavigator.Navigator>
  );
};
