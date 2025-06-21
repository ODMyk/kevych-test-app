import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rem(4),
    },
    time: {
      fontSize: rem(12),
      fontWeight: 700,
      color: Colors.textSecondary,
      lineHeight: rem(16),
    },
    separatorText: {
      fontSize: rem(14),
      fontWeight: 700,
      color: Colors.textSecondary,
      lineHeight: rem(16),
    },
    stationName: {
      fontSize: rem(14),
      fontWeight: 700,
      lineHeight: rem(16),
    },
    point: {
      width: rem(18),
      height: rem(18),
      borderRadius: rem(9),
      backgroundColor: Colors.card,
      borderColor: Colors.primary,
      borderWidth: rem(2),
    },
  });
};
