import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './routers/Router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
//react-hot-toast
import { Toaster } from 'react-hot-toast';
//aws
import 'aos/dist/aos.css';
import Aos from 'aos';
Aos.init();
//tanstack query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
