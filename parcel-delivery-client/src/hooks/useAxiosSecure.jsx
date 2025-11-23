import axios from 'axios';
import useAuth from './useAuth';
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  axiosSecure.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
