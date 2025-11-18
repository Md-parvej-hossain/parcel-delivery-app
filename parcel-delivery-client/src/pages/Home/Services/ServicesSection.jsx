import {
  FaShippingFast,
  FaTruckLoading,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const servicesData = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    icon: <FaShippingFast className="text-4xl text-primary" />,
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    icon: <FaTruckLoading className="text-4xl text-primary" />,
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: <FaWarehouse className="text-4xl text-primary" />,
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: <FaBuilding className="text-4xl text-primary" />,
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: <FaUndo className="text-4xl text-primary" />,
  },
];

const ServicesSection = () => {
  return (
    <section className=" mx-auto px-9 py-16 bg-[#03373D] rounded-2xl my-10">
      {/* Section Title */}
      <div
        className="text-center mb-12"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service}></ServiceCard>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
