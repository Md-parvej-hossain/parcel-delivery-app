import ZapShiftLogo from '../Logo/ZapShiftLogo';
import { FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] text-primary-content p-10">
      <aside>
        <ZapShiftLogo />
        <p className="font-bold">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
        <nav className="grid grid-cols-3 gap-2 items-center md:grid-flow-col md:gap-10 my-10">
          <a className="link link-hover">Services</a>
          <a className="link link-hover">Coverage</a>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Pricing</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Contact</a>
        </nav>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaLinkedin className="size-8" />
          </a>
          <a>
            <FaFacebook className="size-8" />
          </a>
          <a>
            <FaXTwitter className="size-8" />
          </a>
          <a>
            <FaYoutube className="size-9" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
