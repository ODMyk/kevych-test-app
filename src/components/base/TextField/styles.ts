import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();
  return StyleSheet.create({
    input: {
      borderColor: Colors.border,
      borderWidth: rem(1),
      borderRadius: rem(10),
      padding: rem(16),
      color: Colors.textPrimary,
    },
    placeholder: {},
    invalid: {
      borderColor: Colors.error,
    },
    focused: {
      borderColor: Colors.accent,
    },
  });
};
