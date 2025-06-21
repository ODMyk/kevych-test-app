import {ChevronLeftIcon} from '@/assets/icons/ChevronLeft';
import {Button} from '@/components/base/Button';
import {Typography} from '@/components/base/Typography';
import {RoleGuard} from '@/components/layout/RoleGuard';
import {useSingleSchedule} from '@/hooks/useSingleSchedule';
import {MainFlowParamList} from '@/navigation/Main';
import {SchedulesService, UserRole} from '@/services/api';
import {switchFavorite} from '@/services/switchFavorite';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {MarkerSeparator} from './components/MarkerSeparator';
import {StationMarker} from './components/StationMarker';
import {useStyles} from './styles';

export const ScheduleDetailsScreen = () => {
  const {params} = useRoute<RouteProp<MainFlowParamList, 'ScheduleDetails'>>();
  const {data, isLoading} = useSingleSchedule(params?.scheduleId ?? '');
  const {goBack, navigate} = useNavigation<NavigationProp<MainFlowParamList>>();
  const styles = useStyles();
  const queryClient = useQueryClient();

  const goToEdit = () => {
    navigate('EditRoute', {scheduleId: params?.scheduleId ?? ''});
  };

  const remove = async () => {
    try {
      await SchedulesService.schedulesControllerDelete(
        params?.scheduleId ?? '',
      );
      queryClient.removeQueries({
        queryKey: ['single-schedule', params?.scheduleId ?? ''],
      });
      queryClient.setQueryData(['schedules'], prev => {
        return {
          ...(prev as any),
          pages: (prev as any)?.pages?.map(page => {
            return {
              ...page,
              data: (page as any)?.data?.filter(
                (schedule: any) => schedule.id !== params?.scheduleId,
              ),
            };
          }),
        };
      });
    } catch (error) {
      console.error(error);
    }
    goBack();
  };

  const like = () =>
    switchFavorite(data?.isFavorite, params?.scheduleId ?? '', queryClient);

  const favoriteText = data?.isFavorite
    ? 'Remove from favorites'
    : 'Add to favorites';

  if (!data) {
    return !isLoading ? (
      <View>
        <Text>Not found</Text>
      </View>
    ) : null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <ChevronLeftIcon
            width={styles.icon.width}
            height={styles.icon.height}
            color={styles.icon.color}
          />
        </TouchableOpacity>
        <Typography style={styles.headerText}>{data.routeName}</Typography>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.fieldContainer}>
            <Typography style={styles.fieldName}>Train type</Typography>
            <Typography style={styles.field}>{data.trainType}</Typography>
          </View>
          <View style={styles.fieldContainer}>
            <Typography style={styles.fieldName}>Train number</Typography>
            <Typography style={styles.field}>{data.trainNumber}</Typography>
          </View>
        </View>
        <View style={styles.card}>
          <Typography style={styles.fieldName}>Stations</Typography>
          <View style={styles.stationsContainer}>
            <StationMarker
              arrivalTimeISO={data.departureTime}
              stationName={data.origin}
            />
            {data.additionalStops.map(station => (
              <View key={`${station.arrivalTime}-${station.stationName}`}>
                <MarkerSeparator />
                <StationMarker
                  arrivalTimeISO={station.arrivalTime}
                  stationName={station.stationName}
                />
              </View>
            ))}
            <MarkerSeparator />
            <StationMarker
              arrivalTimeISO={data.arrivalTime}
              stationName={data.destination}
            />
          </View>
        </View>
        <Button onPress={like}>{favoriteText}</Button>
        <RoleGuard roles={[UserRole.ADMIN]}>
          <Button onPress={goToEdit}>Edit</Button>
          <Button onPress={remove} style={styles.removeButton}>
            Remove
          </Button>
        </RoleGuard>
      </ScrollView>
    </View>
  );
};
