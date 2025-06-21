import {ChevronLeftIcon} from '@/assets/icons/ChevronLeft';
import {Button} from '@/components/base/Button';
import {ModalSelect} from '@/components/base/ModalSelect';
import {TextField} from '@/components/base/TextField';
import {Typography} from '@/components/base/Typography';
import {trainTypes} from '@/constants/enums';
import {ScheduleForm, scheduleSchema} from '@/forms/Schedule';
import {City, SchedulesService, TrainType} from '@/services/api';
import {useStopsStore} from '@/store/stops';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {StopEntry} from './components/StopEntry';
import {useStyles} from './styles';

interface RouteFormScreenProps {
  variant: 'create' | 'edit';
  defaultValues?: ScheduleForm;
  id?: string;
}

export const RouteFormScreen = ({
  variant,
  defaultValues,
  id,
}: RouteFormScreenProps) => {
  const styles = useStyles();
  const {goBack} = useNavigation();
  const {
    handleSubmit,
    formState: {isSubmitting},
    control,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(scheduleSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const {stops, setStops} = useStopsStore();

  const {trainType} = watch();

  const onChangeTrainType = (trainTypeNew?: TrainType) => {
    setValue('trainType', trainTypeNew as TrainType);
  };

  const addNewStop = () => {
    setStops([...stops, {name: undefined, arrivalTime: undefined} as any]);
  };

  const canCreateNewStop = stops.every(s => s.name && s.time && s.date);

  const onSuccess = async (data: ScheduleForm) => {
    if (stops.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Please add at least 2 stops',
      });
    }

    const stations = stops.map(s => ({
      stationName: s.name,
      arrivalTime: new Date(s.date + s.time).toISOString(),
    }));

    const origin = stations[0].stationName;
    const departureTime = stations[0].arrivalTime;
    const destination = stations[stations.length - 1].stationName;
    const arrivalTime = stations[stations.length - 1].arrivalTime;
    const additionalStops = stations.slice(1, stations.length - 1);

    try {
      if (variant === 'create') {
        await SchedulesService.schedulesControllerCreate({
          ...data,
          origin,
          departureTime,
          destination,
          arrivalTime,
          additionalStops,
        });
        await queryClient.invalidateQueries({
          queryKey: ['schedules'],
          refetchType: 'all',
        });
      } else if (id) {
        await SchedulesService.schedulesControllerUpdate(id, {
          ...data,
          origin,
          departureTime,
          destination,
          arrivalTime,
          additionalStops,
        });

        await queryClient.setQueryData(['schedules'], prev => {
          return {
            ...(prev as any),
            pages: (prev as any)?.pages?.map(page => {
              return {
                ...page,
                data: (page as any)?.data?.map((schedule: any) => {
                  if (schedule.id === id) {
                    return {
                      ...schedule,
                      ...data,
                      origin,
                      departureTime,
                      destination,
                      arrivalTime,
                      additionalStops,
                    };
                  }
                  return schedule;
                }),
              };
            }),
          };
        });

        await queryClient.setQueryData(['single-schedule', id], prev => ({
          ...data,
          origin,
          departureTime,
          destination,
          arrivalTime,
          additionalStops,
          isFavorite: (prev as any)?.isFavorite,
        }));
      }

      goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const onSubmit = handleSubmit(onSuccess, onError);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <ChevronLeftIcon
            height={styles.goBackIcon.height}
            width={styles.goBackIcon.width}
            color={styles.goBackIcon.color}
          />
        </TouchableOpacity>
        <Typography style={styles.headerText}>
          {variant === 'create' ? 'Create' : 'Edit'} Route
        </Typography>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.container}>
              <TextField
                name="routeName"
                label="Route Name"
                placeholder="Enter route name"
                control={control}
              />
            </View>
            <View style={styles.container}>
              <TextField
                name="trainNumber"
                control={control}
                label="Train Number"
                placeholder="Enter train number"
              />
            </View>
          </View>
          <ModalSelect
            label="Train Type"
            currentValue={trainType}
            values={trainTypes}
            onChange={onChangeTrainType}
          />
        </View>
        <View style={styles.card}>
          <Typography>Stations</Typography>
          <View>
            {stops.map((stop, index) => {
              const onChangeName = (value?: City) => {
                if (!value) return;
                const newStops = [...stops];
                newStops[index].name = value;
                setStops(newStops);
              };

              const onRemove = () => {
                const newStops = [...stops];
                newStops.splice(index, 1);
                setStops(newStops);
              };

              const onChangeDate = (value?: number) => {
                if (!value) return;
                const newStops = [...stops];
                newStops[index].date = value;
                setStops(newStops);
              };

              const onChangeTime = (value?: number) => {
                if (!value) return;
                const newStops = [...stops];
                newStops[index].time = value % (24 * 3600000);
                setStops(newStops);
              };

              return (
                <StopEntry
                  {...stop}
                  key={`stop-${stop.name}-${stop.date + stop.time}`}
                  onChangeName={onChangeName}
                  onChangeDate={onChangeDate}
                  onChangeTime={onChangeTime}
                  onRemove={onRemove}
                />
              );
            })}
          </View>
          <Button onPress={addNewStop} disabled={!canCreateNewStop}>
            Add Station
          </Button>
        </View>
        <Button onPress={onSubmit} disabled={isSubmitting}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};
