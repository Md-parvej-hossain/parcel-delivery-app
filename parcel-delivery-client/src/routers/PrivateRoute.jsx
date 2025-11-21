import { Navigate, useLocation } from 'react-router';
import Loading from '../components/loading/loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user) {
    return (
      <Navigate to={'/login'} state={{ from: location.pathname }}></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
