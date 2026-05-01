import {createBrowserRouter  } from "react-router";
import Auth from "../features/auth/pages/Auth.jsx";
import Home from "../features/chat/pages/Home.jsx";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Auth/>
    },
    {
        path:"/home",
        element:<Home/>
    }
    
])