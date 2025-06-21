import {BUTTON_ACTIVE_OPACITY} from '@/constants/button';
import {TouchableOpacity} from 'react-native';
import {Typography, TypographyProps} from '../Typography';
import {useStyles} from './styles';

interface LinkProps extends TypographyProps {
  onPress?: () => void;
}

export const Link = ({style, children, onPress}: LinkProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={BUTTON_ACTIVE_OPACITY}
      onPress={onPress}
      style={styles.button}>
      <Typography style={[styles.link, style]}>{children}</Typography>
    </TouchableOpacity>
  );
};
