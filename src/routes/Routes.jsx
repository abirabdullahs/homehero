import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import Login from '../pages/Login/Login';
import Signup from './../pages/Signup/Signup';
import ForgetPassword from '../pages/Forgot/ForgetPassword';
import Profile from '../pages/Profile/Profile';
import UpdateProfile from './../pages/Profile/UpdateProfile';
import AddService from '../pages/AddService/AddService';
import MyServices from '../pages/my-services/MyServices';
import ServiceDetails from '../ServiceDetailes/ServiceDetailes';
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import MyBookings from './../MyBookings/MyBookings';
import AllServices from './../AllServices/AllServices';
import ProviderProfile from '../pages/ProviderProfile/ProviderProfile';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path:'login',
        Component: Login
      },
      {
        path:'signUp',
        Component: Signup
      },
      {
          path:'services',
          Component: AllServices
      },

      //  Private Routes
      {
        path:'password-reset',
        Component: () => (
          <PrivateRoute>
            <ForgetPassword />
          </PrivateRoute>
        )
      },
      {
        path:'profile',
        Component: () => (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path:'update-profile',
        Component: () => (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        )
      },
      {
        path: 'add-service',
        Component: () => (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        )
      },
      {
        path: 'my-services',
        Component: () => (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        )
      },
      {
        path: 'service/:id',
        Component: () => (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        )
      },
      {
         path: 'my-bookings',
        Component: () => (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        )
        },
        {
          path: 'provider/:email',
          Component: ProviderProfile
        }
    ]
  },
]);
