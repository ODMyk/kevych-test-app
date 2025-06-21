import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();

  return StyleSheet.create({
    separator: {
      width: rem(1),
      borderWidth: rem(1),
      borderColor: Colors.primary,
      height: rem(20),
      backgroundColor: Colors.primary,
      marginLeft: rem(7) + 0.9,
    },
  });
};
