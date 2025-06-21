import {useState} from 'react';
import {Control} from 'react-hook-form';
import {TextInput} from 'react-native';
import {FormField} from '../FormField';
import {useStyles} from './styles';

type TextFieldProps = {
  name: string;
  label?: string;
  isSecure?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  control: Control<any>;
  Icon?: React.ReactNode;
};

export const TextField = ({
  name,
  label,
  isSecure = false,
  placeholder,
  control,
}: TextFieldProps) => {
  const styles = useStyles();
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <FormField name={name} label={label} control={control}>
      {({field, fieldState}) => {
        return (
          <TextInput
            {...field}
            placeholder={placeholder}
            secureTextEntry={isSecure}
            style={[
              styles.input,
              isFocused && styles.focused,
              fieldState.invalid && styles.invalid,
            ]}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={field.onChange}
          />
        );
      }}
    </FormField>
  );
};
