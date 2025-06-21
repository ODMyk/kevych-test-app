import {useTheme} from '@/theme';
import {rem} from '@/theme/rem';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {Colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    header: {
      fontSize: rem(24),
      textAlign: 'center',
      fontWeight: 700,
    },
    card: {
      borderRadius: rem(10),
      backgroundColor: Colors.card,
      width: '90%',
      paddingVertical: rem(16),
      paddingHorizontal: rem(20),
      gap: rem(16),
    },
    padding: {
      paddingHorizontal: rem(20),
    },
    form: {
      gap: rem(8),
    },
    button: {
      marginTop: rem(16),
    },
    textContainer: {
      marginTop: rem(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: rem(14),
      lineHeight: rem(16),
    },
  });
};
