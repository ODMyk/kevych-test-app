import {View} from 'react-native';
import {useStyles} from './styles';

export const MarkerSeparator = () => {
  const styles = useStyles();

  return <View style={styles.separator} />;
};
