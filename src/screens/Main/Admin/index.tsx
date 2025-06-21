import {Button} from '@/components/base/Button';
import {MainFlowParamList} from '@/navigation/Main';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from './styles';

export const AdminScreen = () => {
  const styles = useStyles();
  const {navigate} = useNavigation<NavigationProp<MainFlowParamList>>();

  const goToCreate = () => navigate('CreateRoute');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Button style={styles.button} onPress={goToCreate}>
        Create route
      </Button>
    </SafeAreaView>
  );
};
