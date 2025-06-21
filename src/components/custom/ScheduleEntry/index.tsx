import {HeartIcon} from '@/assets/icons/Heart';
import {Typography} from '@/components/base/Typography';
import {MainFlowParamList} from '@/navigation/Main';
import {ISOtoTime} from '@/services/formatters';
import {switchFavorite} from '@/services/switchFavorite';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {TouchableOpacity, View} from 'react-native';
import {ScheduleResponseDto} from '../../../../api/dist/schedules/dtos/shedule.dto';
import {Connector} from './components/Connector';
import {useStyles} from './styles';

export type ScheduleShort = Pick<
  ScheduleResponseDto,
  | 'id'
  | 'origin'
  | 'destination'
  | 'routeName'
  | 'departureTime'
  | 'arrivalTime'
  | 'trainType'
  | 'isFavorite'
>;

interface ScheduleEntryProps {
  item: ScheduleShort;
  withMargin?: boolean;
  isLast?: boolean;
}

export const ScheduleEntry = ({
  item,
  withMargin,
  isLast,
}: ScheduleEntryProps) => {
  const styles = useStyles();
  const {navigate} = useNavigation<NavigationProp<MainFlowParamList>>();
  const queryClient = useQueryClient();

  const goToSchedule = () => {
    navigate('ScheduleDetails', {scheduleId: item.id});
  };

  const like = () => switchFavorite(item.isFavorite, item.id, queryClient);

  return (
    <TouchableOpacity
      style={[styles.container, withMargin && !isLast && styles.margin]}
      onPress={goToSchedule}>
      <TouchableOpacity style={styles.button} onPress={like}>
        <HeartIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.color}
          fill={item.isFavorite ? styles.icon.color : undefined}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.trainTypeContainer}>
          <Typography style={styles.title}>{item.routeName}</Typography>
          <Typography style={styles.trainType}>{item.trainType}</Typography>
        </View>
        <View style={styles.between}>
          <Typography style={styles.time}>{item.origin}</Typography>
          <Typography style={styles.time}>{item.destination}</Typography>
        </View>
        <Connector />
        <View style={styles.between}>
          <Typography style={styles.time}>
            {ISOtoTime(item.departureTime)}
          </Typography>
          <Typography style={styles.time}>
            {ISOtoTime(item.arrivalTime)}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
