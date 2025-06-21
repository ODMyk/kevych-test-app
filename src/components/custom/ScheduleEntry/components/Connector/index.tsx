import {View} from 'react-native';
import {useStyles} from './styles';

export const Connector = () => {
  const styles = useStyles();
  return (
    <View style={styles.wrapper}>
      <View style={styles.point} />
      <View style={styles.line} />
      <View style={styles.point} />
    </View>
  );
};
