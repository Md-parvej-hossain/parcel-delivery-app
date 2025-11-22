import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/loading/loading';
import useAuth from './../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcelInfo, isPending } = useQuery({
    queryKey: ['parcels', id],
    queryFn: async () => {
      const res = await axiosSecure(`/parcel/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
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
      //create payment intent
      const res = await axiosSecure.post(`/create-payment-intent`, {
        amountInCents,
        id,
      });
      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
        setError(result.error.message);
      } else {
        setError('');
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded !');
          console.log(result);
          // make parcel paid also create payment history
          const paymentData = {
            parcelId: id,
            userEmail: user.email,
            amount: amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.payment_method_types,
          };
          const paymentRes = await axiosSecure.post(
            `/payments/history`,
            paymentData
          );
          if (paymentRes.data.payment_history_id) {
            await Swal.fire({
              title: 'Payment Successful!',
              html: `<p>Your payment has been processed.</p>
                    <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
              `,
              icon: 'success',
              confirmButtonText: 'Go to My Parcel',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              navigate('/dashboard/myParcel'); // redirect after clicking OK
            });
          }
        }
      }
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
