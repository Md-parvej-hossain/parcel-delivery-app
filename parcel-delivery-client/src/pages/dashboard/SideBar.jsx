import { Link, NavLink } from 'react-router';
import { IoMdMenu } from 'react-icons/io';
import ZapShiftLogo from '../../components/shared/Logo/ZapShiftLogo';
import { MdOutlineHistory } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { MdOutlineSpatialTracking } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';
const SideBar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content px-4 py-2">
        <label htmlFor="sidebar-drawer" className="drawer-button lg:hidden">
          <IoMdMenu className="size-6" />
        </label>

        {/* Your Page Content Goes Here */}
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 min-h-full p-5 border-r">
          {/* Logo */}
          <div className="mb-5">
            <Link to={'/'}>
              <ZapShiftLogo />
            </Link>
          </div>

          {/* Search */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input type="text" className="grow" placeholder="Search" />
          </label>

          {/* Menu */}
          <ul className="menu space-y-1 ">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <IoHomeOutline /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myParcel"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/?size=100&id=4722&format=png&color=000000"
                  alt=""
                />{' '}
                My Parcel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <MdOutlineHistory />
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/track"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <MdOutlineSpatialTracking />
                Track a Package
              </NavLink>
            </li>
            {/* Active Riders */}
            <li>
              <NavLink
                to="/dashboard/active-riders"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <FaUserCheck className="text-green-600" />
                Active Riders
              </NavLink>
            </li>

            {/* Pending Riders */}
            <li>
              <NavLink
                to="/dashboard/pending-riders"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <FaUserClock className="text-yellow-600" />
                Pending Riders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <CgProfile />
                Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
