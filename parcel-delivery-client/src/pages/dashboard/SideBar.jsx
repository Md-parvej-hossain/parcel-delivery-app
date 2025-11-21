import { Link, NavLink } from 'react-router';
import { IoMdMenu } from 'react-icons/io';
import ZapShiftLogo from '../../components/shared/Logo/ZapShiftLogo';
import { IoHomeOutline } from 'react-icons/io5';
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
          <ul className="menu space-y-1">
            <li>
              <NavLink to="/dashboard" className="flex items-center gap-2">
                <IoHomeOutline /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/myParcel"
                className="flex items-center gap-2"
              >
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/?size=100&id=4722&format=png&color=000000"
                  alt=""
                />{' '}
                My Parcel
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
