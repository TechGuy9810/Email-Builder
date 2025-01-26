import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import EmailTemplates from './components/EmailTemplates';
import MyTemplates from './components/MyTemplates';
const router = createBrowserRouter([
  {
    element:<RootLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/emailTemplate/:id",
        element:<EmailTemplates/>
      },
      {
        path:"/myTemplates",
        element:<MyTemplates/>
      },
      {
        path:"/sign-up/*",
        element:<Signup/>
        },
        {
        path:"/sign-in/*",
        element:<Login/>
        },
    ]
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>,
)
