/* eslint-disable no-unused-labels */
import { useState } from 'react';
import { FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxios();

  // Load Pending Riders (TanStack Query)
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    },
  });
  // Loading Spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  // Approve / Reject Rider

  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Application?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    try {
      const status = action === 'approve' ? 'active' : 'rejected';
      await axiosSecure.patch(`/riders/${id}/status`, {
        status,
        email,
      });

      refetch();

      Swal.fire('Success', `Rider ${action}d successfully`, 'success');
    } catch (err) {
      Swal.fire('Error', 'Could not update rider status', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Riders</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>

                <td>
                  <span className="badge badge-warning text-white">
                    {rider.status}
                  </span>
                </td>

                <td>{rider.createdAt?.slice(0, 10)}</td>

                <td className="space-x-2">
                  {/* View */}
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => setSelectedRider(rider)}
                  >
                    <FaEye />
                  </button>

                  {/* Approve */}
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() =>
                      handleDecision(rider._id, 'approve', rider.email)
                    }
                  >
                    <FaCheckCircle />
                  </button>

                  {/* Reject */}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() =>
                      handleDecision(rider._id, 'reject', rider.email)
                    }
                  >
                    <FaTimesCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              Rider Info – {selectedRider.name}
            </h3>

            <div className="space-y-2">
              <p>
                <b>Name:</b> {selectedRider.name}
              </p>
              <p>
                <b>Email:</b> {selectedRider.email}
              </p>
              <p>
                <b>Phone:</b> {selectedRider.phone}
              </p>
              <p>
                <b>NID:</b> {selectedRider.nid}
              </p>
              <p>
                <b>Region:</b> {selectedRider.region}
              </p>
              <p>
                <b>District:</b> {selectedRider.district}
              </p>
              <p>
                <b>Applied At:</b>{' '}
                {new Date(selectedRider.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
