import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1,
      padding: rem(16),
    },
    list: {
      flex: 1,
      backgroundColor: 'yellow',
    },
  });
};
