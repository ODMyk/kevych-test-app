import {useSingleSchedule} from '@/hooks/useSingleSchedule';
import {MainFlowParamList} from '@/navigation/Main';
import {dateFromISO} from '@/services/formatters';
import {useStopsStore} from '@/store/stops';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {RouteFormScreen} from '../RouteForm';

const ejectDateAndTime = (date: Date) => {
  const time = date.getTime() % (24 * 3600000);
  return {
    date: date.getTime() - time,
    time,
  };
};

export const EditRouteScreen = () => {
  const {params} = useRoute<RouteProp<MainFlowParamList, 'EditRoute'>>();
  const {data, isLoading} = useSingleSchedule(params?.scheduleId ?? '');
  const {setStops} = useStopsStore();

  useEffect(() => {
    if (!data) {
      return;
    }

    setStops([
      {
        name: data.origin,
        ...ejectDateAndTime(dateFromISO(data.departureTime)),
      },
      ...data.additionalStops.map(s => ({
        name: s.stationName,
        ...ejectDateAndTime(dateFromISO(s.arrivalTime)),
      })),
      {
        name: data.destination,
        ...ejectDateAndTime(dateFromISO(data.arrivalTime)),
      },
    ]);
  }, [data, setStops]);

  if (!data || isLoading) {
    return null;
  }

  return (
    <RouteFormScreen
      variant="edit"
      defaultValues={{
        routeName: data.routeName,
        trainNumber: data.trainNumber,
        trainType: data.trainType,
      }}
      id={data.id}
    />
  );
};
