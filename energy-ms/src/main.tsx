import React from 'react'
import ReactDOM from 'react-dom/client'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import GuestHome from './pages/GuestHome';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import AdminHome from './pages/AdminHome';
import { CssBaseline } from '@mui/material';
import PathErrorPage from './pages/PathErrorPage';
import UserHome from './pages/UserHome';

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
        element: <AdminHome />,
        errorElement: <PathErrorPage />
      },
      {
        path: "/userHome",
        element: <UserHome />,
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
