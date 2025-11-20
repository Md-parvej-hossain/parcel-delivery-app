import { Navigate } from 'react-router';
import Loading from '../components/loading/loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to={'/login'}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
