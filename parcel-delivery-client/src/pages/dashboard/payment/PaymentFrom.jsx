import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/loading/loading';

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: parcelInfo, isPending } = useQuery({
    queryKey: ['parcels', id],
    queryFn: async () => {
      const res = await axiosSecure(`/parcel/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError('');
      console.log('paymentMethod', paymentMethod);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          className="btn btn-primary w-full text-gray-500"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentFrom;
