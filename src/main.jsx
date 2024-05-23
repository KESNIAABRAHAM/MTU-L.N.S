 import React from 'react'
 import ReactDOM from 'react-dom/client'
 import  { Login }  from './components/Login.jsx'
//import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Mainpage from './components/Mainpage.jsx'
import OTPmodal from './components/OTPmodal.jsx'

import "leaflet/dist/leaflet.css"

import { createBrowserRouter , RouterProvider } from 'react-router-dom'

const router  = createBrowserRouter([
  {
  path: '/',
  element: <Login/>,
  },

{
  path:'/OTP',
  element: <OTPmodal/>
},

{
  path: '/signup',
  element: <Signup />,
},

{
  path:'/mainpage',
  element:<Mainpage/>,
}

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {router} /> 

  </React.StrictMode>,
)