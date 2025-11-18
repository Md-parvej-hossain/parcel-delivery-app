import Marquee from 'react-fast-marquee';
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/star.png';
import logo7 from '../../../assets/brands/start_people.png';
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
  return (
    <div  className="py-14 ">
      <h2 className="text-center text-2xl text-[#03373D] font-bold mb-10">
        We've helped thousands of sales teams
      </h2>

      <Marquee speed={60} pauseOnHover={true} gradient={false}>
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            className="h-6 mx-8 md:mx-24 grayscale-0 transition"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default ClientSlider;
