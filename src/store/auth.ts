import {navigate} from '@/navigation';
import {OpenAPI, UserRole} from '@/services/api';
import {keychain} from '@/services/keychain';
import {jwtDecode} from 'jwt-decode';
import {create} from 'zustand';

interface AuthState {
  user: {
    email: string;
    roles: UserRole[];
  };

  logout: () => Promise<void>;
  login: (token: string) => Promise<void>;
}

const initialValues = {
  accessToken: '',
  user: {
    email: '',
    roles: [],
  },
};

export const useAuthStore = create<AuthState>(set => ({
  ...initialValues,

  logout: async () => {
    await keychain.removeToken();
    set({user: {email: '', roles: []}});
    navigate('Auth');
  },

  login: async (token: string) => {
    await keychain.saveToken(token);
    OpenAPI.TOKEN = token;
    const user = jwtDecode(token) as any;
    set({user: {email: user.email!, roles: user.roles}});
    navigate('MainFlow');
  },
}));
