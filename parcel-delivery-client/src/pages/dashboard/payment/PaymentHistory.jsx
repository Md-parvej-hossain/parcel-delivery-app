import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isPending } = useQuery({
    queryKey: ['payment', user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments/history?email=${user.email}`);
      return res.data;
    },
  });
  console.log(payments);
  if (isPending)
    return <span className="loading loading-ring loading-xl"></span>;
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-base font-bold bg-base-200">
              <th>#</th>
              <th>Parcel ID</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>{pay.parcelId}</td>
                <td className="font-mono">{pay.transactionId}</td>
                <td>${pay.amount}</td>

                <td>
                  <span className="badge badge-success">{pay.status}</span>
                </td>

                <td>{new Date(pay.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
