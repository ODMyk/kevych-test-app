import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: rem(12),
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      gap: rem(12),
    },
    flex: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      gap: rem(2),
    },
    button: {
      paddingVertical: rem(12),
      paddingHorizontal: rem(16),
      alignItems: 'center',
      borderWidth: rem(1),
      borderColor: Colors.border,
      borderRadius: rem(10),
    },
    label: {
      paddingLeft: rem(4),
      fontSize: rem(14),
      color: Colors.textSecondary,
    },
    text: {
      fontSize: rem(16),
      color: Colors.textSecondary,
      opacity: 0.8,
      lineHeight: rem(24),
    },
    textActive: {
      opacity: 1,
      color: Colors.textPrimary,
    },
    removeButton: {
      paddingTop: rem(32),
      justifyContent: 'flex-start',
      height: '100%',
    },
    icon: {
      height: rem(32),
      width: rem(32),
      color: Colors.primary,
    },
  });
};
