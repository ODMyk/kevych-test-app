import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {Colors} = useTheme();
  const {top} = useSafeAreaInsets();

  return StyleSheet.create({
    header: {
      backgroundColor: Colors.card,
      padding: rem(16),
      paddingTop: top + rem(16),
      borderBottomColor: Colors.border,
      borderBottomWidth: rem(1),
      gap: rem(12),
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rem(12),
    },
    content: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: rem(16),
    },
    dateButtonContainer: {
      flex: 1,
      gap: rem(2),
    },
    dateButton: {
      backgroundColor: Colors.card,
      paddingVertical: rem(12),
      paddingHorizontal: rem(16),
      borderRadius: rem(10),
      borderWidth: rem(1),
      borderColor: Colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      paddingLeft: rem(4),
      color: Colors.textSecondary,
      fontSize: rem(14),
    },
    time: {
      fontSize: rem(16),
      color: Colors.textSecondary,
      opacity: 0.8,
      lineHeight: rem(24),
    },
    timeActive: {
      color: Colors.textPrimary,
      opacity: 1,
    },
    crossIcon: {
      width: rem(24),
      height: rem(24),
      color: Colors.primary,
    },
  });
};
