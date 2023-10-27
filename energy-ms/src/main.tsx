import React from 'react'
import ReactDOM from 'react-dom/client'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import GuestHome from './pages/GuestHome';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<GuestHome />}/>,
    <Route path="/login" element={<LogIn />}/>,
    <Route path="/signup" element={<SignUp />}/>
  ])
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
