import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import { action as Registeraction } from "./pages/Register"
import { action as Loginaction} from "./pages/Login"
export default function App() {
  const {user}=useSelector((store)=>store.user)
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes user={user}>
        <MainLayout />
      </ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Home />
        },
      ]
    },

    {
      path: "/login",
      element:user ? <Navigate to="/"/>:<Login/> ,
      action:Loginaction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/"/>: <Register />,
      action:Registeraction,
    }
  ])
  return <RouterProvider router={routers} />
}
