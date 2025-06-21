import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.card,
      borderRadius: rem(10),
      paddingVertical: rem(16),
      paddingLeft: rem(16),
      flexDirection: 'row-reverse',
      flex: 1,
      width: '100%',
      maxWidth: '100%',
    },
    content: {
      flex: 1,
      gap: rem(8),
    },
    margin: {
      marginBottom: rem(16),
    },
    between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: rem(16),
      fontWeight: 700,
    },
    type: {
      fontSize: rem(12),
      fontWeight: 500,
    },
    time: {
      fontSize: rem(12),
      fontWeight: 700,
      color: Colors.textSecondary,
    },
    trainType: {
      fontSize: rem(10),
      fontWeight: 700,
      color: Colors.textLight,
      paddingVertical: rem(2),
      paddingHorizontal: rem(4),
      borderRadius: rem(4),
      backgroundColor: Colors.primary,
    },
    trainTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rem(8),
    },
    icon: {
      width: rem(28),
      height: rem(28),
      color: Colors.primary,
    },
    button: {
      width: rem(50),
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
