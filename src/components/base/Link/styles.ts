import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    link: {
      color: Colors.primary,
      fontSize: rem(14),
      lineHeight: rem(24),
      fontWeight: 500,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
