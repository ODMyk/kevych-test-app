import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {Colors} = useTheme();
  const {top, bottom} = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: rem(16),
      paddingTop: top + rem(16),
      gap: rem(12),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.card,
      borderBottomWidth: rem(1),
      borderBottomColor: Colors.border,
    },
    headerText: {
      fontWeight: 700,
      fontSize: rem(24),
    },
    content: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: rem(16),
    },
    contentContainer: {
      gap: rem(16),
      paddingBottom: bottom + rem(24),
    },
    card: {
      borderRadius: rem(10),
      backgroundColor: Colors.card,
      padding: rem(16),
      gap: rem(8),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rem(12),
    },
    goBackIcon: {
      width: rem(32),
      height: rem(32),
      color: Colors.textPrimary,
    },
  });
};
