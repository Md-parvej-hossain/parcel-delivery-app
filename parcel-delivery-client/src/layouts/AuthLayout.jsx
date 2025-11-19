import { Link, Outlet } from 'react-router';
import ZapShiftLogo from '../components/shared/Logo/ZapShiftLogo';

const AuthLayout = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto py-5">
        <Link to={'/'}>
          <ZapShiftLogo />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
