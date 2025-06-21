import {useStopsStore} from '@/store/stops';
import {useEffect} from 'react';
import {RouteFormScreen} from '../RouteForm';

export const CreateRouteScreen = () => {
  const {setStops} = useStopsStore();
  useEffect(() => {
    setStops([]);
  }, [setStops]);

  return <RouteFormScreen variant="create" />;
};
