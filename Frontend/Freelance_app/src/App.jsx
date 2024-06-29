import { useState } from 'react'
import Nav from './components/nav/Nav'
import "./app.css"; 
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Gigs from './pages/gigs/Gigs';
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Pay from './pages/Pay/Pay';
import Success from './pages/success/Success';

function App() {

  const queryClient = new QueryClient()

  const Layout = () =>{
    return(
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <Nav/>
        <Outlet/>
        <Footer/>
      </QueryClientProvider>
      
    </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/gigs",
          element:<Gigs/>
        },
        {
          path:"/gigs/single/:id",
          element:<Gig/>
        },
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/mygigs",
          element:<MyGigs/>
        },
        {
          path:"/add",
          element:<Add/>
        },
        {
          path:"/messages",
          element:<Messages/>
        },
        {
          path:"/message/:id",
          element:<Message/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/pay/:id",
          element:<Pay />
        },
        {
          path:"/success",
          element:<Success />
        }

      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}

export default App
