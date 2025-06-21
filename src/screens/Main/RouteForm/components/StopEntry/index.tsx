import {CrossIcon} from '@/assets/icons/Cross';
import {ModalSelect} from '@/components/base/ModalSelect';
import {Typography} from '@/components/base/Typography';
import {cities} from '@/constants/enums';
import {City} from '@/services/api';
import {jsDateToDate, jsDateToTime} from '@/services/formatters';
import {useStopsStore} from '@/store/stops';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useStyles} from './styles';

interface StopEntryProps {
  name: City;
  date: number;
  time: number;

  onChangeName: (name?: City) => void;
  onChangeDate: (date?: number) => void;
  onChangeTime: (time?: number) => void;
  onRemove: () => void;
}

export const StopEntry = ({
  name,
  date,
  time,
  onChangeDate,
  onChangeName,
  onChangeTime,
  onRemove,
}: StopEntryProps) => {
  const styles = useStyles();
  const [dateModalOpened, setDateModalOpened] = useState(false);
  const [timeModalOpened, setTimeModalOpened] = useState(false);
  const {stops} = useStopsStore();

  const availableStations = cities.filter(
    city =>
      city.value === name || stops.every(stop => stop.name !== city.value),
  );

  const openDateModal = () => setDateModalOpened(true);
  const openTimeModal = () => setTimeModalOpened(true);
  const closeDateModal = () => setDateModalOpened(false);
  const closeTimeModal = () => setTimeModalOpened(false);

  const handleDateSelect = (date: Date) => {
    onChangeDate(date.getTime());
    closeDateModal();
  };

  const handleTimeSelect = (time: Date) => {
    onChangeTime(time.getTime());
    closeTimeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.flex}>
          <ModalSelect
            label="Station"
            currentValue={name}
            values={availableStations}
            onChange={onChangeName}
          />
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <CrossIcon
            color={styles.icon.color}
            width={styles.icon.width}
            height={styles.icon.height}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Typography style={styles.label}>Date</Typography>
          <TouchableOpacity style={styles.button} onPress={openDateModal}>
            <Typography style={[styles.text, date > 0 && styles.textActive]}>
              {date && date > 0 ? jsDateToDate(new Date(date)) : 'None'}
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Typography style={styles.label}>Time</Typography>
          <TouchableOpacity style={styles.button} onPress={openTimeModal}>
            <Typography style={[styles.text, time > 0 && styles.textActive]}>
              {time && time > 0 ? jsDateToTime(new Date(time)) : 'None'}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        mode="date"
        isVisible={dateModalOpened}
        onConfirm={handleDateSelect}
        onCancel={closeDateModal}
      />
      <DateTimePicker
        mode="time"
        isVisible={timeModalOpened}
        onConfirm={handleTimeSelect}
        onCancel={closeTimeModal}
      />
    </View>
  );
};
