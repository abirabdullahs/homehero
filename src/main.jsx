import { StrictMode } from 'react'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import Provider from './context/Provider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider>
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2000} />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </>
  </Provider>
</StrictMode>

)



