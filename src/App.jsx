import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserContextProvider from './Components/Context/UserContext';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart'; 
import Layout from './Components/Layout/Layout';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails'; 
import './App.css'; 

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
      { path: "/brands", element: <Brands /> },
      { path: "/Login", element: <Login /> },
      { path: "/Register", element: <Register /> },
      { path: "/ProductDetails/:id", element: <ProductDetails /> },
      { path: "*", element: <h1 className="w-screen h-screen flex bg-sky-300 text-3xl justify-center items-center">404 Not Found</h1> },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
    </UserContextProvider>
  );
}
