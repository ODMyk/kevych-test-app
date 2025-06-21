import {UserRole} from '@/services/api';
import {useAuthStore} from '@/store/auth';

interface RoleGuardProps extends React.PropsWithChildren {
  roles?: UserRole[];
}

export const RoleGuard = ({roles, children}: RoleGuardProps) => {
  const {user} = useAuthStore();
  return (
    <>
      {roles
        ? user.roles.some(role => roles.includes(role)) && children
        : children}
    </>
  );
};
