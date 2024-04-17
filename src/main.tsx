// main.tsx
import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'
import Home from '../src/pages/Home/Home';
import FinanceApp from '../src/pages/Budgetd/FinanceApp';
import React from 'react';
import NavBar from '../src/components/Navbar/NavBar';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <NavBar />
                <Home />
            </>
        ),
    },
    {
        path: '/financeApp',
        element: (
            <>
                <NavBar />
                <FinanceApp />
            </>
        ),
    },
]);
 
ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    )