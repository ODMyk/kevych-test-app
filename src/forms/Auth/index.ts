import * as Yup from 'yup';

export const authSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6).max(30),
});

export type AuthForm = Yup.InferType<typeof authSchema>;
