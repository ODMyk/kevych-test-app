import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {Colors} = useTheme();
  const {top} = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rem(12),
      backgroundColor: Colors.card,
      borderBottomWidth: rem(1),
      borderBottomColor: Colors.border,
      padding: rem(16),
      paddingTop: rem(top + 16),
    },
    headerText: {
      fontSize: rem(24),
      fontWeight: 700,
      color: Colors.textPrimary,
    },
    icon: {
      width: rem(32),
      height: rem(32),
      color: Colors.textPrimary,
    },
    content: {
      flex: 1,
      padding: rem(16),
    },
    contentContainer: {
      gap: rem(16),
    },
    card: {
      borderRadius: rem(10),
      backgroundColor: Colors.card,
      padding: rem(16),
      gap: rem(16),
    },
    fieldContainer: {
      gap: rem(4),
    },
    fieldName: {
      fontSize: rem(16),
      fontWeight: 700,
    },
    field: {
      fontSize: rem(16),
      color: Colors.textSecondary,
    },
    stationsContainer: {},
    removeButton: {
      backgroundColor: Colors.error,
    },
  });
};
