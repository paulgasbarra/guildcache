import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import {Home, Students, Donate, Classes, About, Merchandise, Newsletter, Contact} from './pages';
import './index.css'
import { Employers } from './pages/Employers';


const router = createBrowserRouter([
  { name: 'Home', path: '/', element: <Home />  },
  { name: 'Student', path: '/students', element: <Students />  },
  { name: 'Employers', path: '/employers', element:<Employers /> },
  { name: 'Donate', path: '/donate', element: <Donate />},
  { name: 'Classes', path: '/classes', element: <Classes />},
  { name: 'About', path: '/about', element: <About />}, 
  { name: 'Merch', path: '/merchandise', element:  <Merchandise />}, 
  { name: 'Newsletter', path: '/newsletter', element: <Newsletter />},
  { name: 'Contact', path: '/contact', element: <Contact />}
  { name: 'Admin', path: '/admin', element: <Admin />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
