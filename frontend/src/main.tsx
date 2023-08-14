import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css';
import {Home, Students, Donate, Employers, ErrorPage, Classes, About, Merchandise, Newsletter, Contact, Admin} from './pages';
import { Body } from './components/Body';



const router = createBrowserRouter([
  { element: <Body />, children: [
      { path: '/', element: <Home />, errorElement: <ErrorPage />,  },
      { path: '/students', element: <Students />  },
      { path: '/employers', element:<Employers /> },
      { path: '/donate', element: <Donate />},
      { path: '/classes', element: <Classes />},
      { path: '/about', element: <About />}, 
      { path: '/merchandise', element:  <Merchandise />}, 
      { path: '/newsletter', element: <Newsletter />},
      { path: '/contact', element: <Contact />},
      { path: '/admin', element: <Admin />},
    ] 
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
