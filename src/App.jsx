import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LayOut from './components/LayOut/LayOut'
import ResellerCustomer from './components/ResellerCustomer/ResellerCustomer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import SubReseller from './components/SubReseller/SubReseller'
import Provider from './components/Provider/Provider'

function App() {
  const [count, setCount] = useState(0)

  const routes = createBrowserRouter([

    {
      path: "/",
      element:
        <ProtectedRoutes >
          <Login />
        </ProtectedRoutes>
      ,
    },
    {
      path: "/layout",
      element:
        <ProtectedRoutes>
          <LayOut />
        </ProtectedRoutes>
      ,
      children: [

        {
          path: "resellerCustomer",
          element:
            <ProtectedRoutes>
              <ResellerCustomer />
            </ProtectedRoutes>
          ,
        },
        {
          path: "provider",
          element: <ProtectedRoutes>
            <Provider />
          </ProtectedRoutes>
        },
        {
          path: "subReseller",
          element: <ProtectedRoutes>
            <SubReseller />
          </ProtectedRoutes>
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />

    </>
  )
}

export default App
