import React from 'react'
import ReactDOM from 'react-dom/client'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import GuestHome from './pages/GuestHome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GuestHome />}/>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
