import { Link } from 'react-router';
import logo from '../../../assets/logo.png';

const ZapShiftLogo = () => {
  return (
    <div className="flex items-end-safe">
      <img className='h-10 md:h-full' src={logo} alt="" />
      <p className="text-sm md:text-2xl font-extrabold -ml-4">ProFast</p>
    </div>
  );
};

export default ZapShiftLogo;
