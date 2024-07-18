import Login from "../pages/Login.pages"
import Welcome from "../pages/welcome"
import { Navigate } from "react-router-dom"
export default[
    {
        path:'/login',
        element:<Login/>
    },



    {
        path:'/welcome',
        element:<Welcome />
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
]