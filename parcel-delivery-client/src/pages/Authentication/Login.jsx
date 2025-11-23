/* eslint-disable react-hooks/incompatible-library */
import { Link, useLocation, useNavigate } from 'react-router';
import authImg from '../../assets/authImage.png';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import Loading from '../../components/loading/loading';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
const Login = () => {
  const { signInUser, googleSignIn, loading } = useAuth();
  const [loginUs, setLoginUs] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const fromGo = location?.state?.from || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    try {
      const result = await signInUser(data.email, data.password);
      console.log(result);
      setLoginUs(true);
      toast.success('Login Success!');
      navigate(fromGo);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      const userInfo = {
        email: user.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      const userRas = await axiosInstance.post('/users', userInfo);
      console.log(userRas.data);
      console.log(result);
      toast.success('Login Success!');
      navigate(fromGo);
    } catch (err) {
      console.log(err.massage);
    }
  };
  if (loading) return <Loading />;
  return (
    <div className="flex-y-reverse  md:flex items-center justify-center md:my-10">
      <div
        className="flex w-full flex-col md:w-5/12  p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Welcome Back</h1>
          <p className="text-sm dark:text-gray-600">Login with ZapShift</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register('email', { required: true })}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors?.email?.type === 'required' && (
                <p className="text-red-500">Password is required </p>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                {...register('password', { required: true, minLength: 6 })}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors?.password?.type === 'required' && (
                <p className="text-red-500">Password is required </p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p className="text-red-500">Password length 6 </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold  bg-primary rounded-md hover:cursor-pointer hover:shadow-md"
              >
                {loginUs ? 'Loading...' : ' Sign in'}
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don’t have any account?{' '}
              <Link className="text-secondary" to={'/register'}>
                Register
              </Link>
              .
            </p>
          </div>
          <div className="divider">OR</div>
        </form>
        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="btn  text-black border-[#e5e5e5] w-full"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
      <div data-aos="zoom-in-up" data-aos-duration="1500">
        <img src={authImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
