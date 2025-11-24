import { useForm, useWatch } from 'react-hook-form';

import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const BeARider = () => {
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const riderRegion = useWatch({ control, name: 'region' });
  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  // Submit handler
  const onSubmit = async data => {
    const finalData = {
      ...data,
      email: user?.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    console.log(finalData);
    try {
      const res = await axiosSecure.post('/rider', finalData);
      console.log(res);
      if (res.data.insertedId) {
        toast.success('From successfully submit');
      }
    } catch (err) {
      toast.error('Something went wrong! Please try again.');
      console.log(err);
    }
  };

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Become a Rider
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* NAME */}
        <div className="form-control">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered "
            {...register('name', { required: 'Name is required' })}
          />
        </div>

        {/* EMAIL */}
        <div className="form-control">
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* REGION */}
        <div className="form-control">
          <label className="label font-semibold">Region</label>
          <select
            className="select select-bordered"
            {...register('region', { required: 'Region is required' })}
          >
            <option value="">Select Region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>

        {/* DISTRICT */}
        <div className="form-control">
          <label className="label font-semibold">District</label>
          <select
            className="select select-bordered"
            {...register('district', { required: 'District is required' })}
          >
            <option value="">Select District</option>
            {districtsByRegion(riderRegion).map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div className="form-control">
          <label className="label font-semibold">Phone Number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="input input-bordered"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Phone must be 11 digits',
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* NID */}
        <div className="form-control">
          <label className="label font-semibold">National ID Number</label>
          <input
            type="number"
            placeholder="Enter NID number"
            className="input input-bordered"
            {...register('nid', {
              required: 'NID is required',
              minLength: {
                value: 10,
                message: 'NID must be at least 10 digits',
              },
            })}
          />
          {errors.nid && (
            <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
          )}
        </div>

        {/* BIKE BRAND */}
        <div className="form-control">
          <label className="label font-semibold">Bike Brand</label>
          <input
            type="text"
            placeholder="Honda, Yamaha"
            className="input input-bordered"
            {...register('bikeBrand', { required: 'Bike brand is required' })}
          />
          {errors.bikeBrand && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bikeBrand.message}
            </p>
          )}
        </div>

        {/* BIKE REGISTRATION */}
        <div className="form-control">
          <label className="label font-semibold">
            Bike Registration Number
          </label>
          <input
            type="number"
            placeholder="Registration Number"
            className="input input-bordered"
            {...register('bikeRegistration', {
              required: 'Bike registration number is required',
            })}
          />
          {errors.bikeRegistration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bikeRegistration.message}
            </p>
          )}
        </div>

        {/* CUSTOM TEXTAREA */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Additional Information</label>
          <textarea
            className="textarea textarea-bordered min-h-[120px] resize-none rounded-lg"
            placeholder="Write any additional information..."
            {...register('moreInfo')}
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2">
          <button className="btn btn-primary w-full">Submit Application</button>
        </div>
      </form>
    </section>
  );
};

export default BeARider;
