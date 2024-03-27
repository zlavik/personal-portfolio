// index.js
import ReactDOM from 'react-dom/client'
 
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
 
import App from './App'
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Auth from './routes/Auth';
import FinanceApp from './routes/FinanceApp';
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/financeApp',
                element: <FinanceApp />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
              path: '/auth',
              element: <Auth />,
          },
        ]
    }
]);
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)