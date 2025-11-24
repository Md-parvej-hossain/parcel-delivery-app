import { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const ActiveRiders = () => {
  const axiosSecure = useAxios();
  const [searchText, setSearchText] = useState('');

  // Load Active Riders
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active');
      return res.data;
    },
  });

  // Deactivate Rider
  const handleDeactivate = async id => {
    const confirm = await Swal.fire({
      title: 'Deactivate Rider?',
      text: 'The rider will no longer be active.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/riders/${id}/status`, {
        status: 'pending',
      });
      refetch();
      if (res.data.success) {
        Swal.fire('Success', 'Rider deactivated!', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update rider status', 'error');
      console.log(error);
    }
  };

  // Search filter
  const filteredRiders = riders.filter(rider =>
    rider.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Active Riders</h2>

      {/* Search Box */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search rider by name"
          className="input input-bordered w-64"
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center font-semibold py-6">
                  No riders found
                </td>
              </tr>
            )}

            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>

                <td>
                  <span className="badge badge-success text-white">
                    {rider.status}
                  </span>
                </td>

                <td>{rider.createdAt?.slice(0, 10)}</td>

                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    <FaTimesCircle />
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

export default ActiveRiders;
