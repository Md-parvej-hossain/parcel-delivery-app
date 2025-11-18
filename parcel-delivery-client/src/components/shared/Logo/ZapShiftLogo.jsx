import { Link } from 'react-router';
import logo from '../../../assets/logo.png';

const ZapShiftLogo = () => {
  return (
    <Link  to={'/'} className="flex items-end-safe">
      <img src={logo} alt="" />
      <p className="text-2xl font-extrabold -ml-4">ProFast</p>
    </Link>
  );
};

export default ZapShiftLogo;
