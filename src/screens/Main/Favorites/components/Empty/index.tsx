import {Typography} from '@/components/base/Typography';
import {View} from 'react-native';
import {useStyles} from './styles';

export const Empty = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Typography style={styles.text}>You have no favorites yet</Typography>
    </View>
  );
};
