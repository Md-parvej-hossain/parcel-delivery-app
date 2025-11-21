import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Coverage from '../pages/coverage/Coverage';
import SendParcel from '../pages/sedparcel/SendParcel';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import MyParcel from '../pages/dashboard/MyParcel';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        element: <Coverage />,
        loader: () => fetch('./warehouses.json'),
      },
      {
        path: 'sendParcel',
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch('./warehouses.json'),
      },
    ],
  },
  //Dashboard layout
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard/myParcel',
        element: <MyParcel />,
      },
    ],
  },
  //auth layout
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);
