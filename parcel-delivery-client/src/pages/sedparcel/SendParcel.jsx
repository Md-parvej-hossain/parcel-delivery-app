import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
//TrackingID Generate
const trackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  const rend = Math.random().toString(36).substring(2, 20).toUpperCase();
  return `PCL-${datePart}-${rend}`;
};

const SendParcel = () => {
  const [submitting, setSubmitting] = useState(false);
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });
  const parcelType = useWatch({ control, name: 'parcelType' });

  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  // submit handler
  const onSubmit = data => {
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log('cost', cost);
    Swal.fire({
      title: 'Agree with the Cost?',
      text: `You will be charged ${cost} taka!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'I agree!',
    }).then(result => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: cost,
          created_by: user?.email,
          payment_status: 'unpaid',
          delivery_status: 'not_collected',
          createdAt: new Date().toISOString(),
          trackingID: trackingID(),
        };
        console.log(parcelData);
        //save data to the server
        setSubmitting(true);
        axiosSecure.post('/parcels', parcelData).then(res => {
          console.log(res.data);
          setSubmitting(false);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
            timer: 1000,
          });
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* PARCEL INFO */}
        <section className="bg-white p-6 rounded-lg shadow-sm ">
          <div className="flex justify-between py-4 ">
            <h2 className="text-lg font-semibold mb-4">
              Enter your parcel details
            </h2>
            <h2 className="text-lg font-semibold mb-4 text-primary">
              Parcel Details charge : 0
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            {/* parcel type */}
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <label className="flex items-center gap-2">
                <input
                  {...register('parcelType', { required: true })}
                  type="radio"
                  value="document"
                  className="radio radio-sm"
                />
                <span>Document</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register('parcelType', { required: true })}
                  type="radio"
                  value="not-document"
                  className="radio radio-sm"
                  defaultChecked
                />
                <span>Not-Document</span>
              </label>
            </div>

            {/* parcel name */}
            <div className="flex-1 my-2 md:my-0">
              <input
                type="text"
                placeholder="Parcel Name"
                {...register('parcelName', {
                  required: 'Parcel name is required',
                  minLength: { value: 2, message: 'Parcel name is too short' },
                })}
                className={`input input-bordered w-full ${
                  errors.parcelName ? 'input-error' : ''
                }`}
              />
              {errors.parcelName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.parcelName.message}
                </p>
              )}
            </div>

            {/* parcel weight */}
            <div className="w-full  md:w-56">
              <input
                type="number"
                step="0.1"
                defaultValue={parcelType === 'document' && 0}
                disabled={parcelType === 'document'}
                placeholder="Parcel Weight (KG)"
                {...register('parcelWeight', {
                  min: {
                    value: 0.1,
                    message: 'Weight must be at least 0.1 kg',
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.parcelWeight ? 'input-error' : ''
                }`}
              />
              {errors.parcelWeight && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.parcelWeight.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SENDER & RECEIVER - two columns */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SENDER */}
          <div className="bg-white p-6 rounded-lg shadow-sm ">
            <h3 className="font-semibold mb-4">Sender Details</h3>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register('senderName', {
                    required: 'Sender name is required',
                  })}
                  className={`input input-bordered w-full ${
                    errors.senderName ? 'input-error' : ''
                  }`}
                />
                {errors.senderName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('senderAddress', {
                    required: 'Sender address is required',
                  })}
                  className={`input input-bordered w-full ${
                    errors.senderAddress ? 'input-error' : ''
                  }`}
                />
                {errors.senderAddress && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Sender Phone No"
                  {...register('senderPhone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message: 'Enter valid BD mobile (e.g. 01XXXXXXXXX)',
                    },
                  })}
                  className={`input input-bordered w-full ${
                    errors.senderPhone ? 'input-error' : ''
                  }`}
                />
                {errors.senderPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.senderPhone.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register('senderRegion', {
                    required: 'Select sender region',
                  })}
                  className={`select select-bordered w-full ${
                    errors.senderDistrict ? 'select-error' : ''
                  }`}
                >
                  <option value="">Select your region </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.senderRegion.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  {...register('senderDistrict', {
                    required: 'Select sender district',
                  })}
                  className={`select select-bordered w-full ${
                    errors.senderDistrict ? 'select-error' : ''
                  }`}
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.senderDistrict.message}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Pickup Instruction"
                  {...register('pickupInstruction', {
                    maxLength: { value: 400, message: 'Max 400 chars' },
                  })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* RECEIVER */}
          <div className="bg-white p-6 rounded-lg shadow-sm ">
            <h3 className="font-semibold mb-4">Receiver Details</h3>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  {...register('receiverName', {
                    required: 'Receiver name is required',
                  })}
                  className={`input input-bordered w-full ${
                    errors.receiverName ? 'input-error' : ''
                  }`}
                />
                {errors.receiverName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Receiver Address"
                  {...register('receiverAddress', {
                    required: 'Receiver address is required',
                  })}
                  className={`input input-bordered w-full ${
                    errors.receiverAddress ? 'input-error' : ''
                  }`}
                />
                {errors.receiverAddress && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Receiver Contact No"
                  {...register('receiverPhone', {
                    required: 'Receiver phone is required',
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message: 'Enter valid BD mobile (e.g. 01XXXXXXXXX)',
                    },
                  })}
                  className={`input input-bordered w-full ${
                    errors.receiverPhone ? 'input-error' : ''
                  }`}
                />
                {errors.receiverPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.receiverPhone.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  {...register('receiverRegion', {
                    required: 'Select receiver region',
                  })}
                  className={`select select-bordered w-full ${
                    errors.receiverRegion ? 'select-error' : ''
                  }`}
                >
                  <option value="">Select your region </option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.receiverDistrict.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  {...register('receiverDistrict', {
                    required: 'Select receiver district',
                  })}
                  className={`select select-bordered w-full ${
                    errors.receiverDistrict ? 'select-error' : ''
                  }`}
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.receiverDistrict.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Delivery Instruction"
                  {...register('deliveryInstruction', {
                    maxLength: { value: 400, message: 'Max 400 chars' },
                  })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTNOTE + SUBMIT */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-600">* PickUp Time 4pm-7pm Approx.</p>

          <button
            type="submit"
            className={`btn btn-primary text-gray-800 ${
              submitting ? 'loading' : ''
            }`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Proceed to Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
