import {ProfileIcon} from '@/assets/icons/Profile';
import {Button} from '@/components/base/Button';
import {Typography} from '@/components/base/Typography';
import {useAuthStore} from '@/store/auth';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from './styles';

export const ProfileScreen = () => {
  const styles = useStyles();
  const {user, logout} = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <ProfileIcon
          width={styles.icon.width}
          height={styles.icon.height}
          color={styles.icon.color}
        />
      </View>
      <Typography>{user.email}</Typography>
      <Button style={styles.button} onPress={logout}>
        Sign Out
      </Button>
    </SafeAreaView>
  );
};
