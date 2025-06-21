import {rem} from '@/theme/rem';
import {StyleSheet, useWindowDimensions} from 'react-native';

export const useStyles = () => {
  const {height} = useWindowDimensions();

  return StyleSheet.create({
    container: {
      width: '100%',
      height: height - rem(100),
      borderRadius: rem(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: rem(16),
      fontWeight: 700,
    },
  });
};
