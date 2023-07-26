import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import {Home} from './pages/Home';
import './index.css'

const router = createBrowserRouter([
  { name: 'Home', path: '/', element: <Home />  },
  { name: 'Student', path: '/students', element: <div>HI Kid!</div>  },
  { name: 'Employers', path: '/employers', element: < div>Hire our students.</div>},
  { name: 'Donate', path: '/donate', element: <div>Give us money.</div>},
  { name: 'Classes', path: '/classes', element: <div> Find a class</div>},
  { name: 'About', path: '/about', element: <div>Our history.</div>}, 
  { name: 'Merch', path: '/merchandise', element: <div>Cool schwag.</div>}, 
  { name: 'Newsletter', path: '/news', element: <div>All that's fit to print.</div>},
  { name: 'Contact', path: '/contact', element: <div>Reach out.</div>}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
