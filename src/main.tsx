// index.js
import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import Home from './routes/Home';
import FinanceApp from './routes/FinanceApp';
import React from 'react';
import NavBar from './routes/NavBar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/financeApp',
                element: <FinanceApp />,
            },
        ]
    }
]);
 
ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    )