import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div
      className="card bg-[#FFFFFF] shadow-md hover:shadow-xl hover:bg-[#CAEB66] transition duration-300 p-6 rounded-xl border "
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{service.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
        <p className="mt-3 text-gray-600 text-sm">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
