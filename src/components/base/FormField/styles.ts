import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = (invalid: boolean) => {
  const {Colors} = useTheme();
  return StyleSheet.create({
    label: {
      fontSize: rem(14),
      paddingLeft: rem(4),
      color: invalid ? Colors.error : Colors.textSecondary,
    },
    error: {
      color: Colors.error,
      fontSize: rem(12),
      paddingLeft: rem(4),
    },
    container: {
      gap: rem(2),
    },
  });
};
