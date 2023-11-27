import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import GuestHome from './pages/GuestHome';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navbar from './components/system/Navbar';
import AdminHome from './pages/admin/AdminHome';
import { CssBaseline } from '@mui/material';
import PathErrorPage from './pages/PathErrorPage';
import UserHome from './pages/user/UserHome';
import { UsersManagement } from './pages/admin/UsersManagement';
import { DevicesManagement } from './pages/admin/DevicesManagement';
import { UserDevicesManagement } from './pages/admin/UserDevicesManagement';
import { ProtectedRouteAdmin } from './routes/ProtectedRouteAdmin';
import { ProtectedRouteUser } from './routes/ProtectedRouteUser';

const router = createBrowserRouter([
  {
    element: <Navbar />,
    errorElement: <PathErrorPage />,
    children: [
      {
        path: "/",
        element: <GuestHome />,
        errorElement: <PathErrorPage />
      },
      {
        path: "/login",
        element: <LogIn />,
        errorElement: <PathErrorPage />
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <PathErrorPage />
      },
      {
        path: "/adminHome",
        element: <ProtectedRouteAdmin redirectPath={"/login"} children={<AdminHome />}/>,
        errorElement: <PathErrorPage />
      },
      {
        path: "/userHome",
        element: <ProtectedRouteUser redirectPath={"/login"} children={<UserHome />} />,
        errorElement: <PathErrorPage />
      },
      {
        path: "/usersManagement",
        element: <ProtectedRouteAdmin redirectPath={"/login"} children={<UsersManagement />}/>,
        errorElement: <PathErrorPage />
      },
      {
        path: "/devicesManagement",
        element: <ProtectedRouteAdmin redirectPath={"/login"} children={<DevicesManagement />}/>,
        errorElement: <PathErrorPage />
      },
      {
        path: "/userDevices",
        element:  <ProtectedRouteAdmin redirectPath={"/login"} children={<UserDevicesManagement />}/>,
        errorElement: <PathErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
