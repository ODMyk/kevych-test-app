import {CreateRouteScreen} from '@/screens/Main/CreateRoute';
import {EditRouteScreen} from '@/screens/Main/EditRoute';
import {ScheduleDetailsScreen} from '@/screens/Main/Schedule';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabsNavigator} from './MainTabs';
export type MainFlowParamList = {
  Tabs: undefined;
  ScheduleDetails: {scheduleId: string};
  CreateRoute: undefined;
  EditRoute: {scheduleId: string};
};

const MainFlowNavigator = createNativeStackNavigator<MainFlowParamList>();

export const MainFlowNavigatorComponent = () => {
  return (
    <MainFlowNavigator.Navigator screenOptions={{headerShown: false}}>
      <MainFlowNavigator.Screen name="Tabs" component={TabsNavigator} />
      <MainFlowNavigator.Screen
        name="ScheduleDetails"
        component={ScheduleDetailsScreen}
      />
      <MainFlowNavigator.Screen
        name="CreateRoute"
        component={CreateRouteScreen}
      />
      <MainFlowNavigator.Screen name="EditRoute" component={EditRouteScreen} />
    </MainFlowNavigator.Navigator>
  );
};
