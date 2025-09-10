import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useDispatch, useSelector } from "react-redux"
import { action as Registeraction } from "./pages/Register"
import { action as Loginaction } from "./pages/Login"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { login, setAuthReady } from "./app/features/userSlice"
import CreateTask from "./pages/CreateTask"
import Task from "./pages/Task"

export default function App() {
  const dispatch = useDispatch()
  const { user, authReady } = useSelector((store) => store.user)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user?.displayName){
        dispatch(login(user))
      }  // 🔑 auth tekshirish tugadi
      dispatch(setAuthReady()) 
    })
    return () => unsub()
  }, [dispatch])

  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path:"/create",
          element:<CreateTask/>
        },
        {
          path:"/task/:id",
          element:<Task/>
        }
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: Loginaction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: Registeraction,
    },
  ])

  return (
    <>
      {!authReady && <p>Loading...</p>}  
      {authReady && <RouterProvider router={routers} />}
    </>
  )
}
