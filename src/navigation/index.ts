import {createNavigationContainerRef} from '@react-navigation/native';
import {AuthParamList} from './Auth';
import {MainFlowParamList} from './Main';

export type MainStackParamList = {
  MainFlow: undefined;
  Auth: undefined;
};

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate<
  RouteName extends
    | keyof MainStackParamList
    | keyof MainFlowParamList
    | keyof AuthParamList,
>(
  screen: RouteName,
  params?: RouteName extends keyof AuthParamList
    ? AuthParamList[RouteName]
    : RouteName extends keyof MainFlowParamList
    ? MainFlowParamList[RouteName]
    : RouteName extends keyof MainStackParamList
    ? MainStackParamList[RouteName]
    : never,
  options?: {merge?: boolean; pop?: boolean},
): void {
  if (!navigationRef.isReady() || !navigationRef.current) return;
  navigationRef.current.navigate(screen as any, params, options);
}
