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
        path:'password-reset',
        Component: ForgetPassword
      },
      {
        path:'profile',
        Component: Profile
      },
      {
        path:'update-profile',
        Component: UpdateProfile
      },
      {
        path: 'add-service',
        Component: AddService
      },
      {
        path: 'my-services',
        Component: MyServices
      }
    ]
  },
]);
