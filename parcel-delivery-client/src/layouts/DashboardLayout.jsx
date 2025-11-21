import { Outlet } from 'react-router';
import SideBar from '../pages/dashboard/SideBar';

const DashboardLayout = () => {
  return (
    <div className='lg:grid lg:grid-cols-12'>
      <div className='lg:col-span-2'>
        <SideBar />
      </div>
      <div className='px-4 lg:col-span-10 lg:m-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
