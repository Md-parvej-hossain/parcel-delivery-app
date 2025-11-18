import Banner from '../../components/Banner/Banner';
import CustomerSatasfy from './CustomerSatasfy/CustomerSatasfy';
import HowItWorks from './HowItWorks/HowItWorks';
import ClientSlider from './logoClientSlider/ClientSlider';
import ServicesSection from './Services/ServicesSection';
import Support from './support/Support';

const Home = () => {
  return (
    <div>
      <div
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        {' '}
        <Banner />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1000">
        <ServicesSection />
      </div>
      <div data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1500">
        <ServicesSection />
      </div>
      <div data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1500">
        <ServicesSection />
      </div>

      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <ClientSlider />
      </div>
      <div>
        <Support />
      </div>
      <div>
        <CustomerSatasfy/>
      </div>
    </div>
  );
};

export default Home;
