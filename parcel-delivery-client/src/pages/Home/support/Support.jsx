import img1 from '../../../assets/live-tracking.png';
import img2 from '../../../assets/safe-delivery.png';
import img3 from '../../../assets/location-merchant.png';
const Support = () => {
  const services = [
    {
      id: 1,
      title: 'Live Parcel Tracking',
      description:
        'Stay updated in real-time with our live parcel tracking feature. From pickup to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
      img: `${img1}`, // replace with your image
    },
    {
      id: 2,
      title: '100% Safe Delivery',
      description:
        'We ensure your parcels reach safely with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
      img: `${img3}`,
    },
    {
      id: 3,
      title: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with tracking inquiries, services, or delivery concerns anytime you need help.',
      img: `${img2}`,
    },
  ];
  return (
    <section className=" mx-auto  py-10 my-10">
      <div className="space-y-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-sm  p-6 hover:shadow-lg transition-all"
            data-aos="fade-up"
            data-aos-anchor-placement="center-center"
            data-aos-duration="1000"
          >
            <div className="flex flex-col md:flex-row items-center  gap-6 py-5">
              {/* Icon */}
              <img
                src={service.img}
                alt={service.title}
                className="w-40 h-40 object-contain border-r pr-6 border-dashed"
              />

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Support;
