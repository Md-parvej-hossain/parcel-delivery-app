import img from '../../../assets/be-a-merchant-bg.png';
import banner from '../../../assets/location-merchant.png';
const CustomerSatasfy = () => {
  return (
    <div
      className="hero bg-[#03373D] my-10 rounded-2xl h-[500px] md:h-[430px] "
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse flex justify-baseline items-center">
        <img
          src={banner}
          className=" rounded-lg  w-40 lg:w-full"
          data-aos="zoom-in-left"
          data-aos-easing="linear"
          data-aos-duration="1500"
        />
        <div
          data-aos="zoom-in-right"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-amber-50 leading-tight">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-[#DADADA]">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
            <button className="btn  bg-[#CAEB66] text-[#1F1F1F] rounded-3xl">
              Become a Merchant
            </button>
            <button className="btn  rounded-3xl bg-[#03373D]  text-[#CAEB66]">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatasfy;
