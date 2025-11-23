import useAuth from '../../../hooks/useAuth';
import { CgProfile } from 'react-icons/cg';
const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-md mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        {/* User Photo */}
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL || <CgProfile />} alt="User Avatar" />
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold">
          {user?.displayName || 'No Name Available'}
        </h2>
        <h2 className="text-2xl font-bold">Roles : User</h2>

        <p className="text-gray-600">{user?.email}</p>

        {/* Update Profile Button */}
        <button onClick={''} className="btn btn-primary mt-4 text-gray-600">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
