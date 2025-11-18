import { NavLink } from 'react-router';
import ZapShiftLogo from '../Logo/ZapShiftLogo';

const Navbar = () => {
  const navLinks = (
    <>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/about'}>Services</NavLink>
      </li>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/about'}>Coverage</NavLink>
      </li>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/about'}>About Us</NavLink>
      </li>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/about'}>Pricing</NavLink>
      </li>
      <li className="font-medium text-base text-[#606060]">
        <NavLink to={'/about'}>Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div
      className="navbar bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100

   fixed z-40"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="text-xl">
          <ZapShiftLogo />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-50">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
