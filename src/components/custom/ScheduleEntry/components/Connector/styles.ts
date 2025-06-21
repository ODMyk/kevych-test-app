import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    wrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: rem(8),
    },
    point: {
      width: rem(12),
      height: rem(12),
      borderRadius: rem(6),
      backgroundColor: Colors.card,
      borderColor: Colors.primary,
      borderWidth: rem(2),
    },
    line: {
      flex: 1,
      height: rem(2),
      backgroundColor: Colors.primary,
    },
  });
};
