import {useController} from 'react-hook-form';
import {View} from 'react-native';
import {Typography} from '../Typography';
import {useStyles} from './styles';

type FormFieldProps = {
  name: string;
  label?: string;
  children: (fieldProps: {field: any; fieldState: any}) => React.ReactNode;
  control: any;
};

export const FormField = ({name, control, children, label}: FormFieldProps) => {
  const {field, fieldState} = useController({name, control});

  const styles = useStyles(fieldState.invalid);

  return (
    <View style={styles.container}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      {children({field, fieldState})}
      {fieldState.error && (
        <Typography style={styles.error}>{fieldState.error.message}</Typography>
      )}
    </View>
  );
};
