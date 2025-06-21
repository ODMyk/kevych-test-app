import {CrossIcon} from '@/assets/icons/Cross';
import {ModalSelect} from '@/components/base/ModalSelect';
import {Typography} from '@/components/base/Typography';
import {ScheduleEntry, ScheduleShort} from '@/components/custom/ScheduleEntry';
import {cities, trainTypes} from '@/constants/enums';
import {useSchedules} from '@/hooks/useSchedules';
import {City, TrainType} from '@/services/api';
import {ISOToDate} from '@/services/formatters';
import {connectWebSocket} from '@/services/websocket';
import {useFiltersStore} from '@/store/filters';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useStyles} from './styles';

// const schedules = [] as ScheduleShort[];
// const fetchNextPage = () => {};

export const HomeScreen = () => {
  const styles = useStyles();
  const {
    setOrigin,
    origin,
    setDestination,
    destination,
    setTrainType,
    trainType,
    date,
    setDate,
  } = useFiltersStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    connectWebSocket(queryClient);
  }, [queryClient]);

  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const showDatePicker = () => setDatePickerOpened(true);
  const hideDatePicker = () => setDatePickerOpened(false);
  const handleDateSelect = (date: Date) => {
    setDate(date.toISOString());
    queryClient.invalidateQueries({queryKey: ['schedules']});
    hideDatePicker();
  };

  const onOriginChange = (origin?: City) => {
    setOrigin(origin);
    queryClient.invalidateQueries({queryKey: ['schedules']});
  };

  const onDestinationChange = (destination?: City) => {
    setDestination(destination);
    queryClient.invalidateQueries({queryKey: ['schedules']});
  };

  const onTrainTypeChange = (trainType?: TrainType) => {
    setTrainType(trainType);
    queryClient.invalidateQueries({queryKey: ['schedules']});
  };

  const {fetchNextPage, schedules} = useSchedules();
  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<ScheduleShort>) => (
      <ScheduleEntry
        item={item}
        withMargin
        isLast={index === (schedules?.length ?? 1) - 1}
      />
    ),
    [schedules],
  );

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <ModalSelect
              label="From"
              currentValue={origin}
              values={cities}
              onChange={onOriginChange}
              clearable
            />
          </View>
          <View style={styles.flex}>
            <ModalSelect
              label="To"
              currentValue={destination}
              values={cities}
              onChange={onDestinationChange}
              clearable
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.flex}>
            <ModalSelect
              label="Train type"
              currentValue={trainType}
              values={trainTypes}
              onChange={onTrainTypeChange}
              clearable
            />
          </View>
          <View style={styles.dateButtonContainer}>
            <Typography style={styles.label}>Departure date</Typography>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={showDatePicker}>
              <Typography style={[styles.time, date && styles.timeActive]}>
                {date ? ISOToDate(date) : 'None'}
              </Typography>
              {date && (
                <TouchableOpacity onPress={() => setDate(undefined)}>
                  <CrossIcon
                    height={styles.crossIcon.height}
                    width={styles.crossIcon.width}
                    color={styles.crossIcon.color}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <FlashList
          data={schedules}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={fetchNextPage}
          showsVerticalScrollIndicator={false}
          bounces={false}
          estimatedItemSize={121}
        />
      </View>
      <DateTimePickerModal
        isVisible={datePickerOpened}
        mode="date"
        onConfirm={handleDateSelect}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
