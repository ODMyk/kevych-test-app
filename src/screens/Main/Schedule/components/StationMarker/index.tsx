import {Typography} from '@/components/base/Typography';
import {ISOtoTime} from '@/services/formatters';
import {View} from 'react-native';
import {useStyles} from './styles';

interface StationMarkerProps {
  stationName: string;
  arrivalTimeISO: string;
}

export const StationMarker = ({
  arrivalTimeISO,
  stationName,
}: StationMarkerProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.point} />
      <Typography style={styles.time}>{ISOtoTime(arrivalTimeISO)}</Typography>
      <Typography style={styles.separatorText}> - </Typography>
      <Typography style={styles.stationName}>{stationName}</Typography>
    </View>
  );
};
