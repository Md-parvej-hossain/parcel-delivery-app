import { FiBook, FiTruck, FiSend, FiPackage } from 'react-icons/fi'; // icons

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Booking',
      desc: 'From personal packages to business shipments — we deliver on time, every time.',
      icon: <FiBook className="text-5xl text-primary mx-auto" />,
    },
    {
      id: 2,
      title: 'Pick & Drop',
      desc: 'Our team picks up your parcel safely and delivers it to the right destination.',
      icon: <FiTruck className="text-5xl text-primary mx-auto" />,
    },
    {
      id: 3,
      title: 'Fast Delivery',
      desc: 'We ensure quick shipping so your packages arrive exactly when expected.',
      icon: <FiSend className="text-5xl text-primary mx-auto" />,
    },
    {
      id: 4,
      title: 'Receive Package',
      desc: 'Track your parcel in real-time and receive it with complete peace of mind.',
      icon: <FiPackage className="text-5xl text-primary mx-auto" />,
    },
  ];

  return (
    <section className=" mx-auto py-14">
      <h2 className="text-3xl font-bold text-center text-[#03373D] mb-10">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-5">
        {steps.map(step => (
          <div
            key={step.id}
            className="bg-white  rounded-xl py-6 shadow-sm hover:shadow-md transition-all text-center my-5"
            data-aos="zoom-in-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            {/* Icon */}
            <div className="mb-4">{step.icon}</div>

            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            <p className="text-gray-600 text-sm leading-relaxed px-3">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
