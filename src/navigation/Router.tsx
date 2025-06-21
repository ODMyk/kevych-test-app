import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, navigationRef} from '.';
import {AuthNavigator} from './Auth';
import {MainFlowNavigatorComponent} from './Main';

const MainNavigator = createNativeStackNavigator<MainStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Auth">
        <MainNavigator.Screen name="Auth" component={AuthNavigator} />
        <MainNavigator.Screen
          name="MainFlow"
          component={MainFlowNavigatorComponent}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};
