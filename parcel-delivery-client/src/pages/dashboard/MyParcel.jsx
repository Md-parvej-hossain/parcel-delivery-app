import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loading/loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
const navigate =useNavigate()
  const {
    data: parcels = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete a parcel?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: 'Success!',
              text: 'Deleted!  Parcel has been deleted .',
              icon: 'success',
            });
            refetch();
          }
        } catch (error) {
          Swal.fire('Error!', 'Unable to delete parcel.', error.message);
        }
      }
    });
  };
  const handlePay = id => {
    console.log(id);
    navigate(`/dashboard/payment/${id}`);
  };
  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-3">
        My Parcels : {parcels.length}
      </h1>

      {/* FULL RESPONSIVE SCROLL WRAPPER */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table table-zebra w-full min-w-[800px]">
          {/* STICKY HEADER */}
          <thead className="bg-base-200 sticky top-0  text-sm">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map(item => (
              <tr key={item._id} className="text-sm">
                <td className="p-3">{item.parcelName}</td>

                {/* Document / Non-document */}
                <td className="p-3">
                  {item.parcelType === 'document' ? (
                    <span className="badge badge-info badge-sm">Document</span>
                  ) : (
                    <span className="badge badge-warning badge-sm">
                      Non-Document
                    </span>
                  )}
                </td>

                {/* Created At */}
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                {/* Cost */}
                <td className="p-3 font-bold text-blue-600">৳ {item.cost}</td>

                {/* Payment Status */}
                <td className="p-3">
                  {item.payment_status === 'paid' ? (
                    <span className="badge badge-success badge-sm">Paid</span>
                  ) : (
                    <span className="badge badge-error badge-sm">Unpaid</span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 space-x-2 whitespace-nowrap">
                  <button className="btn btn-xs btn-info">View</button>

                  {item.payment_status !== 'paid' && (
                    <button
                      onClick={() => handlePay(item._id)}
                      className="btn btn-xs btn-success"
                    >
                      Pay
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
