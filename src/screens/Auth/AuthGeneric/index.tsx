import {Button} from '@/components/base/Button';
import {Link} from '@/components/base/Link';
import {TextField} from '@/components/base/TextField';
import {Typography} from '@/components/base/Typography';
import {AuthForm, authSchema} from '@/forms/Auth';
import {AuthParamList} from '@/navigation/Auth';
import {useAuthStore} from '@/store/auth';
import {AuthService} from '@api/services/AuthService';
import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Keyboard, KeyboardAvoidingView, Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from './styles';

interface AuthGenericScreenProps {
  variant: 'login' | 'register';
}

export const AuthGenericScreen = ({variant}: AuthGenericScreenProps) => {
  const styles = useStyles();
  const {
    handleSubmit,
    formState: {isSubmitting},
    control,
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const {login} = useAuthStore();

  const preLink =
    variant === 'login' ? "Don't have an account?" : 'Already have an account?';
  const header = variant === 'login' ? 'Sign In' : 'Sign Up';
  const linkText = variant === 'login' ? 'Sign Up' : 'Sign In';

  const {navigate} = useNavigation<NavigationProp<AuthParamList>>();

  const onSuccess = async (data: AuthForm) => {
    const method =
      variant === 'login'
        ? AuthService.authControllerLogin
        : AuthService.authControllerRegister;

    try {
      const response = await method(data);
      login(response.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const onSubmit = handleSubmit(onSuccess, onError);

  const submit = () => {
    Keyboard.dismiss();
    onSubmit();
  };

  const followLink = () => {
    navigate(variant === 'login' ? 'Register' : 'Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Pressable
          onPress={Keyboard.dismiss}
          style={[styles.container, styles.padding]}>
          <View style={styles.card}>
            <Typography style={styles.header}>{header}</Typography>
            <View style={styles.form}>
              <TextField
                name="email"
                label="Email"
                placeholder="johndoe@example.com"
                control={control}
              />
              <TextField
                name="password"
                label="Password"
                placeholder="******"
                control={control}
                isSecure
              />
              <Button
                onPress={submit}
                disabled={isSubmitting}
                style={styles.button}>
                {header}
              </Button>
              <View style={styles.textContainer}>
                <Typography style={styles.text}>{preLink}</Typography>
                <Link onPress={followLink}>{linkText}</Link>
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
