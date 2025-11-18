import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar/Navbar';
import Footer from '../components/shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="bg-[#eaeced]">
      <div className=" h-[68px]">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-430px)] w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
